import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import {
    Container, ContainerForms, DivForm, Form, Input, Description, Button,
    DivButton, DivImg, InputUpload, FormGroup, FormLabel, ErrorMessage, PageTitle
} from "./styles";

function EventEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        hour: "",
        address: "",
        number: "",
        district: "",
        city: "",
        state: "",
        local: "",
        category: ""
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [availableCities, setAvailableCities] = useState([]);
    const formRef = useRef(null);

    const categoryOptions = [
        "shows_festas",
        "cinemas",
        "teatros",
        "bares",
        "restaurantes",
        "passeios",
        "palestras"
    ];

    // Lista de estados brasileiros
    const ESTADOS_BRASILEIROS = ["RS"];

    // Dicionário de cidades por estado
    const CIDADES_POR_ESTADO = {
        "RS": ["Arroio do Sal", "Balneário Pinhal", "Capão da Canoa", "Capivari do Sul", "Caraá", "Cidreira", "Dom Pedro de Alcântara",
            "Imbé", "Itati", "Mampituba", "Maquiné", "Morrinhos do Sul", "Mostardas", "Osório", "Palmares do Sul", "Santo Antônio da Patrulha", "Tavares",
            "Terra de Areia", "Torres", "Tramandaí", "Três Cachoeiras", "Três Forquilhas", "Xangri-lá"]
    };

    // Data mínima para o input de data (data atual)
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Hora mínima se a data selecionada for hoje
    const getMinTime = () => {
        if (formData.date === getCurrentDate()) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        }
        return null;
    };

    // Atualizar cidades disponíveis quando o estado mudar
    useEffect(() => {
        if (formData.state) {
            setAvailableCities(CIDADES_POR_ESTADO[formData.state] || []);
        } else {
            setAvailableCities([]);
        }
    }, [formData.state]);

    // Fetch event data
    useEffect(() => {
        async function fetchEventData() {
            try {
                setFetchLoading(true);
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Usuário não autenticado");
                }

                const response = await api.get(`/eventos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const eventData = response.data;

                // Format date for input field (YYYY-MM-DD)
                const formattedDate = new Date(eventData.date)
                    .toISOString()
                    .split('T')[0];

                // Se a data do evento for anterior à data atual, ajustar para a data atual
                const currentDate = getCurrentDate();
                const adjustedDate = formattedDate < currentDate ? currentDate : formattedDate;

                const eventState = eventData.state.toUpperCase();

                setFormData({
                    title: eventData.title,
                    description: eventData.description,
                    date: adjustedDate,
                    hour: eventData.hour,
                    address: eventData.address,
                    number: eventData.number,
                    district: eventData.district,
                    city: eventData.city,
                    state: eventState,
                    local: eventData.local,
                    category: eventData.category
                });

                // Atualizar cidades disponíveis com base no estado
                if (eventState) {
                    setAvailableCities(CIDADES_POR_ESTADO[eventState] || []);
                }

                // Set image preview
                if (eventData.image && eventData.image.path) {
                    const backendBaseURL = "http://localhost:3000"; // coloque o endereço real do seu backend
                    setImagePreview(`${backendBaseURL}${eventData.image.path}`);
                }

            } catch (error) {
                console.error("Erro ao carregar dados do evento:", error);
                alert("Erro ao carregar dados do evento. Verifique se você tem permissão para editar este evento.");
                navigate("/meus-eventos"); // Redirect back to events list
            } finally {
                setFetchLoading(false);
            }
        }

        if (id) {
            fetchEventData();
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validações especiais para campos específicos
        if (name === "number") {
            // Permitir apenas números no campo "número"
            if (!/^\d*$/.test(value)) {
                return;
            }
        }

        // Para o campo hora, validar se é posterior à hora atual quando a data é hoje
        if (name === "hour" && formData.date === getCurrentDate()) {
            const minTime = getMinTime();
            if (minTime && value < minTime) {
                setErrors(prev => ({
                    ...prev,
                    hour: "A hora deve ser posterior à hora atual"
                }));
                return;
            }
        }

        // Para o estado, converter para maiúsculas
        if (name === "state") {
            const upperValue = value.toUpperCase();
            setFormData(prev => ({
                ...prev,
                [name]: upperValue,
                // Resetar cidade quando o estado mudar
                ...(name === "state" ? { city: "" } : {})
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear specific error when field is changed
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create URL for image preview
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);

            // Clear image error if exists
            if (errors.image) {
                setErrors(prev => ({
                    ...prev,
                    image: ""
                }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate all form fields
        Object.entries(formData).forEach(([key, value]) => {
            if (!value.trim()) {
                newErrors[key] = `O campo ${key} é obrigatório`;
            }
        });

        // Validate category
        if (formData.category && !categoryOptions.includes(formData.category)) {
            newErrors.category = "Selecione uma categoria válida da lista";
        }

        // Validar se o estado é válido
        if (formData.state && !ESTADOS_BRASILEIROS.includes(formData.state)) {
            newErrors.state = "Selecione um estado válido da lista";
        }

        // Validar se a cidade pertence ao estado selecionado
        if (formData.city && formData.state && !CIDADES_POR_ESTADO[formData.state]?.includes(formData.city)) {
            newErrors.city = "Selecione uma cidade válida para o estado selecionado";
        }

        // For edit, don't require image if there's already one
        if (!image && !imagePreview) {
            newErrors.image = "É necessário selecionar uma imagem para o evento";
        }

        // Validar se a data é futura ou atual
        const currentDate = getCurrentDate();
        
        // Comparar como strings no formato YYYY-MM-DD
        if (formData.date < currentDate) {
            newErrors.date = "A data deve ser atual ou futura";
        }

        // Validar se a hora é futura para o dia atual
        if (formData.date === currentDate) {
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            
            const [hours, minutes] = formData.hour.split(':').map(Number);
            
            // Comparação simplificada de horas e minutos
            if (hours < currentHours || (hours === currentHours && minutes <= currentMinutes)) {
                newErrors.hour = "A hora deve ser posterior à hora atual";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Usuário não autenticado");
            }

            const submitFormData = new FormData();

            // Add form data - CORRIGIDO: tratamento adequado da data para evitar problemas de timezone
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "date" && value) {
                    // Cria a data preservando o dia selecionado
                    const dateParts = value.split("-");
                    const year = parseInt(dateParts[0]);
                    const month = parseInt(dateParts[1]) - 1; // JavaScript months are 0-indexed
                    const day = parseInt(dateParts[2]);
                    
                    // Cria a data com horário meio-dia para evitar problemas de timezone
                    const date = new Date(year, month, day, 12, 0, 0);
                    submitFormData.append(key, date.toISOString());
                } else {
                    submitFormData.append(key, value);
                }
            });

            // Add image if a new one was selected
            if (image) {
                submitFormData.append("image", image);
            }

            await api.put(`/eventos/${id}`, submitFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Evento atualizado com sucesso");
            navigate("/meus-eventos");
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                form: err.response?.data?.message || err.message || "Erro ao atualizar evento"
            }));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // Clean up URL object when component is unmounted
    useEffect(() => {
        return () => {
            if (imagePreview && image) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview, image]);

    if (fetchLoading) {
        return (
            <Container>
                <ContainerForms>
                    <PageTitle>Carregando dados do evento...</PageTitle>
                </ContainerForms>
            </Container>
        );
    }

    return (
        <Container>
            <ContainerForms>
                <PageTitle>Alterar Evento</PageTitle>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <DivImg>
                        <FormLabel htmlFor="image-upload">Imagem do Evento: {!imagePreview && "*"}</FormLabel>
                        <InputUpload
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleImageChange}
                        />

                        {imagePreview && (
                            <div className="image-preview-container">
                                <img
                                    src={imagePreview}
                                    alt="Pré-visualização"
                                    style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
                                />
                            </div>
                        )}

                        {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
                    </DivImg>

                    <DivForm>
                        <div>
                            <FormLabel htmlFor="title">Título do Evento *</FormLabel>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Título do Evento"
                                type="text"
                                error={errors.title}
                            />
                            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
                        </div>

                        <div>
                            <FormLabel htmlFor="category">Categoria *</FormLabel>
                            <Input
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Categoria"
                                list="f_list"
                                error={errors.category}
                            />
                            <datalist id="f_list">
                                <option value="shows_festas">Shows e Festas</option>
                                <option value="cinemas">Cinemas</option>
                                <option value="teatros">Teatros</option>
                                <option value="bares">Bares</option>
                                <option value="restaurantes">Restaurantes</option>
                                <option value="passeios">Passeios</option>
                                <option value="palestras">Palestras</option>
                            </datalist>
                            {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
                        </div>

                        <FormGroup>
                            <div>
                                <FormLabel htmlFor="address">Rua *</FormLabel>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Rua"
                                    type="text"
                                    error={errors.address}
                                />
                                {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
                            </div>

                            <div>
                                <FormLabel htmlFor="number">Número *</FormLabel>
                                <Input
                                    id="number"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    placeholder="Número"
                                    type="text"
                                    error={errors.number}
                                />
                                {errors.number && <ErrorMessage>{errors.number}</ErrorMessage>}
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <div>
                                <FormLabel htmlFor="district">Bairro *</FormLabel>
                                <Input
                                    id="district"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    placeholder="Bairro"
                                    type="text"
                                    error={errors.district}
                                />
                                {errors.district && <ErrorMessage>{errors.district}</ErrorMessage>}
                            </div>

                            {/* Estado e Cidade com posições invertidas */}
                            <div>
                                <FormLabel htmlFor="state">Estado *</FormLabel>
                                <Input
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Estado"
                                    list="state_list"
                                    error={errors.state}
                                />
                                <datalist id="state_list">
                                    {ESTADOS_BRASILEIROS.map(estado => (
                                        <option key={estado} value={estado}>{estado}</option>
                                    ))}
                                </datalist>
                                {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
                            </div>

                            <div>
                                <FormLabel htmlFor="city">Cidade *</FormLabel>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Cidade"
                                    list="city_list"
                                    error={errors.city}
                                    disabled={!formData.state}
                                />
                                <datalist id="city_list">
                                    {availableCities.map(cidade => (
                                        <option key={cidade} value={cidade}>{cidade}</option>
                                    ))}
                                </datalist>
                                {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                            </div>
                        </FormGroup>

                        <div>
                            <FormLabel htmlFor="local">Local *</FormLabel>
                            <Input
                                id="local"
                                name="local"
                                value={formData.local}
                                onChange={handleChange}
                                placeholder="Local"
                                type="text"
                                error={errors.local}
                            />
                            {errors.local && <ErrorMessage>{errors.local}</ErrorMessage>}
                        </div>

                        <FormGroup>
                            <div>
                                <FormLabel htmlFor="date">Data *</FormLabel>
                                <Input
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    type="date"
                                    min={getCurrentDate()}
                                    error={errors.date}
                                />
                                {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
                            </div>

                            <div>
                                <FormLabel htmlFor="hour">Hora *</FormLabel>
                                <Input
                                    id="hour"
                                    name="hour"
                                    value={formData.hour}
                                    onChange={handleChange}
                                    type="time"
                                    min={formData.date === getCurrentDate() ? getMinTime() : null}
                                    error={errors.hour}
                                />
                                {errors.hour && <ErrorMessage>{errors.hour}</ErrorMessage>}
                            </div>
                        </FormGroup>

                        <div>
                            <FormLabel htmlFor="description">Descrição *</FormLabel>
                            <Description
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Descrição do evento"
                                error={errors.description}
                            />
                            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
                        </div>

                        {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}

                        <DivButton>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Salvando..." : "Salvar Alterações"}
                            </Button>
                        </DivButton>
                    </DivForm>
                </Form>
            </ContainerForms>
        </Container>
    );
}

export default EventEdit;