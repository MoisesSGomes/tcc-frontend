import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

export const SliderContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 300px; /* Garante que não passe disso */
  
  @media (max-width: 768px) {
    flex-direction: column;
    max-height: none;
  }
`;

export const SwiperDiv1 = styled.div`
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ImgItem = styled.img`
  width: 100%;
  max-height: 300px; /* Mantém a imagem dentro do limite */
  object-fit: cover;
  display: block;
  border-radius: 15px 0 0 15px;

  @media (max-width: 768px) {
    border-radius: 15px 15px 0 0;
  }
`;

export const SwiperDiv2 = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 40%;
  background-color: white;
  border-radius: 0 15px 15px 0;
  overflow: hidden;
  flex: 1; /* Permite crescer conforme conteúdo, até o limite */

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0 0 15px 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 12; /* Até 12 linhas */
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    -webkit-line-clamp: 8;
  }

  @media (max-width: 480px) {
    -webkit-line-clamp: 6;
  }
`;

export const LinkEvento = styled.a`
  text-decoration: none;
  color: black;
`;