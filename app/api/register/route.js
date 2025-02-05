import { registerUser } from '../../lib/userService';

export async function POST(req) {
    const { name, email, password } = await req.json();

    try {
        const newUser  = await registerUser (name, email, password);
        return new Response(JSON.stringify(newUser ), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error al registrar el usuario' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}