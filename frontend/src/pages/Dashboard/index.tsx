import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api, { my_api } from '../../services/api';

import logoImg from '../../assets/trybe.png';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  id: number;
  full_name: string;
  name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [team, setTeam] = useState('');
  const [teamStr, setTeamStr] = useState(() => {
    const storagedTeam = localStorage.getItem('@GithubExplorer:team');
    if (storagedTeam) {
      return storagedTeam;
    }
    return '';
  });
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );
    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<boolean> {
    event.preventDefault();
    setInputError('');

    localStorage.setItem('@GithubExplorer:team', team);

    if (!team) {
      setInputError('Digite o número da turma!');
      return false;
    }
    if (Number(team) > 5 || Number(team) < 1) {
      setInputError('Turma inexistente!');
      return false;
    }

    try {
      const name = `sd-0${team}`;
      const response1 = await api.get<Repository[]>(
        `users/tryber/repos?sort=created&per_page=100&page=1`,
      );
      const response2 = await api.get<Repository[]>(
        `users/tryber/repos?sort=created&per_page=100&page=2`,
      );
      const allRepositories = response1.data.concat(response2.data);

      const repositoriesFromTeam = [];

      for (const rep of allRepositories) {
        const repName = rep.name;
        if (
          repName.startsWith(name) &&
          !repName.endsWith('tests') &&
          !repName.endsWith('live-lectures')
        ) {
          repositoriesFromTeam.push(rep);
        }
        if (
          repName.startsWith(name) &&
          repName.endsWith('unit-tests') &&
          !repName.endsWith('live-lectures')
        ) {
          repositoriesFromTeam.push(rep);
        }
      }
      setTeamStr(team);
      setRepositories(repositoriesFromTeam);
      setTeam(team);
      setInputError('');
    } catch (e) {
      setInputError(
        'Erro! Turma não encontrada, por favor, digite o número da turma (1-5).',
      );
    }
    return true;
  }

  useEffect(() => {
    repositories.forEach((rep) => {
      my_api.post(`/create/${rep.id}`);
      console.log('CREATE TABLE')
    });
  }, [repositories]);

  return (
    <>
      <img src={logoImg} width={150} alt="Trybe - Projects Explorer" />
      <Title>Acompanhe os projetos Trybe</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="Digite a turma: (ex.: 1)"
          type="number"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {teamStr && <h2>Turma {teamStr}</h2>}
        {repositories.map((repository) => (
          <a
            key={repository.full_name}
            href={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.name}</strong>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
