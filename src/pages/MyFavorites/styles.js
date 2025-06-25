import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const Div1 = styled.div`
    width: 100%;
    max-width: 1315px;
    min-height: 550px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    margin-top: 60px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
                rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
                rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;

export const ImgItem = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
    &:hover {
        opacity: 0.9;
    }
`;

export const Title = styled.h3`
    margin: 10px;
    text-align: center;
    font-size: 1.1rem;
`;

export const DivTitle = styled.div`
    width: 100%;
    max-width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 10px;
    border-radius: 0 0 15px 15px;
    height: 100px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 
                0 4px 6px -4px rgba(0,0,0,0.1);
    &:hover {
        opacity: 0.9;
    }
`;

export const DivGrid = styled.div`
    margin: 10px;
    width: 100%;
    max-width: 220px;
`;

export const LinkEvento = styled.a`
    text-decoration: none;
    color: black;
    display: block;
`;

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
`;

export const Pagination = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    gap: 8px;
`;

export const DivIcons = styled.div`
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    gap: 10px;
`;

export const ButtonEdit = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;

export const ButtonTrash = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;
