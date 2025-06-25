import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import ImagePerfil from "../../assets/images/perfil.jpg"
import {
    Container,
    Card,
    ProfileImage,
    ProfileInfo,
    ProfileName,
    ProfileEmail,
    EditButton,
    ErrorMessage,
    GoogleLoginInfo
} from "./styles";

function MyPerfil() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUserData() {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Usuário não autenticado");

                const response = await api.get("/meu-perfil", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data);
            } catch (err) {
                console.error("Erro ao carregar dados do usuário:", err);
                setError("Não foi possível carregar seus dados. Por favor, tente novamente.");
            }
        }

        loadUserData();
    }, []);

    if (error) {
        return (
            <Container>
                <ErrorMessage>{error}</ErrorMessage>
            </Container>
        );
    }

    if (!userData) {
        return (
            <Container>
                <p>Carregando...</p>
            </Container>
        );
    }

    const handleEdit = () => {
        navigate("/editar-meu-perfil");
    };

    return (
        <Container>
            <Card>
                <ProfileImage
                    src={
                        userData.image
                            ? (userData.image.path.startsWith('http')
                                ? userData.image.path
                                : `http://localhost:3000${userData.image.path}`)
                            : ImagePerfil
                    }
                    alt="Foto de perfil"
                />

                <ProfileInfo>
                    <ProfileName>{userData.name} {userData.lastName}</ProfileName>
                    <ProfileEmail>{userData.email}</ProfileEmail>

                    {userData.googleId ? (
                        <GoogleLoginInfo>Logado com Google</GoogleLoginInfo>
                    ) : (
                        <EditButton onClick={handleEdit}>Editar Perfil</EditButton>
                    )}
                </ProfileInfo>

            </Card>
        </Container>
    );
}


export default MyPerfil;
