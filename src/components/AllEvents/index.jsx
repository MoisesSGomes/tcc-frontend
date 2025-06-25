import { Container, ImgItem, Title, DivTitle, DivGrid, Div1, ButtonEventos, DivButton, LinkEvento } from './styles'
import { useState, useEffect } from 'react'
import api from "../../services/api"

function AllEvents() {

    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        async function loadEvents() {
            try {
                const { data: { events } } = await api.get('/listar-todos-eventos')
                setAllEvents(events)
            } catch (error) {
                console.error("Erro ao buscar eventos:", error)
            }
        }
        loadEvents()
    }, [])


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
                                        alt='Imagem'
                                    />
                                </div>
                                <DivTitle>
                                    <Title>{item.title}</Title>
                                </DivTitle>
                            </div>
                        </LinkEvento>
                    </DivGrid>
                ))}
                <DivButton>
                    <a href="/mostrar-todos-eventos"><ButtonEventos>Ver Todos</ButtonEventos></a>
                </DivButton>
            </Div1>
        </Container>
    )
}

export default AllEvents
