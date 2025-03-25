import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        const verifyUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000" }/api/verify?sessionToken=${token}`;

        await transporter.sendMail({
            from: 'metodoponte100@gmail.com',
            to: email,
            subject: "Verifica tu cuenta",
            html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
               <a href="${verifyUrl}">Verificar cuenta</a>`,
        });
    } catch (error) {
        console.error("❌ Error enviando correo de verificación:", error);
        throw new Error("No se pudo enviar el correo de verificación.");
    }
}