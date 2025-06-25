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
    max-width: 1215px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 10px;
    gap: 20px;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
                rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
                rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
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

export const Title = styled.h3`
    margin: 10px;
    text-align: center;
    font-size: 1rem;

    @media (max-width: 600px) {
        font-size: 0.9rem;
    }
`

export const DivTitle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 10px;
    border-radius: 0 0 15px 15px;
    height: 80px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    &:hover {
        opacity: 0.9;
    }
`

export const DivGrid = styled.div`
    margin-top: 40px;
    width: 200px;
    border-radius: 15px;
    background-color: #f8f8f8;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
`

export const DivButton = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;

    @media (max-width: 600px) {
        justify-content: center;
    }
`

export const ButtonEventos = styled.button`
    width: 120px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    background-color: #1976D2;
    color: white;
    border: none;
    font-size: 0.9rem;

    &:hover {
        background-color: #2196F3;
    }
`

export const LinkEvento = styled.a`
    text-decoration: none;
    color: black;
    display: block;
    width: 100%;
`


