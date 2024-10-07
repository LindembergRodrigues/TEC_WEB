import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
    const [matricula, setMatricula] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/usuario/deletarUsuairo/${matricula}`);
            alert('Usuário removido com sucesso!');
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert('Erro ao remover usuário');
        }
    };

    return (
        <div>
            <h2>Deletar Usuário</h2>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    placeholder="Matrícula do usuário"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                />
                <button type="submit">Deletar Usuário</button>
            </form>
        </div>
    );
};

export default DeleteUser;
