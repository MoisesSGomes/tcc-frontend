import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`

export const Div1 = styled.div`
    width: 100%;
    max-width: 1315px;
    margin-top: 60px;
    padding: 5px;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    gap: 20px;
    border-radius: 10px;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
                rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
                rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`

export const DivGrid = styled.div`
    width: 220px;
    margin: 10px;

    @media (max-width: 768px) {
        width: 45%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`

export const ImgItem = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;

    &:hover {
        opacity: 0.9;
    }
`

export const DivTitle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 5px;
    border-radius: 0 0 15px 15px;
    height: 100px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
                0 4px 6px -4px rgb(0 0 0 / 0.1);

    &:hover {
        opacity: 0.9;
    }
`

export const Title = styled.h3`
    margin: 20px;
    text-align: center;
    font-size: 1rem;

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`

export const LinkEvento = styled.a`
    text-decoration: none;
    color: black;
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
`

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    gap: 8px;
`
