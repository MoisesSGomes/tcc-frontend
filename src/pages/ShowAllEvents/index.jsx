import {
    Container, ImgItem, Title, DivTitle, DivGrid, Div1, LinkEvento, Pagination, PageButton, DivData, FilterInput, FilterLabel, FilterContainer,
    FilterPgination, DivFilters, ItemsPerPageSelect
} from './styles';
import { useState, useEffect } from 'react';
import api from "../../services/api";
import CategoryMenu from "../../components/CategoryMenu";

function ShowAllEvents() {
    const [allEvents, setAllEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [appliedStartDate, setAppliedStartDate] = useState('');
    const [appliedEndDate, setAppliedEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [filterActive, setFilterActive] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [appliedItemsPerPage, setAppliedItemsPerPage] = useState(20);

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        async function loadEvents() {
            setIsLoading(true);
            try {
                const { data: { events, totalPages } } = await api.get(`/listar-eventos-paginados`, {
                    params: {
                        page,
                        startDate: appliedStartDate || undefined,
                        endDate: appliedEndDate || undefined,
                        limit: appliedItemsPerPage
                    }
                });
                setAllEvents(events);
                setTotalPages(totalPages);
            } catch (error) {
                console.error("Erro ao carregar eventos", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadEvents();
    }, [page, appliedStartDate, appliedEndDate, appliedItemsPerPage]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleFilter = (e) => {
        e.preventDefault();
        // Only apply filter values when button is clicked
        setAppliedStartDate(startDate);
        setAppliedEndDate(endDate);
        setAppliedItemsPerPage(itemsPerPage);
        setFilterActive(!!startDate); // Somente datas afetam o status do filtro ativo
        // Reset to first page when filtering
        setPage(1);
    };

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);

        // If end date is before new start date, update end date
        if (endDate && endDate < newStartDate) {
            setEndDate(newStartDate);
        }
    };

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
        setAppliedStartDate('');
        setAppliedEndDate('');
        setFilterActive(false);
        setPage(1);
    };

    const formatEventDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const formatEventHour = (hourString) => {
        return hourString || 'Horário não definido';
    };

    return (
        <div>
            <CategoryMenu />
        <Container>  
                      
            <div>
            
                <DivFilters>
                    <DivData>
                        <FilterContainer onSubmit={handleFilter}>
                            <FilterLabel>
                                De:
                                <FilterInput
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    min={today}
                                />
                            </FilterLabel>
                            <FilterLabel>
                                Até:
                                <FilterInput
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || today}
                                />
                            </FilterLabel>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '15px' }}>
                                <FilterInput type="submit" value="Filtrar" />
                                {filterActive && (
                                    <button
                                        onClick={clearFilters}
                                        style={{
                                            padding: '8px 20px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                        type="button"
                                    >
                                        Limpar Filtros
                                    </button>
                                )}
                            </div>
                        </FilterContainer>
                    </DivData>
                    <FilterPgination>
                        <FilterContainer onSubmit={handleFilter}>
                            <FilterLabel>
                                Eventos por página:
                                <ItemsPerPageSelect
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </ItemsPerPageSelect>
                            </FilterLabel>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '15px' }}>
                                <FilterInput type="submit" value="Aplicar" />
                            </div>
                        </FilterContainer>
                    </FilterPgination>
                </DivFilters>
                <Div1>
                    {isLoading ? (
                        <p style={{ padding: '20px', textAlign: 'center', width: '100%' }}>Carregando eventos...</p>
                    ) : allEvents.length > 0 ? (
                        allEvents.map((item) => (
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
                                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: 0 }}>
                                                {formatEventDate(item.date)}
                                            </p>
                                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', margin: '2px 0' }}>
                                                {formatEventHour(item.hour)}
                                            </p>
                                        </DivTitle>
                                    </div>
                                </LinkEvento>
                            </DivGrid>
                        ))
                    ) : (
                        <p style={{ padding: '20px', textAlign: 'center', width: '100%' }}>Nenhum evento futuro encontrado para o período selecionado.</p>
                    )}
                </Div1>
            </div>

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
        </div>
    );
}

export default ShowAllEvents;