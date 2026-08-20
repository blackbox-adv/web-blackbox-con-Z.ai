import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, company, message, phone } = await request.json()

    if (!name || !message) {
      return NextResponse.json({ error: 'Nombre y mensaje son requeridos' }, { status: 400 })
    }

    // Prepare mailto link or log for notification
    const recipient = 'contacto@blackboxperu.com'
    const subject = encodeURIComponent(`Nuevo Mensaje Web de ${name}${company ? ` (${company})` : ''}`)
    const body = encodeURIComponent(
      `Nombre: ${name}\n` +
      `Email: ${email || 'No proporcionado'}\n` +
      `Empresa: ${company || 'No especificada'}\n` +
      `Teléfono: ${phone || 'No especificado'}\n\n` +
      `Mensaje:\n${message}\n\n` +
      `--\nEnviado desde el formulario web de Black Box (blackboxperu.com)`
    )

    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`

    return NextResponse.json({
      success: true,
      mailtoUrl,
      message: 'Mensaje procesado correctamente'
    })
  } catch (error) {
    console.error('Error procesando contacto:', error)
    return NextResponse.json({ error: 'Error al procesar el mensaje' }, { status: 500 })
  }
}
