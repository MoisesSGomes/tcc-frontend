import { useState, useRef, useEffect } from "react";
import {
    BodyHeader, DivLogo, DivConta, BuscaEventos, LinksHeader, ButtonCadastro, ButtonSearch, DivPerfil, PerfilFoto, PerfilName, PerfilOptions,
    MenuContainer, MenuFlutuante, MenuLink, MenuButton, ImgPerfil
} from "./styles";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/logoA.png";
import perfilImage from "../../assets/images/perfil.jpg";

function Header() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [userData, setUserData] = useState({ name: "Nome", image: null });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const url = token ? "/criar-evento" : "/login";
    const menuRef = useRef(null);

    useEffect(() => {
        
        const fetchUserData = async () => {
            if (token) {
                try {
                    const response = await fetch('http://localhost:3000/carregar-imagem-perfil', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        setUserData({
                            name: data.name,
                            image: data.image
                        });
                    } else {
                        console.error('Erro ao buscar dados do usuário');
                    }
                } catch (error) {
                    console.error('Erro na requisição:', error);
                }
            }
        };
        
        fetchUserData();
    }, [token]);

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/eventos?search=${encodeURIComponent(search)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    
    const getProfileImageSrc = () => {
        
        if (!userData.image) return perfilImage;
        
        
        if (userData.image.path) {
            
            if (userData.image.path.startsWith('http')) return userData.image.path;
            
            return `http://localhost:3000${userData.image.path}`;
        }
        
        
        return perfilImage;
    };

    return (
        <BodyHeader>
            <DivLogo>
                <a href="/"><img src={logoImage} alt="Logo do site" /></a>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BuscaEventos
                        placeholder="Buscar Eventos"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <ButtonSearch onClick={handleSearch}>🔍</ButtonSearch>
                </div>
            </DivLogo>
            {!token ?
                <DivConta>
                    <LinksHeader href={url}>CRIE SEU EVENTO</LinksHeader>
                    <LinksHeader href="/login">ACESSE SUA CONTA</LinksHeader>
                    <LinksHeader href="/cadastro"><ButtonCadastro>CADASTRE-SE</ButtonCadastro></LinksHeader>
                </DivConta>
                :
                <DivConta>
                    <LinksHeader href={url}>CRIE SEU EVENTO</LinksHeader>
                    <LinksHeader href="/meus-eventos">MEUS EVENTOS</LinksHeader>
                    <DivPerfil>
                        <PerfilFoto>
                            <ImgPerfil src={getProfileImageSrc()} alt="imagem perfil" />
                        </PerfilFoto>
                        <PerfilName>{userData.name}</PerfilName>
                        <MenuContainer ref={menuRef}>
                            <PerfilOptions onClick={() => setMenuOpen(!menuOpen)}>
                                <img src="https://img.icons8.com/?size=50&id=5Gg1LiFT5Z7q&format=png&color=000000" alt="imagem opções" />
                            </PerfilOptions>

                            {menuOpen && (
                                <MenuFlutuante>
                                    <MenuLink href="/meus-eventos">
                                        Meus Eventos
                                    </MenuLink>
                                    <MenuLink href="/meu-perfil">
                                        Meu Perfil
                                    </MenuLink>
                                    <MenuLink href="/meus-favoritos">
                                        Meus Favoritos
                                    </MenuLink>
                                    <MenuButton onClick={handleLogout}>
                                        SAIR
                                    </MenuButton>
                                </MenuFlutuante>
                            )}
                        </MenuContainer>
                    </DivPerfil>
                </DivConta>
            }
        </BodyHeader>
    );
}

export default Header;





