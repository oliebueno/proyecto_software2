import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function registerUser (name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser  = await prisma.USER.create({
            data: {
                name,
                email,
                password: hashedPassword,
                otpSecret: null,
            },
        });
        console.log('Usuario registrado:', newUser );
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    } finally {
        await prisma.$disconnect();
    }
}