import styled from 'styled-components';

export const InstallBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: #2c3e50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const InstallButton = styled.button`
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #3e8e41;
  }
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.2s;

  &:hover {
    background: #c0392b;
  }
`;