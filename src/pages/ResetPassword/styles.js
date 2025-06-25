import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ResetContainer = styled.div`
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

export const ResetTitle = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #3A0CA3;
  font-weight: 600;
`;

export const ResetForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  p {
    color: #555;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
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

export const Input = styled.input`
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

export const ResetButton = styled.button`
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

export const SuccessMessage = styled.div`
  background-color: #e6f7e6;
  border: 1px solid #c3e6c3;
  border-radius: 8px;
  padding: 1rem;
  color: #2e7d32;
  margin: 1rem 0;
  text-align: center;
  line-height: 1.5;
`;

export const BackToLogin = styled(Link)`
  margin-top: 1rem;
  color: #555;
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
  
  &:hover {
    color: #4a90e2;
    text-decoration: underline;
  }
`;

export const ResetFormContainer = styled.div`
  width: 100%;
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