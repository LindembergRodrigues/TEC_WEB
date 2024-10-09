// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Menu from './Menu';
import Recomendacao from './Recomendacao';
import CadastrarHistorico from './CadastrarHistorico';
import Disciplinas from "./Disciplinas";


const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null); // Limpa o estado do usuário
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route path="/menu" element={user ? <Menu onLogout={handleLogout} /> : <Navigate to="/" />} />
                <Route path="/recomendacao" element={user ? <Recomendacao matricula={user.matricula} /> : <Navigate to="/" />} />
                <Route path="/cadastrar-historico" element={user ? <CadastrarHistorico /> : <Navigate to="/" />} />
                <Route path="/cadastrar-disciplina" element={user ? <Disciplinas /> : <Navigate to="/" />} />

            </Routes>
        </Router>
    );
};

export default App;
