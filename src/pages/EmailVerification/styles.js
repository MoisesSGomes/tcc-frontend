import styled from 'styled-components'
import { Link } from "react-router-dom"

export const DivVerification = styled.div`
  max-width: 450px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    margin: 1rem auto;
  }
`;

export const TituloVerification = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #3A0CA3;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const VerificationMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.$success ? '#28a745' : props.$success === false ? '#dc3545' : '#555'};
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const VerificationButton = styled.button`
  width: 100%;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background-color: #4a90e2;
  color: white;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #3a80d2;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.7rem 1rem;
  }
`;

export const LoginLink = styled(Link)`
  margin-top: 1.5rem;
  color: #555;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    color: #4a90e2;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;


