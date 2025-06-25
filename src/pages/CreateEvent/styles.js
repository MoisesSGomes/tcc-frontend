import styled from "styled-components";

// Definindo a paleta de cores
const colors = {
    primary: "#4361EE",
    secondary: "#3A0CA3",
    accent: "#F72585",
    background: "#FFFFFF",
    lightGray: "#F4F5F7",
    darkGray: "#4F4F4F",
    text: "#333333",
    border: "#E0E0E0",
    success: "#4CAF50",
    error: "#F44336",
};

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightGray};
  padding: 30px 0;
`;

export const ContainerForms = styled.div`
  background-color: ${colors.background};
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  width: 760px;
  max-width: 95%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
`;

export const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.error ? colors.error : colors.border};
  font-size: 16px;
  width: 100%;
  transition: all 0.2s ease;
  outline: none;
  background-color: ${colors.background};

  &:focus {
    border-color: ${props => props.error ? colors.error : colors.primary};
    box-shadow: 0 0 0 2px ${props => props.error ? 'rgba(244, 67, 54, 0.15)' : 'rgba(67, 97, 238, 0.15)'};
  }

  &::placeholder {
    color: ${colors.darkGray}80;
  }

  &[type="date"],
  &[type="time"] {
    cursor: pointer;
    color: ${colors.text};
    font-family: inherit;
  }
`;

export const Description = styled.textarea`
    width: 100%;
  padding: 16px;
  height: 200px;
  border-radius: 8px;
  border: 1px solid ${props => props.error ? colors.error : colors.border};
  resize: vertical;
  font-family: inherit;
  font-size: 16px;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: ${props => props.error ? colors.error : colors.primary};
    box-shadow: 0 0 0 2px ${props => props.error ? 'rgba(244, 67, 54, 0.15)' : 'rgba(67, 97, 238, 0.15)'};
  }

  &::placeholder {
    color: ${colors.darkGray}80;
  }
`;

export const Button = styled.button`
  padding: 0 24px;
  height: 48px;
  border-radius: 8px;
  border: none;
  background-color: ${colors.primary};
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${colors.darkGray}50;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const DivButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const DivImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  & label {
    margin-bottom: 12px;
    font-weight: 600;
    color: ${colors.text};
    font-size: 16px;
  }

  .image-preview-container {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    border: 1px dashed ${colors.border};
    padding: 15px;
    background-color: ${colors.lightGray}30;
    
    img {
      max-width: 100%;
      max-height: 200px;
      object-fit: contain;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.02);
      }
    }
  }
`;

export const InputUpload = styled.input`
  position: relative;
  height: auto;
  width: 100%;
  
  &::file-selector-button {
    padding: 10px 16px;
    border-radius: 6px;
    border: none;
    background-color: ${colors.lightGray};
    color: ${colors.darkGray};
    font-weight: 500;
    cursor: pointer;
    margin-right: 16px;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${colors.border};
    }
  }
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  width: 100%;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${colors.text};
  font-size: 14px;
  
  &::after {
    content: attr(required);
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 8px;
  padding: 10px 16px;
  background-color: ${colors.error}10;
  border-left: 3px solid ${colors.error};
  color: ${colors.error};
  border-radius: 4px;
  font-size: 14px;
`;

export const PageTitle = styled.h1`
  color: ${colors.secondary};
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

// Novos componentes adicionados

export const FormFieldset = styled.fieldset`
  border: 1px solid ${colors.border};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  
  legend {
    padding: 0 10px;
    font-weight: 600;
    color: ${colors.secondary};
  }
`;

export const FormSection = styled.div`
  margin-bottom: 24px;
  
  h3 {
    font-size: 18px;
    margin-bottom: 16px;
    color: ${colors.secondary};
    font-weight: 600;
    border-bottom: 1px solid ${colors.border};
    padding-bottom: 8px;
  }
`;

export const SuccessMessage = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: ${colors.success}10;
  border-left: 3px solid ${colors.success};
  color: ${colors.success};
  border-radius: 4px;
  font-size: 16px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`;

export const RequiredFieldNote = styled.p`
  font-size: 13px;
  color: ${colors.darkGray};
  margin-bottom: 20px;
  
  span {
    color: ${colors.error};
    font-weight: bold;
  }
`;

export const FormHelperText = styled.p`
  font-size: 12px;
  color: ${colors.darkGray};
  margin-top: 4px;
  margin-bottom: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  
  &:hover {
    background-color: ${colors.primary}10;
    color: ${colors.secondary};
    border-color: ${colors.secondary};
  }
`;

