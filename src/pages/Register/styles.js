import styled from 'styled-components'
import { Link } from "react-router-dom"

export const DivRegister = styled.div`
  max-width: 450px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    padding: 1.5rem 1rem;
    margin: 1rem;
  }
`;

export const TituloRegister = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #3A0CA3;
  font-weight: 600;

  @media (max-width: 500px) {
    font-size: 1.6rem;
    text-align: center;
  }
`;

export const FormRegister = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

export const InputLabel = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #555;
  font-weight: 500;

  @media (max-width: 500px) {
    font-size: 0.85rem;
  }
`;

export const InputRegister = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${props => props.$error ? '#ff4d4d' : '#ddd'};
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: ${props => props.$error ? '#fff8f8' : '#f9f9f9'};
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  @media (max-width: 500px) {
    font-size: 0.95rem;
    padding: 0.7rem;
  }
`;

export const PasswordInputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export const PasswordToggleButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #555;
  font-size: 0.8rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #4a90e2;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;

export const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  height: 1rem;

  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;

export const ChecklistContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  color: ${props => props.$satisfied ? '#2ecc71' : '#888'};
  transition: color 0.2s ease;

  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;

export const CheckIcon = styled.span`
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => props.$satisfied ? '#2ecc71' : 'transparent'};
  border: 1px solid ${props => props.$satisfied ? '#2ecc71' : '#ddd'};
  color: white;
  font-size: 0.7rem;
  transition: all 0.2s ease;
`;

export const TermsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

export const TermsLink = styled(Link)`
  color: #4a90e2;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonRegister = styled.button`
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.disabled ? '#cccccc' : '#4a90e2'};
  color: ${props => props.disabled ? '#888' : 'white'};
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#3a80d2'};
  }

  @media (max-width: 500px) {
    font-size: 0.95rem;
    padding: 0.7rem;
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

  @media (max-width: 500px) {
    font-size: 0.85rem;
    text-align: center;
  }
`;
