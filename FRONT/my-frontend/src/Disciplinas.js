import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const Disciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [formData, setFormData] = useState({
        codigo: '',
        descricao: '',
        creditos: '',
        turmaId: '',
        horarioId: '',
        professor: '',
        periodo: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');

    // Função para buscar as disciplinas
    const fetchDisciplinas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/disciplina/capturarDisciplina/all');
            setDisciplinas(response.data);
        } catch (err) {
            console.error('Erro ao buscar disciplinas:', err);
            setError('Erro ao buscar disciplinas.');
        }
    };

    useEffect(() => {
        fetchDisciplinas();
    }, []);

    // Função para lidar com mudanças nos campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Função de validação do formulário
    const validateForm = () => {
        const { codigo, descricao, creditos, periodo } = formData;
        if (!codigo || !descricao || !creditos || !periodo) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        return true;
    };

    // Função para enviar o formulário (criar ou editar disciplina)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        const disciplinaData = {
            ...formData,
            creditos: parseInt(formData.creditos),
            turmaId: formData.turmaId ? parseInt(formData.turmaId) : null,
            horarioId: formData.horarioId ? parseInt(formData.horarioId) : null,
            periodo: parseInt(formData.periodo),
        };

        try {
            if (isEditing) {
                // Editar disciplina
                await axios.put(`http://localhost:3000/disciplina/atualizarDisciplina/${editId}`, disciplinaData);
            } else {
                // Criar disciplina
                await axios.post('http://localhost:3000/disciplina/criarDisciplina', disciplinaData);
            }
            fetchDisciplinas();
            resetForm();
        } catch (err) {
            console.error('Erro ao salvar disciplina:', err);
            setError('Erro ao salvar disciplina. Tente novamente.');
        }
    };

    // Função para preencher o formulário com os dados de uma disciplina para edição
    const handleEdit = (disciplina) => {
        setFormData({
            codigo: disciplina.codigo,
            descricao: disciplina.descricao,
            creditos: disciplina.creditos,
            turmaId: disciplina.turmaId,
            horarioId: disciplina.horarioId,
            professor: disciplina.professor,
            periodo: disciplina.periodo,
        });
        setIsEditing(true);
        setEditId(disciplina.codigo); // Certifique-se que o código seja único ou use um id
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setFormData({
            codigo: '',
            descricao: '',
            creditos: '',
            turmaId: '',
            horarioId: '',
            professor: '',
            periodo: ''
        });
        setIsEditing(false);
        setEditId(null);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gerenciamento de Disciplinas
            </Typography>
            <form onSubmit={handleSubmit}>
                {['codigo', 'descricao', 'creditos', 'turmaId', 'horarioId', 'professor', 'periodo'].map((field) => (
                    <TextField
                        key={field}
                        name={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required={['codigo', 'descricao', 'creditos', 'periodo'].includes(field)}
                        style={{ margin: '10px' }}
                        type={['creditos', 'turmaId', 'horarioId', 'periodo'].includes(field) ? 'number' : 'text'}
                    />
                ))}
                <Button type="submit" variant="contained" color="primary" style={{ margin: '10px' }}>
                    {isEditing ? 'Atualizar Disciplina' : 'Cadastrar Disciplina'}
                </Button>
                <Button type="button" onClick={resetForm} variant="outlined" style={{ margin: '10px' }}>
                    Cancelar
                </Button>
            </form>
            {error && <Typography color="error">{error}</Typography>}
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Créditos</TableCell>
                            <TableCell>Turma ID</TableCell>
                            <TableCell>Horário ID</TableCell>
                            <TableCell>Professor</TableCell>
                            <TableCell>Período</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {disciplinas.map((disciplina) => (
                            <TableRow key={disciplina.codigo}>
                                <TableCell>{disciplina.codigo}</TableCell>
                                <TableCell>{disciplina.descricao}</TableCell>
                                <TableCell>{disciplina.creditos}</TableCell>
                                <TableCell>{disciplina.turmaId}</TableCell>
                                <TableCell>{disciplina.horarioId}</TableCell>
                                <TableCell>{disciplina.professor}</TableCell>
                                <TableCell>{disciplina.periodo}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(disciplina)} color="secondary">
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Disciplinas;
