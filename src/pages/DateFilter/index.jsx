import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import api from "../../services/api"
import { Container, ImgItem, Title, DivTitle, DivGrid, Div1, LinkEvento, Pagination, PageButton } from "./styles"

function DateFilter() {
    const [allEvents, setAllEvents] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const currentPage = parseInt(queryParams.get("page")) || 1
        const searchQuery = queryParams.get("search") || ""
        const dateFilter = queryParams.get("dateFilter") || ""
        setPage(currentPage)
        loadEvents(currentPage, searchQuery, dateFilter)
    }, [location.search])

    async function loadEvents(currentPage, searchQuery, dateFilter) {
        try {
            const { data: { events, totalPages } } = await api.get(`/buscar-eventos-data?page=${currentPage}&search=${encodeURIComponent(searchQuery)}&dateFilter=${encodeURIComponent(dateFilter)}`)
            setAllEvents(events)
            setTotalPages(totalPages)
        } catch (error) {
            console.error("Erro ao carregar eventos", error)
        }
    }

    const handlePageChange = (newPage) => {
        const queryParams = new URLSearchParams(location.search)
        queryParams.set("page", newPage)
        navigate(`/eventos?${queryParams.toString()}`)
    }

    return (
        <Container>
            <Div1>
                {allEvents.length > 0 ? (
                    allEvents.map((item) => (
                        <DivGrid key={item.id}>
                            <LinkEvento href={`/evento?id=${item.id}`}>
                                <ImgItem src={`http://localhost:3000${item.image.path}`} alt='Imagem Evento' />
                                <DivTitle><Title>{item.title}</Title></DivTitle>
                            </LinkEvento>
                        </DivGrid>
                    ))
                ) : (
                    <DivTitle><Title>Nenhum evento encontrado para este filtro.</Title></DivTitle>
                )}
            </Div1>

            {totalPages > 1 && (
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
            )}
        </Container>
    );
}

export default DateFilter