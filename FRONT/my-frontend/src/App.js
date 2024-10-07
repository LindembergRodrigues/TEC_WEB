import React from 'react';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';

function App() {
  return (
      <div className="App">
        <h1>Gestão de Usuários</h1>
        <CreateUser />
        <DeleteUser />
      </div>
  );
}

export default App;
