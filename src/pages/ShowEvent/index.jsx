import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import heartWhite from '../../assets/images/heart-white.svg';
import heartRed from '../../assets/images/heart-red.svg';
import {
    Container,
    DivImagem,
    Imagem,
    DivInfo,
    Title,
    Endereco,
    Description,
    DivDescription,
    DivLike, LikeButton
} from './styles';
import styled from 'styled-components';

function ShowEvent() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [event, setEvent] = useState({});
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        async function loadEvent() {
            if (!id) return;

            try {
                const response = await api.get(`/mostrar-evento/${id}`);
                setEvent(response.data.event);
            } catch (error) {
                console.error('Erro ao carregar evento:', error);
            }
        }

        async function checkLike() {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await api.get(`/verificar-curtida/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setLiked(response.data.liked);
            } catch (error) {
                console.error('Erro ao verificar curtida:', error);
            }
        }

        loadEvent();
        checkLike();
    }, [id]);

    const handleLikeClick = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert("É necessário estar logado para incluir no favoritos!");
            return window.location.href = '/login';
        }

        try {
            if (liked) {
                // Se já curtiu, então descurtir
                await api.delete(`/descurtir-evento/${event.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLiked(false);
            } else {
                // Se ainda não curtiu, então curtir
                await api.post(`/curtir-evento/${event.id}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLiked(true);
            }
        } catch (error) {
            console.error('Erro ao alternar curtida:', error);
        }
    };

    return (
        <Container>
            <DivImagem>
                {event.image && (
                    <Imagem src={`https://letsgoparty-api.onrender.com${event.image.path}`} alt={event.title} />
                )}
                <DivLike>
                    <LikeButton onClick={handleLikeClick} $liked={liked}>
                        <img src={liked ? heartRed : heartWhite} alt="Curtir" />
                    </LikeButton>
                </DivLike>
            </DivImagem>

            <DivInfo>
                <div>
                    <Title>{event.title}</Title>
                </div>
                <div>
                    <Endereco>{new Date(event.date).toLocaleDateString('pt-BR')} - {event.hour}</Endereco>
                    <Endereco>{event.local} - {event.address}, {event.number} - {event.district} - {event.city}/{event.state}</Endereco>

                </div>
                <DivDescription>
                    <Description>{event.description}</Description>
                </DivDescription>

            </DivInfo>
        </Container>
    );
}

export default ShowEvent;

