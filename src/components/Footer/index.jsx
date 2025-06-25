import {
    FooterContainer, FooterTitle, FooterItems, FooterPolicy, Item, ItemTitle, ItemList, ItemLine, FooterCopyright, PolicyLine,
    PolicyList, CategoryLink, ContentContainer
} from "./styles"
import { useNavigate } from "react-router-dom"

function Footer() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleCityClick = (cityName, e) => {
        e.preventDefault();
        navigate(`/eventos?search=${encodeURIComponent(cityName)}`);
    };

    const handleDateFilterClick = (filterType, e) => {
        e.preventDefault();
        navigate(`/eventos-por-data?dateFilter=${encodeURIComponent(filterType)}`);
    };

    return (
        <FooterContainer>
            <ContentContainer>
                <FooterTitle>Let's Go Party</FooterTitle>
                <FooterItems>
                    <Item>
                        <ItemTitle>ENCONTRE EVENTOS</ItemTitle>
                        <ItemList>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleDateFilterClick("hoje", e)}>Hoje</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleDateFilterClick("amanha", e)}>Amanhã</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleDateFilterClick("esta-semana", e)}>Esta Semana</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleDateFilterClick("este-fim-de-semana", e)}>Este fim de semana</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleDateFilterClick("este-mes", e)}>Este mês</CategoryLink></ItemLine>
                        </ItemList>
                    </Item>
                    <Item>
                        <ItemTitle>CIDADES</ItemTitle>
                        <ItemList>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleCityClick("Osório", e)}>Osório</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleCityClick("Tramandaí", e)}>Tramandaí</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleCityClick("Imbé", e)}>Imbé</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleCityClick("Xangri-lá", e)}>Xangri-lá</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleCityClick("Capão da Canoa", e)}>Capão da Canoa</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="" onClick={(e) => handleCityClick("Torres", e)}>Torres</CategoryLink></ItemLine>
                        </ItemList>
                    </Item>
                    <Item>
                        <ItemTitle>CATEGORIAS</ItemTitle>
                        <ItemList>
                            <ItemLine><CategoryLink href="/filtrar-eventos/shows_festas">Shows e Festas</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="/filtrar-eventos/cinemas">Cinemas</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="/filtrar-eventos/teatros">Teatros</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="/filtrar-eventos/bares">Bares</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="/filtrar-eventos/restaurantes">Restaurantes</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="/filtrar-eventos/passeios">Passeios</CategoryLink></ItemLine>
                            <ItemLine><CategoryLink href="/filtrar-eventos/palestras">Palestras</CategoryLink></ItemLine>
                        </ItemList>
                    </Item>
                    <Item>
                        <ItemTitle>PARA PRODUTORES</ItemTitle>
                        {token ?
                            <ItemList>
                                <ItemLine><CategoryLink href="/criar-evento">Crie Seu Evento</CategoryLink></ItemLine>
                                <ItemLine><CategoryLink href="/meus-eventos">Meus Eventos</CategoryLink></ItemLine>
                            </ItemList>
                            :
                            <ItemList>
                                <ItemLine><CategoryLink href="/cadastro">Crie Seu Evento</CategoryLink></ItemLine>
                                <ItemLine><CategoryLink href="/cadastro">Meus Eventos</CategoryLink></ItemLine>
                            </ItemList>
                        }
                    </Item>
                    <Item>
                        <ItemTitle>AJUDA</ItemTitle>
                        <ItemList>
                            <ItemLine><CategoryLink href="/contato">Contato</CategoryLink></ItemLine>
                        </ItemList>
                    </Item>
                </FooterItems>
                <FooterPolicy>
                    <PolicyList>
                        <PolicyLine><CategoryLink href="/">Home</CategoryLink></PolicyLine>
                        <PolicyLine><CategoryLink href="/sobre">Sobre</CategoryLink></PolicyLine>
                        <PolicyLine><CategoryLink href="/termos-de-uso">Termos e Políticas</CategoryLink></PolicyLine>
                    </PolicyList>
                </FooterPolicy>
                <FooterCopyright>Let's Go Party S.A. © Copyright 2025</FooterCopyright>
            </ContentContainer>
        </FooterContainer>
    )
}

export default Footer