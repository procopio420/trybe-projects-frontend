import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
} from 'react-icons/fi';
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
  html_url: string;
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
  review_comments_url: string;
}

interface Dupla {
  student1: string;
  student2: string;
  avatar_student_1: string;
  avatar_student_2: string;
  comments_student_2: string;
  url_student_2: string;
  code_review_done: boolean;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [pullRequestsWithCr, setPullRequestsWithCr] = useState<PullRequest[]>(
    [],
  );
  const [helpNumber, setHelpNumber] = useState(0);
  const [crNumber, setCrNumber] = useState(0);

  const [duplas, setDuplas] = useState<Dupla[]>([]);

  const [dataToShow, setDataToShow] = useState<PullRequest[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [classId, setClassId] = useState(0);
  const [repositoryId, setRepositoryId] = useState(0);

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });
    api
      .get(`repos/${params.repository}/pulls?per_page=100`)
      .then((response) => {
        setPullRequests(response.data);
      });
    my_api
      .get(`/getClassId/${params.repository.slice(7, 12)}`)
      .then((response) => {
        setClassId(response.data.class_id);
      });
  }, [params.repository]);

  useEffect(() => {
    if (repository) {
      const requestObject = {
        project_name: repository.name,
        repository_url: repository.html_url,
        repository_github_id: repository.id,
        class_id: classId,
      };
      my_api.post('/createRepository', requestObject).then((response) => {
        setRepositoryId(response.data.repository_id);
      });
    }
  }, [repository]);

  useEffect(() => {
    if (pullRequestsWithCr.length > 0) {
      postTheDataDuplas();
    }
  }, [pullRequestsWithCr]);

  useEffect(() => {
    if (pullRequests.length > 0) {
      let helps = 0;
      let crs = 0;
      let prWithCr = [];
      for (let pull of pullRequests) {
        pull.helpWanted = false;
        pull.codeReview = false;
        if (pull.labels.length > 0) {
          for (let i = 0; i < pull.labels.length; i++) {
            if (pull.labels[i].name === 'help wanted') {
              helps++;
              pull.helpWanted = true;
            }
            if (pull.labels[i].name === 'code-review') {
              crs++;
              pull.codeReview = true;
              prWithCr.push(pull);
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
    const sendDataPR = pullRequestsWithCr.map((pr) => ({
      url: pr.html_url,
      student: pr.user.login,
      avatar: pr.user.avatar_url,
      review_url: pr.review_comments_url,
    }));
    const requestObject = { data: sendDataPR, repository_id: repositoryId };
    my_api.post(`/createPair`, requestObject);
    my_api.get(`/update/${repositoryId}`);
    setTimeout(() => {
      if (repository) {
        getAndSetDuplasState();
      }
    }, 1000);
  }

  function getAndSetDuplasState() {
    my_api.get(`/${repositoryId}`).then(async (response) => {
      setDuplas(response.data);
    });
  }

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
              <div className="list-group">
                {duplas.map((dupla) => (
                  <a
                    key={dupla.student1}
                    type="button"
                    className="list-group-item list-group-item-action d-flex justify-content-around align-items-center"
                    href={dupla.url_student_2}
                    style={
                      dupla.code_review_done
                        ? { backgroundColor: '#0fa36b', color: 'white' }
                        : {}
                    }
                  >
                    <div className="w-50 d-flex align-items-center justify-content-start">
                      <img
                        src={dupla.avatar_student_1}
                        className="rounded-circle mr-5"
                        alt=""
                        width="50px"
                      />
                      {dupla.student1}
                    </div>
                    <FiArrowRight size={16} />
                    <div className="w-50 d-flex align-items-center justify-content-end">
                      {dupla.student2}
                      <img
                        src={dupla.avatar_student_2}
                        className="rounded-circle ml-5"
                        alt=""
                        width="50px"
                      />
                    </div>
                  </a>
                ))}
              </div>
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
