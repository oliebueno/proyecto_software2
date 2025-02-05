import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const {email} = await req.json();

    const user = await prisma.USER.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // generate secret and otp
    const secret = speakeasy.generateSecret();
    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });

    // send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD 
        },
        tls: {
          rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Tu código de verificación',
        text: `Tu códido OTP es: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'OTP enviado', secret: secret.base32 }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ message: 'Error al enviar el OTP' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      };
}
