// src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Menu = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Menu do Curso de Computação
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Logout</Button>
                </Toolbar>
            </AppBar>
            <Container style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Menu
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: '10px' }}
                            component={Link}
                            to="/recomendacao"
                        >
                            RECOMENDAÇÃO
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: '10px' }}
                            component={Link}
                            to="/cadastrar-historico"
                        >
                            CADASTRAR HISTÓRICO
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: '10px' }}
                            component={Link}
                            to="/cadastrar-disciplina"
                        >
                            CADASTRAR DISCIPLINA
                        </Button>
                    </li>
                </ul>
            </Container>
        </div>
    );
};

export default Menu;
