import styled from "styled-components";

export const FooterContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 60px;
    width: 100%;
    background-color: #1976D2;
`

export const ContentContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 1215px;
`

export const FooterTitle = styled.h1`
    padding: 40px 50px 25px 0;
    color: white;

    @media (max-width: 768px) {
        font-size: 24px;
        text-align: center;
    }
`

export const FooterItems = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
`

export const FooterPolicy = styled.div`
    display: flex;
    justify-content: center;
`

export const Item = styled.div`
    width: 210px;

    @media (max-width: 768px) {
        width: 90%;
        text-align: center;
    }
`

export const ItemTitle = styled.h2`
    padding: 8px 0 8px 0;
    color: white;
    font-size: 14px;
    font-weight: bold;
`

export const ItemList = styled.ul`
    list-style-type: none;
    padding: 0;
`

export const ItemLine = styled.li`
    color: white;
    margin: 10px 0;
    text-align: left;

    @media (max-width: 768px) {
        text-align: center;
    }
`

export const FooterCopyright = styled.div`
     padding: 10px 50px 30px 0;
     color: white;
     font-weight: bold;

     @media (max-width: 768px) {
        padding: 20px;
        text-align: center;
     }
`

export const PolicyList = styled.ul`
    margin-top: 20px;
    padding: 10px 50px 25px 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style-type: none;
    justify-content: space-around;
    gap: 15px;
`

export const PolicyLine = styled.li`
    color: white;
    text-align: center;
`

export const CategoryLink = styled.a`
    text-decoration: none;
    color: white;

    &:hover {
        text-decoration: underline;
    }
`
