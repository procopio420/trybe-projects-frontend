import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  line-height: 56px;

  margin-top: 80px;

  @media (max-width: 500px) {
    font-size:36px;

    margin-top: 40px;
  }
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 650px;

  display: flex;

  select {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 25%;
    height: 70px;
    background: #0fa36b;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#0fa36b')};
    }
  }

  @media (max-width: 500px) {
    max-width: 100%;

    input {
      max-width: 70%;
      height: 60px;
      font-size: 14px;
    }

    button {
      max-width: 30%;
      height: 60px;
      font-size: 14px;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;

  @media (max-width:500px){
    font-size: 14px;
  }
`;

export const Repositories = styled.form`
  margin-top: 40px;
  max-width: 100%;

  h2 {
    font-size: 36px;
    color: #3a3a3a;
    line-height: 56px;

    @media (max-width: 500px){
      font-size: 30px;
      line-height: 50px;
    }
  }

  a {
    display: flex;
    align-items: center;
    margin-top: 16px;

    width: 100%;
    background: #fff;
    border-radius: 5px;

    padding: 24px;

    text-decoration: none;

    transition: box-shadow 0.2s, transform 0.2s;

    @media (max-width: 500px) {
      padding: 16px;
    }

    &:hover {
      box-shadow: 0 8px 17px 2px rgba(0,0,0,0.14), 
			0 3px 14px 2px rgba(0,0,0,0.12), 
			0 5px 5px -3px rgba(0,0,0,0.2);

      transform: scale(1.025);
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;

      @media (max-width: 500px){
        width: 56px;
        height: 56px;
      }
    }
    div {
      margin: 0 16px;
      flex: 1;

      @media (max-width: 500px){
        margin: 0 6px 0 10px;
      }

      strong {
        font-size: 20px;
        color: #3d3d4d;

        @media (max-width: 500px){
          font-size: 16px;
        }
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;