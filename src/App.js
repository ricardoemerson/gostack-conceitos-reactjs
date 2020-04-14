import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/repositories');

      setRepositories(data);
    })();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Novo repositório ${ Date.now() }`,
      url: 'https://github.com/ricardoemerson',
      techs: ['Node JS', 'React JS', 'React Native']
    };

    const { data } = await api.post('/repositories', repository);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${ id }`);

    if (response.status === 204) {
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          <li key={ repository.id }>
            { repository.title }

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
