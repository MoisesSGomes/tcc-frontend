import styled from "styled-components";

export const BodyHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #EEEEEE;
    color: black;
    width: 100%;
    height: 80px;
    padding: 0 10px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        padding: 10px;
    }
`;

export const DivLogo = styled.div`
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    width: 100%;

    & img {
        width: 150px;
        height: auto;
    }

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

export const DivConta = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
    padding: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const BuscaEventos = styled.input`
    width: 280px;
    height: 40px;
    padding: 10px;
    border: solid 1px #757575;
    outline: none;
    border-radius: 8px;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 300px;
    }
`;

export const LinksHeader = styled.a`
    padding: 10px;
    text-decoration: none;
    color: #2962FF;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonCadastro = styled.button`
    width: 150px;
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 18px;
    background-color: #1976D2;
    color: white;
    border: solid 1px #757575;
    &:hover{
        background-color: #2196F3;
    }
`

export const ButtonSearch = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 20px;
`;

export const DivPerfil = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 8px;
    }
`;


export const PerfilFoto = styled.div`
    padding: 5px;
    border-radius: 12px 0 0 12px;
    border: solid 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 50px;
    background-color: white;
`

export const ImgPerfil = styled.img`
    border: solid 1px;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    object-fit: cover;


`

export const PerfilName = styled.div`
    align-items: center;
    font-size: 18px;
    border: solid 1px;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 120px;
    height: 50px;
    background-color: white;
`

export const PerfilOptions = styled.div`
    border-radius: 0 12px 12px 0;
    border: solid 1px;
    display: flex;
    justify-content: center;
    padding: 8px;
    width: 40px;
    height: 50px;
    background-color: white;
    cursor: pointer;
`

export const MenuContainer = styled.div`
    position: relative;
`

export const MenuFlutuante = styled.div`
    position: absolute;
    right: 0;
    margin-top: 2px;
    width: 180px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 10;
`

export const MenuLink = styled.a`
    display: block;
    padding: 10px 16px;
    font-size: 14px;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #eee;
    &:hover {
        background-color: #f5f5f5;
    }
`

export const MenuButton = styled.button`
    font-weight: bold;
    display: block;
    width: 100%;
    text-align: center;
    padding: 10px 16px;
    font-size: 14px;
    color: #333;
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #f5f5f5;
    }
`





