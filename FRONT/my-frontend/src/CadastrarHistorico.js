// src/components/CadastrarHistorico.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

const CadastrarHistorico = () => {
    const [matriculaUsuario, setMatriculaUsuario] = useState('');
    const [codigoDisciplina, setCodigoDisciplina] = useState('');
    const [situacao, setSituacao] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso
    const [loading, setLoading] = useState(false); // Para gerenciar o estado de carregamento
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage(''); // Limpa a mensagem de sucesso ao iniciar o cadastro
        setLoading(true); // Inicia o carregamento

        if (!matriculaUsuario || !codigoDisciplina || situacao === '') {
            setError('Todos os campos são obrigatórios.');
            setLoading(false); // Para o carregamento
            return;
        }

        // Envio dos dados para a rota
        try {
            const response = await axios.post('http://localhost:3000/historico/criarHistorico', {
                matriculaUsuario,
                codigoDisciplina,
                situacao,
            });
            console.log('Cadastro realizado com sucesso:', response.data);

            // Limpa os campos após sucesso
            setMatriculaUsuario('');
            setCodigoDisciplina('');
            setSituacao('');
            setSuccessMessage('Cadastro realizado com sucesso!'); // Define a mensagem de sucesso
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erro ao cadastrar histórico. Tente novamente mais tarde.';
            setError(errorMessage);
            console.error(err);
        } finally {
            setLoading(false); // Para o carregamento
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
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Situação</InputLabel>
                    <Select
                        value={situacao}
                        onChange={(e) => setSituacao(e.target.value)}
                    >
                        <MenuItem value="APR">APR</MenuItem>
                        <MenuItem value="REP">REP</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>

                <Button variant="contained" color="secondary" onClick={handleBack} style={{ marginTop: '20px' }}>
                    Sair
                </Button>
            </form>
            {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
            {successMessage && <Typography color="success" style={{ marginTop: '10px' }}>{successMessage}</Typography>} {/* Mensagem de sucesso */}
        </Container>
    );
};

export default CadastrarHistorico;
