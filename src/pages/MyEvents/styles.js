import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
`

export const Div1 = styled.div` 
    width: 1315px;
    min-height: 550px;
    height: 100%;
    margin-top: 60px;
    padding: 5px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

    @media (max-width: 1400px) {
        width: 100%;
        justify-content: center;
        margin: 0;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

export const DivGrid = styled.div`
    margin: 20px;
    position: relative;

    @media (max-width: 768px) {
        margin: 10px 0;
    }
`

export const ImgItem = styled.img`
    width: 220px;
    height: 150px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: 480px) {
        width: 90vw;
        height: 180px;
    }
`

export const DivTitle = styled.div`
    width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 5px;
    border-radius: 0 0 15px 15px;
    height: 100px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: 480px) {
        width: 90vw;
        text-align: center;
    }
`

export const Title = styled.h3`
    margin: 20px;
    text-align: center;
    font-size: 1.2rem;

    @media (max-width: 480px) {
        font-size: 1rem;
        margin: 10px;
    }
`

export const LinkEvento = styled.a`
    text-decoration: none;
    color: black;
`

export const StatusTag = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: ${({ $status }) => 
        $status === "realizado" 
            ? "rgba(255, 0, 0, 0.8)" 
            : $status === "andamento" 
                ? "rgba(0, 128, 0, 0.8)" 
                : "rgba(0, 0, 255, 0.8)"};
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14px;
    z-index: 10;

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 4px 8px;
    }
`

export const PageButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #007bff;
    border-radius: 4px;
    background-color: ${({ $isActive }) => ($isActive ? '#007bff' : '#fff')};
    color: ${({ $isActive }) => ($isActive ? '#fff' : '#007bff')};
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #0056b3;
        color: white;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 14px;
    }
`

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 8px;
    flex-wrap: wrap;
`

export const DivIcons = styled.div`
    padding: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 220px;
    height: 50px;

    @media (max-width: 480px) {
        width: 90vw;
    }
`

export const ButtonEdit = styled.button`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: ${({ $isPast }) => ($isPast ? 'not-allowed' : 'pointer')};
    opacity: ${({ $isPast }) => ($isPast ? '0.5' : '1')};
    filter: ${({ $isPast }) => ($isPast ? 'grayscale(100%)' : 'none')};

    @media (max-width: 480px) {
        width: 35px;
        height: 35px;
    }
`

export const ButtonTrash = styled(ButtonEdit)``;


