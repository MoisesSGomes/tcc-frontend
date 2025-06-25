import styled from 'styled-components'
import { Link } from "react-router-dom"

export const DivResend = styled.div`
  max-width: 450px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TituloResend = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #3A0CA3;
  font-weight: 600;
`;

export const FormResend = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
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
`;

export const InputResend = styled.input`
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
`;

export const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  height: 1rem;
`;

export const ButtonResend = styled.button`
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
`;

// Additional success/error message styles
export const SuccessMessage = styled.p`
  color: #28a745;
  text-align: center;
  margin: 1rem 0;
  padding: 0.8rem;
  background-color: #d4edda;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
  width: 100%;
`;

export const ErrorMessageBlock = styled.p`
  color: #dc3545;
  text-align: center;
  margin: 1rem 0;
  padding: 0.8rem;
  background-color: #f8d7da;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  width: 100%;
`;

