import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    let filename = searchParams.get('filename') || `upload_${Date.now()}.png`;
    let fileBuffer: Buffer | null = null;
    let mimeType = 'image/png';

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (file) {
        filename = file.name || filename;
        mimeType = file.type || mimeType;
        fileBuffer = Buffer.from(await file.arrayBuffer());
      }
    } else {
      const blob = await request.blob();
      if (blob && blob.size > 0) {
        mimeType = blob.type || mimeType;
        fileBuffer = Buffer.from(await blob.arrayBuffer());
      }
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      return NextResponse.json({ message: 'No file content provided.' }, { status: 400 });
    }

    // Auto-trim empty transparent or solid borders if it's an image (ideal for logos)
    if (mimeType.startsWith('image/') && !mimeType.includes('svg')) {
      try {
        const trimmed = await sharp(fileBuffer)
          .trim()
          .png({ quality: 100 })
          .toBuffer();
        if (trimmed && trimmed.length > 0) {
          fileBuffer = trimmed;
          mimeType = 'image/png';
        }
      } catch (sharpErr) {
        console.warn('Auto-trim skipped:', sharpErr);
      }
    }

    // Try Vercel Blob if token exists
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blobResult = await put(filename, fileBuffer, {
          access: 'public',
          contentType: mimeType,
        });
        return NextResponse.json(blobResult);
      } catch (blobErr) {
        console.warn('Vercel blob failed, falling back to base64 data URL:', blobErr);
      }
    }

    // Direct Data URL fallback (100% reliable in any cloud/container environment)
    const dataUrl = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;

    return NextResponse.json({
      url: dataUrl,
      pathname: filename,
      contentType: mimeType,
      size: fileBuffer.length,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      message: 'Error al subir archivo', 
      error: error.message 
    }, { status: 500 });
  }
}
