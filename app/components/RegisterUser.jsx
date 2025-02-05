import { useState } from "react";

const RegisterUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const register = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            alert('Usuario registrado');
        } else {
            alert('Error al registrar el usuario');
        }
    }

    return (
        <form onSubmit={register}>
            <h1>Registrar Usuario</h1>
            <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default RegisterUser;