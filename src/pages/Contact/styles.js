import styled from "styled-components";

export const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #ff8a00, #e52e71);
    border-radius: 3px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #555;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: ${props => props.$hasError ? '1px solid #e74c3c' : '1px solid #e0e0e0'};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  background-color: ${props => props.$hasError ? '#fff3f3' : '#fff'};

  &:focus {
    outline: none;
    border-color: #5b86e5;
    box-shadow: 0 0 0 3px rgba(91, 134, 229, 0.2);
  }

  &::placeholder {
    color: #bbb;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.65rem 0.9rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: ${props => props.$hasError ? '1px solid #e74c3c' : '1px solid #e0e0e0'};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${props => props.$hasError ? '#fff3f3' : '#fff'};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: #5b86e5;
    box-shadow: 0 0 0 3px rgba(91, 134, 229, 0.2);
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.65rem 0.9rem;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: ${props => props.$hasError ? '1px solid #e74c3c' : '1px solid #e0e0e0'};
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  background-color: ${props => props.$hasError ? '#fff3f3' : '#fff'};
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #5b86e5;
    box-shadow: 0 0 0 3px rgba(91, 134, 229, 0.2);
  }

  &::placeholder {
    color: #bbb;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.65rem 0.9rem;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(90deg, #5b86e5, #36d1dc);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  width: 100%;

  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #4a75d4, #25c0cb);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(91, 134, 229, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(91, 134, 229, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(90deg, #b4c2e2, #9fd3d8);
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.75rem 1.25rem;
  }
`;

export const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

export const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
  border-left: 4px solid #28a745;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
`;
