// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
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

            // Captura o token e os dados do usuário
            const token = response.data.token;
            const userData = response.data.user; // Captura o objeto 'user'

            // Armazena o token e os dados do usuário no localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData)); // Armazena os dados do usuário

            // Chama a função onLogin e passa os dados do usuário
            onLogin(userData);

            // Redireciona com base na role do usuário
            if (userData.role === 'ALUNO') {
                navigate('/recomendacao');
            } else if (userData.role === 'PROFESSOR') {
                navigate('/cadastrar-historico');
            } else if (userData.role === 'COORDENADOR') {
                navigate('/cadastrar-disciplina');
            }

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
