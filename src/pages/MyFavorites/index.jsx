import { Container, ImgItem, Title, DivTitle, DivGrid, Div1, LinkEvento, Pagination, PageButton, DivIcons, ButtonTrash } from './styles';
import { useState, useEffect } from 'react';
import api from "../../services/api";

function MyFavorites() {
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, [page]);

    async function loadFavorites() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token não encontrado, usuário não autenticado.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.get(`/listar-meus-favoritos?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setFavoriteEvents(response.data.events);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Erro ao carregar favoritos", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRemoveFavorite = async (eventId) => {
        const confirmDelete = window.confirm("Tem certeza que deseja remover este evento dos favoritos?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            await api.delete(`/descurtir-evento/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Atualiza a lista de favoritos após a remoção
            loadFavorites();
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <Container>
            {loading ? (
                <p>Carregando favoritos...</p>
            ) : (
                <>
                    <Div1>
                        {favoriteEvents.length > 0 ? (
                            favoriteEvents.map((item) => (
                                <DivGrid key={item.id}>
                                    <LinkEvento href={`/evento?id=${item.id}`}>
                                        <div>
                                            <div>
                                                {item.image && (
                                                    <ImgItem
                                                        src={`https://letsgoparty-api.onrender.com${item.image.path}`}
                                                        alt='Imagem Evento'
                                                    />
                                                )}
                                            </div>
                                            <DivTitle>
                                                <Title>{item.title}</Title>
                                            </DivTitle>
                                        </div>
                                    </LinkEvento>
                                    <DivIcons>
                                        <ButtonTrash onClick={() => handleRemoveFavorite(item.id)}>
                                            <img src="https://img.icons8.com/?size=25&id=1941&format=png&color=000000" alt="imagem remover favorito" />
                                        </ButtonTrash>
                                    </DivIcons>
                                </DivGrid>
                            ))
                        ) : (
                            <p>Nenhum favorito encontrado.</p>
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

export default MyFavorites;