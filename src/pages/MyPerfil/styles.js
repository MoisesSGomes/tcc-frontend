import styled from "styled-components";

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px; /* padding lateral reduzido para telas menores */
`;

export const Card = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 30px;
    display: flex;
    align-items: center;
    max-width: 800px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

export const ProfileImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 24px;

    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 16px;
    }
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 768px) {
        align-items: center;
    }
`;

export const ProfileName = styled.h2`
    margin: 0;
    font-size: 24px;

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

export const ProfileEmail = styled.p`
    margin: 8px 0;
    font-size: 16px;
    color: #555;

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

export const EditButton = styled.button`
    margin-top: 12px;
    padding: 10px 16px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 16px;
    text-align: center;
    padding: 20px;
`;

export const GoogleLoginInfo = styled.p`
    margin-top: 12px;
    padding: 10px 16px;
    background-color: #e0f0ff;
    color: #007bff;
    font-size: 14px;
    font-style: italic;
    border-radius: 6px;
    text-align: center;

    @media (max-width: 480px) {
        width: 100%;
    }
`;
