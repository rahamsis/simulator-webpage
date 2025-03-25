import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        const verifyUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/verify?sessionToken=${token}`;

        const currentYear = new Date().getFullYear()

        await transporter.sendMail({
            from: 'metodoponte100@gmail.com',
            to: email,
            subject: "Verifica tu cuenta",
            html: `<html>
                        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
                            <div style="max-width: 500px; background: #ffffff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
                                <h2 style="color: #333;">Verificación de Cuenta</h2>
                                <p style="color: #555;">¡Gracias por registrarte! Para activar tu cuenta, haz clic en el botón de abajo.</p>
                                <a href="${verifyUrl}" 
                                    style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #338e30; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                                    ✅ Verificar Cuenta
                                </a>
                                <p style="margin-top: 20px; font-size: 14px; color: #777;">
                                    Si no solicitaste esta verificación, ignora este mensaje.
                                </p>
                                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                                <p style="font-size: 12px; color: #aaa;">
                                    ® ${currentYear} Ponte 100 | Todos los derechos reservados.
                                </p>
                            </div>
                        </body>
                    </html>`,
        });
    } catch (error) {
        console.error("❌ Error enviando correo de verificación:", error);
        throw new Error("No se pudo enviar el correo de verificación.");
    }
}