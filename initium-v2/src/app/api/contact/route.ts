import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, interest, message } = body;

        // Validation (Basic redundant check)
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Configure Transporter (Values should be in env in production)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.example.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER || "user",
                pass: process.env.SMTP_PASS || "pass",
            },
        });

        // Email Content
        const mailOptions = {
            from: '"Initium Tech Web" <noreply@initiumtec.com>',
            to: 'info@initiumtec.com',
            subject: `Nuevo Contacto Web: ${interest} - ${name}`,
            text: `
                Nombre: ${name}
                Email: ${email}
                Empresa: ${company || 'N/A'}
                Interés: ${interest}
                
                Mensaje:
                ${message}
            `,
            html: `
                <h2>Nuevo Contacto desde Web V2</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Empresa:</strong> ${company || 'N/A'}</p>
                <p><strong>Interés:</strong> ${interest}</p>
                <br/>
                <p><strong>Mensaje:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Send Email (Mocked if no env vars present to prevent crash in dev without config)
        if (process.env.SMTP_HOST) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log("Mock Email Sent:", mailOptions);
        }

        return NextResponse.json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
