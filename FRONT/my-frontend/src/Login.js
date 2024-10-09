// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => { // Recebendo onLogin como prop
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', {
                matricula,
                senha,
            });

            // Se o login for bem-sucedido, armazene o token (se necessário) e redirecione
            const token = response.data.token; // armazene o token se precisar
            localStorage.setItem('token', token); // ou qualquer outro método de armazenamento

            // Chama onLogin passando os dados do usuário
            const userData = { matricula, tipo: response.data.role }; // Ajuste conforme os dados retornados
            onLogin(userData); // Atualiza o estado do usuário no App.js

            // Redireciona para o menu após o login
            navigate('/menu');
        } catch (err) {
            setError('Login falhou. Verifique suas credenciais.');
            console.error(err);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Matrícula"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Entrar
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
