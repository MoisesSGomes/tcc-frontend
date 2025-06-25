import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    padding: 0 15px;
    gap: 20px;

    max-height: 530px;
    //overflow: hidden;

    @media (max-width: 1024px) {
        max-height: 520px;
    }

    @media (max-width: 768px) {
        max-height: 530px;
    }
    @media (max-width: 550px) {
        max-height: 530px;
    }

    @media (max-width: 480px) {
        max-height: 530px;
    }
`;

export const ImgItem = styled.img`
    width: 100%;
    max-width: 230px;
    height: 170px;
    object-fit: cover; /* Garante que a imagem preencha sem distorcer */
    border-radius: 15px 15px 0 0;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.9;
    }

    /* Impede que a imagem herde tamanho de fora ou que varie */
    display: block;
`;

export const Title = styled.h3`
    text-align: center;
    font-size: 1rem;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

export const DivTitle = styled.div`
    background-color: white;
    padding: 10px;
    border-radius: 0 0 15px 15px;
    height: 100px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.9;
    }
`;

export const LinkEvento = styled.a`
    text-decoration: none;
    color: black;
    width: 230px; /* Tamanho fixo padronizado para os cards */
    
    @media (max-width: 768px) {
        width: 45vw;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;
