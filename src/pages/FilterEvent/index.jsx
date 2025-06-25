import { Container, ImgItem, Title, DivTitle, DivGrid, Div1, LinkEvento, Pagination, PageButton } from './styles';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from "../../services/api";

function FilterEvent() {
    const [allEvents, setAllEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = parseInt(queryParams.get('page')) || 1;
        setPage(currentPage);
    }, [location.search]);

    useEffect(() => {
        async function loadEvents() {
            try {
                const { data: { events, totalPages } } = await api.get(`/filtrar-eventos?page=${page}&category=${category || ''}`);
                setAllEvents(events);
                setTotalPages(totalPages);
            } catch (error) {
                console.error("Erro ao carregar eventos", error);
            }
        }
        loadEvents();
    }, [page, category]);

    const handlePageChange = (newPage) => {
        navigate(`/eventos/${category || 'todas'}?page=${newPage}`);
    };

    return (
        <Container>
            <Div1>
                {allEvents.map((item) => (
                    <DivGrid key={item.id}>
                        <LinkEvento href={`/evento?id=${item.id}`}>
                            <div>
                                <div>
                                    <ImgItem
                                        src={`https://letsgoparty-api.onrender.com${item.image.path}`}
                                        alt='Imagem Evento'
                                    />
                                </div>
                                <DivTitle>
                                    <Title>{item.title}</Title>
                                </DivTitle>
                            </div>
                        </LinkEvento>
                    </DivGrid>
                ))}
            </Div1>

            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <PageButton
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        $isActive={page === index + 1}
                    >
                        {index + 1}
                    </PageButton>
                ))}
            </Pagination>
        </Container>
    );
}

export default FilterEvent;
