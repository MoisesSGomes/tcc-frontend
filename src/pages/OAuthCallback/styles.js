import styled, { keyframes } from 'styled-components';

// Animação de rotação para o spinner
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Container principal da página de callback
export const DivCallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  text-align: center;
  
  p {
    margin-top: 24px;
    font-size: 18px;
    color: #333;
  }
`;

// Spinner de carregamento animado
export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: ${rotate} 1s ease-in-out infinite;
`;

// Mensagem de status opcional para erros ou informações adicionais
export const StatusMessage = styled.div`
  margin-top: 16px;
  padding: 12px 20px;
  border-radius: 4px;
  background-color: ${({ isError }) => (isError ? '#ffebee' : '#e8f5e9')};
  color: ${({ isError }) => (isError ? '#c62828' : '#2e7d32')};
  font-size: 14px;
  max-width: 80%;
  text-align: center;
`;

// Botão para retornar à página de login caso haja algum problema
export const ReturnButton = styled.button`
  margin-top: 24px;
  padding: 10px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
`;