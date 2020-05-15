import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  @media (max-width: 500px) {
    margin-top: 40px;
  }

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;

      @media (max-width: 500px) {
        width: 80px;
        height: 80px;
      }
    }

    div {
      margin-left: 24px;

      @media (max-width: 500px) {
        margin-left: 18px;
      }

      strong {
        font-size: 36px;
        color: #3d3d4d;

        @media (max-width: 500px) {
          font-size: 26px;
        }
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    @media (max-width: 500px) {
      margin-top: 20px;
    }

    li {
      a {
        display: flex;
        flex-direction: column;
        align-items: center;

        text-decoration: none;
      }

      & + li {
        margin-left: 80px;

        @media (max-width: 500px) {
          margin-left: 40px;
        }
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;

        @media (max-width: 500px) {
          font-size: 26px;
        }
      }
      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;

        @media (max-width: 500px) {
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }

  button {
    margin-left: auto;
    width: 20%;
    height: 60px;
    background: #0fa36b;
    border-radius: 5px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${shade(0.2, '#0fa36b')};
    }

    svg {
      margin-right: 5px;
    }
  }
`;

export const Issues = styled.section`
  margin-top: 80px;

  @media (max-width: 500px) {
    margin-top: 40px;
  }

  a {
    background: #fff;
    border-radius: 5px;
    max-width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    @media (max-width: 500px) {
      padding: 16px;
    }

    display: flex;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;

    span {
      margin-right: 24px;

      color: #fff;
      font-weight: bold;
      padding: 12px;
      border-radius: 5px;

      @media (max-width: 500px) {
        margin-right: auto;
        width: 60px;
        text-align: center;
        padding: 6px;
        font-size: 12px;
      }
    }

    span.red {
      background-color: #f00;
    }

    span.green {
      background-color: #0fa36b;
    }

    & + a {
      margin-top: 16px;
    }

    &:hover {
      box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);

      transform: scale(1.025);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;

      @media (max-width: 500px) {
        width: 50px;
        height: 50px;
      }
    }

    div {
      margin: 0 16px;
      flex: 1;

      @media (max-width: 500px) {
        margin: 0 8px;
      }

      strong {
        font-size: 20px;
        color: #3d3d4d;

        @media (max-width: 500px) {
          font-size: 15px;
        }
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;

        @media (max-width: 500px) {
          font-size: 13px;
          margin-top: 2px;
        }
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const TableContainer = styled.div`
  min-width: 700px;

  section {
    display: flex;
    justify-content: space-around;
    align-items: center;

    background-color: #f0f0f5;
    padding: 5px 10px;
    border-radius: 5px;
    & + section {
      margin-top: 10px;
    }

    p {
      width: 33%;
      text-align: center;
      margin: 0;
    }
  }

  h1 {
    background-color: #0fa36b;
    color: white;
    font-weight: bold;
    padding: 5px 20px;
    border-radius: 5px;
    text-align: center;

    margin-bottom: 30px;
  }

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      h2 {
        margin-top: 10px;
        color: #0fa36b;
        font-weight: bold;
      }
    }
  }
`;
