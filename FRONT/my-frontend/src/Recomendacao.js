// src/components/Recomendacao.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

const Recomendacao = ({ matricula }) => {
    const [recomendacoes, setRecomendacoes] = useState([]);
    const [creditos, setCreditos] = useState(0); // Valor padrão para a quantidade de créditos
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const fetchRecomendacoes = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/historico/sugerirDisciplina/${matricula}/${creditos}`);
            console.log('Recomendações:', response.data); // Log para verificar a resposta
            setRecomendacoes(response.data);
        } catch (err) {
            setError('Erro ao buscar recomendações. Tente novamente mais tarde.');
            console.error(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Validação para aceitar apenas 0 ou entre 16 e 24
        if (creditos === '' || (creditos !== '0' && (creditos < 16 || creditos > 24))) {
            setError('Por favor, insira 0 ou um valor entre 16 e 24.');
            return;
        }
        setError(''); // Limpa o erro se a validação for bem-sucedida
        fetchRecomendacoes(); // Chama a função para buscar recomendações
    };

    const handleBack = () => {
        navigate('/Menu'); // Navega de volta ao menu
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Recomendações de Disciplinas
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="number"
                    label="Quantidade de Créditos"
                    value={creditos}
                    onChange={(e) => setCreditos(e.target.value)}
                    inputProps={{ min: 0, max: 24 }} // Define o intervalo de créditos
                    required
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                    Buscar Recomendações
                </Button>
            </form>
            {error && <Typography color="error">{error}</Typography>}
            <ul>
                {recomendacoes.map((disciplina) => (
                    <li key={disciplina.codigo.trim()}>
                        <Typography variant="h6">{disciplina.descricao}</Typography>
                        <Typography>Código: {disciplina.codigo.trim()}</Typography>
                        <Typography>Créditos: {disciplina.creditos}</Typography>
                        <Typography>Professor: {disciplina.professor || 'Não disponível'}</Typography>
                        <Typography>Turma ID: {disciplina.turmaId || 'Não disponível'}</Typography>
                        <Typography>Horário ID: {disciplina.horarioId || 'Não disponível'}</Typography>
                        <Typography>Período: {disciplina.periodo}</Typography>
                        <hr />
                    </li>
                ))}
            </ul>
            <Button variant="contained" color="secondary" onClick={handleBack} style={{ marginTop: '20px' }}>
                Voltar ao Menu
            </Button>
        </Container>
    );
};

export default Recomendacao;
