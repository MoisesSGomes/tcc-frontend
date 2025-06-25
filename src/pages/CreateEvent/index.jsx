import { useRef, useState, useEffect } from "react";
import api from "../../services/api.js";
import {
    Container, ContainerForms, DivForm, Form, Input, Description, Button,
    DivButton, DivImg, InputUpload, FormGroup, FormLabel, ErrorMessage, PageTitle
} from "./styles";

// Lista de estados brasileiros
const ESTADOS_BRASILEIROS = ["RS"];

// Dicionário de cidades por estado
const CIDADES_POR_ESTADO = {
    "RS": ["Arroio do Sal", "Balneário Pinhal", "Capão da Canoa", "Capivari do Sul", "Caraá", "Cidreira", "Dom Pedro de Alcântara",
        "Imbé", "Itati", "Mampituba", "Maquiné", "Morrinhos do Sul", "Mostardas", "Osório", "Palmares do Sul", "Santo Antônio da Patrulha", "Tavares",
        "Terra de Areia", "Torres", "Tramandaí", "Três Cachoeiras", "Três Forquilhas", "Xangri-lá"]
};

function CreateEvent() {
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
    const [errors, setErrors] = useState({});
    const formRef = useRef(null);
    const [minDate, setMinDate] = useState("");
    const [minTime, setMinTime] = useState("");
    const [isToday, setIsToday] = useState(false);
    const [cidadesDisponiveis, setCidadesDisponiveis] = useState([]);

    const categoryOptions = [
        "shows_festas",
        "cinemas",
        "teatros",
        "bares",
        "restaurantes",
        "passeios",
        "palestras"
    ];

    // Definir a data mínima como o dia atual quando o componente é montado
    useEffect(() => {
        const today = new Date();
        // Formatar a data como YYYY-MM-DD para o atributo min do input
        const formattedDate = today.toISOString().split('T')[0];
        setMinDate(formattedDate);

        // Formatar a hora atual como HH:MM para o atributo min do input de hora
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setMinTime(formattedTime);
    }, []);

    // Atualizar cidades disponíveis quando o estado mudar
    useEffect(() => {
        if (formData.state) {
            setCidadesDisponiveis(CIDADES_POR_ESTADO[formData.state] || []);

            // Se já havia uma cidade selecionada e ela não está na lista do novo estado
            if (formData.city && !CIDADES_POR_ESTADO[formData.state]?.includes(formData.city)) {
                // Limpar o campo de cidade
                setFormData(prev => ({
                    ...prev,
                    city: ""
                }));
            }
        } else {
            setCidadesDisponiveis([]);
        }
    }, [formData.state]);

    // Verificar se a data selecionada é hoje para aplicar a restrição de hora
    useEffect(() => {
        if (formData.date) {
            const today = new Date();
            const selectedDate = new Date(formData.date);

            // Comparar apenas ano, mês e dia
            const isSelectedDateToday =
                selectedDate.getFullYear() === today.getFullYear() &&
                selectedDate.getMonth() === today.getMonth() &&
                selectedDate.getDate() === today.getDate();

            setIsToday(isSelectedDateToday);

            // Se a data for alterada e não for hoje, limpar o erro de hora
            if (!isSelectedDateToday && errors.hour) {
                setErrors(prev => ({
                    ...prev,
                    hour: ""
                }));
            }

            // Se a data mudar e for hoje, e a hora estiver definida e for anterior à hora atual
            if (isSelectedDateToday && formData.hour && formData.hour < minTime) {
                setErrors(prev => ({
                    ...prev,
                    hour: "A hora deve ser posterior à hora atual"
                }));
            }
        }
    }, [formData.date, minTime]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validação especial para o campo número - aceitar apenas números
        if (name === "number") {
            // Se não for número, não atualiza o estado
            if (!/^\d*$/.test(value)) {
                return;
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpar erro específico quando o campo é alterado
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }

        // Validação especial para o campo hora quando a data é hoje
        if (name === "hour" && isToday && value < minTime) {
            setErrors(prev => ({
                ...prev,
                hour: "A hora deve ser posterior à hora atual"
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Criar URL para pré-visualização da imagem
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);

            // Limpar erro de imagem se existir
            if (errors.image) {
                setErrors(prev => ({
                    ...prev,
                    image: ""
                }));
            }
        }
    };

    const clearForm = () => {
        setFormData({
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
        setImage(null);
        setImagePreview(null);
        setErrors({});
        setCidadesDisponiveis([]);
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validar todos os campos do formulário
        Object.entries(formData).forEach(([key, value]) => {
            if (!value.trim()) {
                newErrors[key] = `O campo ${key} é obrigatório`;
            }
        });

        // Validar categoria
        if (formData.category && !categoryOptions.includes(formData.category)) {
            newErrors.category = "Selecione uma categoria válida da lista";
        }

        // Validar estado
        if (formData.state && !ESTADOS_BRASILEIROS.includes(formData.state)) {
            newErrors.state = "Selecione um estado válido da lista";
        }

        // Validar cidade
        if (formData.city && formData.state && !CIDADES_POR_ESTADO[formData.state]?.includes(formData.city)) {
            newErrors.city = "Selecione uma cidade válida para o estado selecionado";
        }

        // Validar imagem
        if (!image) {
            newErrors.image = "É necessário selecionar uma imagem para o evento";
        }

        // Validar que a data não seja anterior à data atual
        if (formData.date) {
            // Criar datas com o mesmo fuso horário para comparação correta
            const selectedDateStr = formData.date; // formato "YYYY-MM-DD"
            const todayStr = new Date().toISOString().split('T')[0]; // formato "YYYY-MM-DD"

            // Comparar as strings de data diretamente para verificar se é passado
            if (selectedDateStr < todayStr) {
                newErrors.date = "A data do evento não pode ser anterior à data atual";
            }
            // Verificar se é hoje
            else if (selectedDateStr === todayStr) {
                // Se for hoje, verificar a hora
                const now = new Date();
                const currentHours = String(now.getHours()).padStart(2, '0');
                const currentMinutes = String(now.getMinutes()).padStart(2, '0');
                const currentTime = `${currentHours}:${currentMinutes}`;

                if (formData.hour && formData.hour < currentTime) {
                    newErrors.hour = "Para eventos hoje, a hora deve ser posterior à hora atual";
                }
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

            // Adicionar dados do formulário
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "date" && value) {
                    // Formato data e hora em um formato ISO
                    const timeValue = formData.hour || "00:00";
                    // Criar string ISO diretamente (Z indica UTC)
                    const isoString = `${value}T${timeValue}:00Z`;
                    submitFormData.append(key, isoString);
                } else {
                    submitFormData.append(key, value);
                }
            });

            // Adicionar imagem
            submitFormData.append("image", image);

            await api.post("/criar-evento", submitFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Evento cadastrado com sucesso");
            clearForm();
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                form: err.message || "Erro ao cadastrar evento"
            }));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // Limpar objeto URL quando o componente é desmontado
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <Container>
            <ContainerForms>
                <PageTitle>Criar Novo Evento</PageTitle>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <DivImg>
                        <FormLabel htmlFor="image-upload">Imagem do Evento: *</FormLabel>
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
                                    inputMode="numeric"
                                    pattern="[0-9]*"
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
                                    list="estados_list"
                                    error={errors.state}
                                />
                                <datalist id="estados_list">
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
                                    placeholder={formData.state ? "Selecione a cidade" : "Selecione o estado primeiro"}
                                    list="cidades_list"
                                    disabled={!formData.state}
                                    error={errors.city}
                                />
                                <datalist id="cidades_list">
                                    {cidadesDisponiveis.map(cidade => (
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
                                    min={minDate}
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
                                    min={isToday ? minTime : undefined}
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
                                {loading ? "Cadastrando..." : "Cadastrar Evento"}
                            </Button>
                        </DivButton>
                    </DivForm>
                </Form>
            </ContainerForms>
        </Container>
    );
}

export default CreateEvent;