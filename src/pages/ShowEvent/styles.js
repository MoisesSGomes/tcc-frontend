import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;    
`;

export const DivImagem = styled.div`
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    max-width: 1100px;
    height: auto;
    background-color: lightgray;
    border-radius: 15px;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;    
    padding: 10px;

    @media (max-width: 768px) {
        margin-top: 20px;
    }
`;

export const Imagem = styled.img`    
    width: 100%;
    max-width: 1000px;
    height: auto;
    max-height: 550px;
    border-radius: 15px;
    object-fit: cover;
`;

export const DivInfo = styled.div`
    margin-top: 24px;
    margin-bottom: 60px;
    width: 90%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

export const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.6rem;
    }
`;

export const Endereco = styled.p`
    font-size: 1.125rem;
    font-weight: bold;    

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.95rem;
    }
`;

export const Description = styled.p`
    font-size: 1rem;
    white-space: pre-wrap;

    @media (max-width: 768px) {
        font-size: 0.95rem;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

export const DivDescription = styled.div`
    padding: 20px;
    margin-top: 20px;
    width: 100%;
    max-width: 1000px;
    border-radius: 10px;
    min-height: 500px;
    height: 100%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
                rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  padding: 0;
  
  img {
    width: 40px;
    height: 40px;
    display: block;
  }

  &:hover img {
    opacity: 0.8;
  }
`;

export const DivLike = styled.div`
    padding: 0 15px 0 0;
    width: 90%;
    max-width: 1000px;
    height: 20px;
    display: flex;
    justify-content: end;
`;
