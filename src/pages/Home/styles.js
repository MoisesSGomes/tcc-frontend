import styled from "styled-components";

export const DivUnit2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 40px;
  padding: 20px;
  background-color: white;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const DivUnit3 = styled(DivUnit2)``;

export const DivUnitSlider = styled.div`
  height: 400px;
  margin-top: 40px;
  padding: 20px;
  background-color: white;

  @media (max-width: 768px) {
    height: auto;
    padding: 10px;
  }
`;

export const TitleSection = styled.h2`
  text-align: center;
  padding: 5px;
  margin-bottom: 5px;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const DivColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DivUnit1 = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-around;
  height: 130px;
  margin-top: 40px;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    align-items: center;
    gap: 20px;
  }
`;

export const TitleIcon = styled.h3`
  text-align: center;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const DivIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.5s ease;

  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 80px;
  }
`;

export const LinkFiltro = styled.a`
  text-decoration: none;
  color: black;
`;
