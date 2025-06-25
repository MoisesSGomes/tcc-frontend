import styled from 'styled-components'
import { Link } from "react-router-dom"

export const DivLogin = styled.div`
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
    margin: 1rem;
    padding: 1.5rem;
  }
`;

export const TituloLogin = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #3A0CA3;
  font-weight: 600;

  @media (max-width: 500px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

export const FormLogin = styled.form`
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
`;

export const InputLogin = styled.input`
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

export const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  height: 1rem;
`;

export const ButtonLogin = styled.button`
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

export const RegisterLink = styled(Link)`
  margin-top: 1.5rem;
  color: #555;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    color: #4a90e2;
    text-decoration: underline;
  }

  @media (max-width: 500px) {
    text-align: center;
  }
`;

export const ForgotPasswordLink = styled(Link)`
  align-self: flex-end;
  font-size: 0.85rem;
  color: #4a90e2;
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 500px) {
    align-self: center;
  }
`;

export const VerificationAlertContainer = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const VerificationAlertMessage = styled.p`
  color: #721c24;
  margin: 0;
  font-size: 14px;
  text-align: center;
`;

export const VerificationAlertButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const VerificationAlertButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0069d9;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const AlertCloseButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const SocialLoginContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background-color: #fff;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  @media (max-width: 500px) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #777;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  span {
    margin: 0 10px;
    font-size: 14px;
  }
`;
