import { Container, ImgItem, Title, DivTitle, LinkEvento } from './styles'
import { useState, useEffect } from 'react'
import api from "../../services/api"

function AddRecent() {
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        async function loadEvents() {
            try {
                const { data: { events } } = await api.get('/listar-eventos-recentes')
                setAllEvents(events)
            } catch (error) {
                console.error("Erro ao buscar eventos:", error)
            }
        }
        loadEvents()
    }, [])

    return (
        <Container>
            {allEvents.map((item) => (
                <div key={item.id}>
                    <LinkEvento href={`/evento?id=${item.id}`}>
                        <div>
                            <div>
                                <ImgItem
                                    src={`https://letsgoparty-api.onrender.com${item.image.path}`}
                                    alt='Imagem'
                                />
                            </div>
                            <DivTitle>
                                <Title>{item.title}</Title>
                            </DivTitle>
                        </div>
                    </LinkEvento>
                </div>
            ))}
        </Container>
    )
}

export default AddRecent
