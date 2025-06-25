import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

export const Div1 = styled.div` 
    width: 100%;
    max-width: 1315px;
    margin-top: 20px;
    padding: 5px;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    border-radius: 10px;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
                rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
                rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    min-height: 200px;
`

export const ImgItem = styled.img`
    width: 220px;
    height: 150px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;

    &:hover {
        opacity: 0.9;
    }
`

export const Title = styled.h3`
    margin: 10px 20px 5px;
    text-align: center;
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
    height: 120px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
                0 4px 6px -4px rgb(0 0 0 / 0.1);

    &:hover {
        opacity: 0.9;
    }
`

export const DivGrid = styled.div`
    margin: 20px;
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
    margin-top: 20px;
    gap: 8px;
    flex-wrap: wrap;
`

export const DivData = styled.div`
    width: 100%;
    max-width: 638px;
    margin-top: 60px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
                rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
                rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`

export const FilterPgination = styled(DivData)``;

export const DivFilters = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

export const FilterContainer = styled.form`
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
    }
`

export const FilterLabel = styled.label`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: bold;
    min-width: 120px;
    text-align: left;
`

export const FilterInput = styled.input`
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;

    &[type="submit"] {
        background-color: #007bff;
        color: white;
        cursor: pointer;
        padding: 8px 20px;
        margin-top: 20px;
        border: none;

        &:hover {
            background-color: #0056b3;
        }
    }
`

export const ItemsPerPageSelect = styled.select`
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;
    min-width: 80px;

    &:hover {
        border-color: #007bff;
    }

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
`
