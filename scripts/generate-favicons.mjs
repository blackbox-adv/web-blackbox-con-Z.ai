import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateIcons() {
  const publicDir = path.join(process.cwd(), 'public');

  // SVG master for high-contrast, ultra-sharp 3D Black Box Icon
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <!-- Clean dark backdrop with subtle border for universal visibility on light and dark browser tabs & Google search -->
  <rect width="512" height="512" rx="112" fill="#09090b" />
  <rect x="8" y="8" width="496" height="496" rx="104" stroke="#27272a" stroke-width="12" />

  <!-- 3D Isometric Black Box Icon -->
  <g transform="translate(256, 260) scale(2.05) translate(-118, -110)">
    <!-- Top Floating Angled Lid -->
    <polygon points="100,28 178,74 136,104 58,58" fill="#a855f7" />
    
    <!-- Left Main Outer Face -->
    <polygon points="58,74 122,111 122,192 58,155" fill="#ffffff" />
    
    <!-- Right Wall Outer Face -->
    <polygon points="125,116 172,90 172,168 125,193" fill="#c084fc" />
    
    <!-- Inner Dark Shadow Block inside the slit -->
    <polygon points="122,111 170,83 170,118 122,146" fill="#e4e4e7" />
  </g>
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);

  const svgBuffer = Buffer.from(svgContent);

  // Generate PNG sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 }, // Crucial for Google Favicon requirement (multiples of 48px)
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'favicon-512x512.png', size: 512 },
    { name: 'favicon.png', size: 48 },
    { name: 'favicon.ico', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
  ];

  for (const item of sizes) {
    await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png()
      .toFile(path.join(publicDir, item.name));
    console.log(`Generated ${item.name} (${item.size}x${item.size})`);
  }

  console.log('All favicon icons generated successfully!');
}

generateIcons().catch(console.error);
