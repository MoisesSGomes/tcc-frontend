import { DivUnit1, TitleIcon, DivIcon, LinkFiltro } from './styles'

const CATEGORY_ITEMS = [
    {
        id: "shows_festas",
        title: "Shows e Festas",
        icon: "https://img.icons8.com/external-ddara-flat-ddara/70/external-guitar-music-fest-ddara-flat-ddara.png",
        alt: "ícone shows e festas"
    },
    {
        id: "cinemas",
        title: "Cinemas",
        icon: "https://img.icons8.com/color/70/documentary.png",
        alt: "ícone cinema"
    },
    {
        id: "teatros",
        title: "Teatros",
        icon: "https://img.icons8.com/color/70/theatre-mask.png",
        alt: "ícone teatro"
    },
    {
        id: "bares",
        title: "Bares",
        icon: "https://img.icons8.com/external-wanicon-lineal-color-wanicon/70/external-pub-st-patrick-day-wanicon-lineal-color-wanicon.png",
        alt: "ícone bar"
    },
    {
        id: "restaurantes",
        title: "Restaurantes",
        icon: "https://img.icons8.com/plasticine/70/restaurant.png",
        alt: "ícone restaurante"
    },
    {
        id: "passeios",
        title: "Passeios",
        icon: "https://img.icons8.com/color/70/national-park.png",
        alt: "ícone passeio"
    },
    {
        id: "palestras",
        title: "Palestras",
        icon: "https://img.icons8.com/color/70/teacher.png",
        alt: "ícone palestra"
    }
];

function CategoryMenu() {

    return (
        <DivUnit1>
            {CATEGORY_ITEMS.map((item) => (
                <LinkFiltro key={item.id} href={`/filtrar-eventos/${item.id}`}>
                    <DivIcon>
                        <img src={item.icon} alt={item.alt} />
                        <TitleIcon>{item.title}</TitleIcon>
                    </DivIcon>
                </LinkFiltro>
            ))}
        </DivUnit1>
    )
}

export default CategoryMenu