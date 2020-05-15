import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft , FiChevronRight, FiUsers } from 'react-icons/fi';
import ReactLoading from 'react-loading';
import Modal from 'react-bootstrap/Modal';

import api, { my_api } from '../../services/api';

import logoImg from '../../assets/trybe.png';

import { Header, RepositoryInfo, Issues, TableContainer } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  id: number;
  full_name: string;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface PullRequest {
  title: string;
  id: number;
  html_url: string;
  mergeable_state: string | undefined;
  user: {
    login: string;
    url: string;
    avatar_url: string;
  };
  number: number;
  labels: [
    {
      name: string;
    },
  ];
  codeReview: boolean;
  helpWanted: boolean;
  jaTemDupla: boolean;
}

interface Dupla {
  dupla1: string;
  dupla2: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [pullRequestsWithCr, setPullRequestsWithCr] = useState<String[]>([]);
  const [helpNumber, setHelpNumber] = useState(0);
  const [crNumber, setCrNumber] = useState(0);

  const [duplas, setDuplas] = useState<Dupla[]>([]);

  const [dataToShow, setDataToShow] = useState<PullRequest[]>([]);
  const [showModal, setShowModal] = useState<Boolean>(false);

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
      console.log('--------------------------------');
      console.log('HORA (ms): ', new Date().getMilliseconds());
      console.log('COMANDO: SETAR REPOSITORIO');
      console.log('--------------------------------');
    });
    api
      .get(`repos/${params.repository}/pulls?per_page=100`)
      .then((response) => {
        setPullRequests(response.data);
        console.log('--------------------------------');
        console.log('HORA (ms): ', new Date().getMilliseconds());
        console.log('COMANDO: SETAR PULL REQUESTS');
        console.log('--------------------------------');
      });
  }, [params.repository]);

  useEffect(() => {
    if (repository) {
      console.log('--------------------------------');
      console.log('HORA (ms): ', new Date().getMilliseconds());
      console.log('EFEITO: REPOSITORIO SETADO');
      console.log(repository);
      console.log('--------------------------------');
    }
  }, [repository]);
  useEffect(() => {
    if (pullRequests.length > 0) {
      console.log('--------------------------------');
      console.log('HORA (ms): ', new Date().getMilliseconds());
      console.log('EFEITO: PULLREQUESTS SETADO');
      console.log(pullRequests);
      console.log('--------------------------------');
    }
  }, [pullRequests]);
  useEffect(() => {
    if (pullRequestsWithCr.length > 0) {
      console.log('--------------------------------');
      console.log('HORA (ms): ', new Date().getMilliseconds());
      console.log('EFEITO: PULLREQUESTS COM CR SETADO');
      console.log(pullRequestsWithCr);
      console.log('--------------------------------');
      postTheDataDuplas();
    }
  }, [pullRequestsWithCr]);

  useEffect(() => {
    if (pullRequests.length > 0) {
      console.log('--------------------------------');
      console.log('HORA (ms): ', new Date().getMilliseconds());
      console.log('COMANDO: SETAR PULLREQUESTS COM CR');
      console.log('--------------------------------');
      let helps = 0;
      let crs = 0;
      let prWithCr = [];
      for (let pull of pullRequests) {
        pull.helpWanted = false;
        pull.codeReview = false;
        pull.jaTemDupla = false;
        if (pull.labels.length > 0) {
          for (let i = 0; i < pull.labels.length; i++) {
            if (pull.labels[i].name === 'help wanted') {
              helps++;
              pull.helpWanted = true;
            }
            if (pull.labels[i].name === 'code-review') {
              crs++;
              pull.codeReview = true;
              prWithCr.push(pull.user.login);
            }
          }
        }
      }
      setPullRequestsWithCr(prWithCr);
      setDataToShow(pullRequests);
      setCrNumber(crs);
      setHelpNumber(helps);
    }
  }, [pullRequests]);

  function postTheDataDuplas() {
    console.log('----------------------------------');
    console.log('STARTED POST', 'AT: ', new Date().getMilliseconds());
    my_api.post(`/${repository?.id}`, pullRequestsWithCr);
    console.log(
      'POST FINISHED',
      'AT: ',
      new Date().getMilliseconds(),
      pullRequestsWithCr,
    );
    console.log('----------------------------------');
    setTimeout(() => {
      if (repository) {
        getAndSetDuplasState();
      }
    }, 1000);
  }

  function getAndSetDuplasState() {
    console.log('----------------------------------');
    console.log('STARTED GET', 'AT: ', new Date().getMilliseconds());
    my_api.get(`/${repository?.id}`).then((response) => {
      setDuplas(response.data);
      console.log(
        'GET FINISHED',
        'AT: ',
        new Date().getMilliseconds(),
        response.data,
      );

      console.log('----------------------------------');
    });
  }

  useEffect(() => {
    if (duplas.length > 0) {
      console.log('----------------------------------');
      console.log('DUPLAS UPDATED', 'AT: ', new Date().getMilliseconds());
      console.log(duplas);
      console.log('----------------------------------');
    }
  }, [duplas]);

  function handleDuplasButton() {
    handleOpenModal();
  }

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  function handleHelpButton() {
    const newPullRequests = pullRequests.filter((pull) => pull.helpWanted);
    setDataToShow(newPullRequests);
  }
  function handleCRButton() {
    const newPullRequests = pullRequests.filter((pull) => pull.codeReview);
    setDataToShow(newPullRequests);
  }
  function handlePRButton() {
    setDataToShow(pullRequests);
  }

  return (
    <>
      <Header>
        <img src={logoImg} width={150} alt="Trybe - Projects Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.name}</strong>
            </div>
            <button onClick={handleDuplasButton}>
              <FiUsers size={24} />
              Ver duplas de CR
            </button>
          </header>
          <ul>
            <li>
              <Link to="#" onClick={handleHelpButton}>
                <strong>{helpNumber}</strong>
                <span>Pedido(s) de ajuda</span>
              </Link>
            </li>
            <li>
              <Link to="#" onClick={handleCRButton}>
                <strong>{crNumber}</strong>
                <span>Pedido(s) de Code Review</span>
              </Link>
            </li>
            <li>
              <Link to="#" onClick={handlePRButton}>
                <strong>{repository.open_issues_count}</strong>
                <span>Pull Requests</span>
              </Link>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size={'lg'}>
        <Modal.Body>
          <TableContainer>
            <h1>Duplas de Code Review</h1>
            {duplas.length > 0 ? (
              duplas.map((dupla, index) => (
                <section key={dupla.dupla1}>
                  <p>{dupla.dupla1}</p>
                  <FiArrowRight size={20} />
                  <p>{dupla.dupla2}</p>
                </section>
              ))
            ) : (
              <article>
                <div>
                  <ReactLoading
                    type={'spin'}
                    color={'#0fa36b'}
                    height={'50%'}
                    width={'50%'}
                  />
                  <h2>Carregando</h2>
                </div>
              </article>
            )}
          </TableContainer>
        </Modal.Body>
      </Modal>

      <Issues>
        {dataToShow
          .filter((pull) => {
            return pull.user.login !== 'tryber';
          })
          .sort((a, b): number => {
            if (a.codeReview && !b.codeReview) {
              return -1;
            }
            if (a.helpWanted && !b.helpWanted) {
              return -1;
            }
            return 1;
          })
          .map((pull) => (
            <a key={pull.id} href={pull.html_url}>
              <img src={pull.user.avatar_url} alt={pull.user.login} />
              <div>
                <strong>{pull.user.login}</strong>
                <p>{pull.title}</p>
              </div>
              {pull.helpWanted && <span className="red">Ajuda</span>}
              {pull.codeReview && <span className="green">Code Review</span>}
              <FiChevronRight size={20} />
            </a>
          ))}
      </Issues>
    </>
  );
};

export default Repository;
