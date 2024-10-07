import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        matricula: '',
        nome: '',
        email: '',
        senha: '',
        tipo: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/usuario/criarUsuario', formData);
            alert('Usuário criado com sucesso!');
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert('Erro ao criar usuário');
        }
    };

    return (
        <div>
            <h2>Criar Usuário</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="matricula"
                    placeholder="Matrícula"
                    value={formData.matricula}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="tipo"
                    placeholder="Tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                />
                <button type="submit">Criar Usuário</button>
            </form>
        </div>
    );
};

export default CreateUser;
