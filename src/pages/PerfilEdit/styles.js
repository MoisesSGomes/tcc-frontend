import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
`;

export const ContainerForms = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #3A0CA3;
  font-weight: 600;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DivForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DivImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  align-items: center;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

export const FormLabel = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #555;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${props => props.error ? '#ff4d4d' : '#ddd'};
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: ${props => props.error ? '#fff8f8' : '#f9f9f9'};
  width: 100%;
  margin-bottom: 0.3rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const InputUpload = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #f9f9f9;
  width: 100%;
  margin-bottom: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const Description = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  height: 1rem;
`;

export const DivButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const Button = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.disabled ? '#cccccc' : '#4a90e2'};
  color: ${props => props.disabled ? '#888' : 'white'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#3a80d2'};
  }
`;

export const ImagePreviewContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ImagePreview = styled.img`
  max-width: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
        transform: scale(1.02);
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
  color: ${props => props.satisfied ? '#2ecc71' : '#888'};
  transition: color 0.2s ease;
`;

export const CheckIcon = styled.span`
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => props.satisfied ? '#2ecc71' : 'transparent'};
  border: 1px solid ${props => props.satisfied ? '#2ecc71' : '#ddd'};
  color: white;
  font-size: 0.7rem;
  transition: all 0.2s ease;
`;
