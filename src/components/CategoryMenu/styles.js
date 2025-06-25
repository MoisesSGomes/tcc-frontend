import styled from "styled-components";

export const DivUnit1 = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    background-color: white;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

export const LinkFiltro = styled.a`
    text-decoration: none;
    color: black;
`;

export const DivIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 100px;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover img {
        transform: scale(1.1);
    }

    img {
        width: 70px;
        height: 70px;
        transition: transform 0.3s ease;
    }

    @media (max-width: 768px) {
        width: 100px;
        height: 90px;

        img {
            width: 60px;
            height: 60px;
        }
    }

    @media (max-width: 480px) {
        width: 90px;
        height: 80px;

        img {
            width: 50px;
            height: 50px;
        }
    }
`;

export const TitleIcon = styled.h3`
    text-align: center;
    font-size: 14px;
    margin-top: 8px;

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
