// src/components/CadastrarHistorico.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

const CadastrarHistorico = () => {
    const [matriculaUsuario, setMatriculaUsuario] = useState('');
    const [codigoDisciplina, setCodigoDisciplina] = useState('');
    const [situacao, setSituacao] = useState(''); // Garantindo que situação não possa ser null
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setError(''); // Limpa qualquer erro anterior

        // Validação básica para campos obrigatórios
        if (!matriculaUsuario || !codigoDisciplina || situacao === '') {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        // Validação da situação para aceitar apenas "APR" ou "REP"
        if (situacao !== 'APR' && situacao !== 'REP') {
            setError('A situação deve ser "APR" ou "REP".');
            return;
        }

        // Envio dos dados para a rota
        try {
            const response = await axios.post('http://localhost:3000/historico/criarHistorico', {
                matriculaUsuario,
                codigoDisciplina,
                situacao, // agora situação é uma string não vazia
            });
            console.log('Cadastro realizado com sucesso:', response.data);
            navigate('/'); // Redireciona para o menu após o cadastro
        } catch (err) {
            setError('Erro ao cadastrar histórico. Tente novamente mais tarde.');
            console.error(err);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Cadastro de Histórico
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Matrícula do Usuário"
                    value={matriculaUsuario}
                    onChange={(e) => setMatriculaUsuario(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Código da Disciplina"
                    value={codigoDisciplina}
                    onChange={(e) => setCodigoDisciplina(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Situação"
                    value={situacao}
                    onChange={(e) => setSituacao(e.target.value)} // O campo situação é obrigatório agora
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Cadastrar
                </Button>
            </form>
            {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
        </Container>
    );
};

export default CadastrarHistorico;
