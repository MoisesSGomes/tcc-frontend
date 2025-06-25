import { Container, ImgItem, Title, DivTitle, DivGrid, Div1, LinkEvento, Pagination, PageButton, DivIcons, ButtonEdit, ButtonTrash, StatusTag } from './styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";

function MyEvents() {
    const [allEvents, setAllEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadEvents();
    }, [page]);

    async function loadEvents() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token não encontrado, usuário não autenticado.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.get(`/listar-meus-eventos?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Verificando a estrutura dos dados recebidos para debug
            console.log("Dados recebidos da API:", response.data);
            
            // Certificando-se de que os eventos contêm campos date e time
            const processedEvents = response.data.events.map(event => {
                // Garante que o evento tenha a propriedade time, caso contrário assume "00:00"
                if (!event.time && event.date) {
                    console.log(`Evento sem horário especificado: ${event.title}`);
                    event.time = "00:00";
                }
                return event;
            });

            setAllEvents(processedEvents);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Erro ao carregar eventos", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (eventId) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este evento?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            await api.delete(`/eventos/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Atualiza a lista de eventos após a exclusão
            loadEvents();
        } catch (error) {
            console.error("Erro ao excluir evento:", error);
        }
    };

    const handleEdit = (eventId) => {
        navigate(`/editar-evento/${eventId}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // Função para verificar o status do evento (em andamento, realizado ou futuro)
    const getEventStatus = (eventDate, eventTime) => {
        if (!eventDate) return { isPast: false, isOngoing: false };
        
        const now = new Date();
        const eventDateObj = new Date(eventDate);
        
        // Configurar o evento com a hora correta (formato esperado: "HH:MM")
        if (eventTime) {
            const [hours, minutes] = eventTime.split(':').map(Number);
            eventDateObj.setHours(hours, minutes, 0, 0);
        } else {
            // Se não houver hora específica, assume meia-noite
            eventDateObj.setHours(0, 0, 0, 0);
        }
        
        // Criar datas para comparação apenas dos dias (sem horário)
        const todayStartOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const tomorrowStartOfDay = new Date(todayStartOfDay);
        tomorrowStartOfDay.setDate(tomorrowStartOfDay.getDate() + 1);
        const eventStartOfDay = new Date(eventDateObj.getFullYear(), eventDateObj.getMonth(), eventDateObj.getDate(), 0, 0, 0);
        
        // Verificações:
        // 1. Evento já passou (é de um dia anterior)
        const isPast = eventStartOfDay < todayStartOfDay;
        
        // 2. Evento é hoje E a hora atual é maior ou igual à hora do evento
        const isSameDay = eventStartOfDay.getTime() === todayStartOfDay.getTime();
        const isAfterEventTime = now.getTime() >= eventDateObj.getTime();
        const isOngoing = isSameDay && isAfterEventTime;
        
        return { isPast, isOngoing };
    };

    return (
        <Container>
            {loading ? (
                <p>Carregando eventos...</p>
            ) : (
                <>
                    <Div1>
                        {allEvents.length > 0 ? (
                            allEvents.map((item) => {
                                const { isPast, isOngoing } = getEventStatus(item.date, item.time);
                                
                                return (
                                    <DivGrid key={item.id}>
                                        <LinkEvento href={`/evento?id=${item.id}`}>
                                            <div>
                                                <div style={{ position: 'relative' }}>
                                                    {item.image && (
                                                        <ImgItem
                                                            src={`https://letsgoparty-api.onrender.com${item.image.path}`}
                                                            alt='Imagem Evento'
                                                        />
                                                    )}
                                                    {isPast && (
                                                        <StatusTag $status="realizado">Realizado</StatusTag>
                                                    )}
                                                    {isOngoing && !isPast && (
                                                        <StatusTag $status="andamento">Em andamento</StatusTag>
                                                    )}
                                                </div>
                                                <DivTitle>
                                                    <Title>{item.title}</Title>
                                                </DivTitle>
                                            </div>
                                        </LinkEvento>
                                        <DivIcons>
                                            <ButtonEdit 
                                                onClick={() => !(isPast || isOngoing) && handleEdit(item.id)}
                                                disabled={isPast || isOngoing}
                                                $isPast={isPast || isOngoing}
                                            >
                                                <img src="https://img.icons8.com/?size=25&id=86372&format=png&color=000000" alt="imagem editar" />
                                            </ButtonEdit>
                                            <ButtonTrash 
                                                onClick={() => !(isPast || isOngoing) && handleDelete(item.id)}
                                                disabled={isPast || isOngoing}
                                                $isPast={isPast || isOngoing}
                                            >
                                                <img src="https://img.icons8.com/?size=25&id=1941&format=png&color=000000" alt="imagem excluir" />
                                            </ButtonTrash>
                                        </DivIcons>
                                    </DivGrid>
                                );
                            })
                        ) : (
                            <p>Nenhum evento encontrado.</p>
                        )}
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
                </>
            )}
        </Container>
    );
}

export default MyEvents;