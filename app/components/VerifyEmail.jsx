import { useState } from "react";
import speakeasy from "speakeasy";

const VerifyEmail = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [secret, setSecret] = useState("");
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
        if (!email) {
            alert('Por favor, ingresa un correo electrónico.');
            return;
        }

        setLoading(true);
        const response = await fetch('/api/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
            setSecret(data.secret);
            alert('OTP enviado');
        } else {
            alert('Error al enviar el OTP: ' + data.message);
        }
    };

    const verifyOtp = () => {
        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token: otp
        });

        if (verified) {
            alert('OTP verificado con éxito');
        } else {
            alert('OTP incorrecto');
        }
    };

    return (
        <div>
            <h1>Verificar Email</h1>
            <input
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOtp} disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar OTP'}
            </button>

            <input
                type="text"
                placeholder="Ingresa tu OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verificar OTP</button>
        </div>
    );
};

export default VerifyEmail;