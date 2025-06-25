import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import {
    Container,
    ContainerForms,
    Form,
    Input,
    DivButton,
    DivImg,
    DivForm,
    InputUpload,
    FormLabel,
    ErrorMessage,
    PageTitle,
    Button,
    ImagePreviewContainer,
    ImagePreview,
    PasswordInputContainer,
    PasswordToggleButton,
    ChecklistContainer,
    ChecklistItem,
    CheckIcon
} from "./styles";

function PerfilEdit() {
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const [touched, setTouched] = useState({
        name: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Password validation criteria - only check if password field is filled
    const hasMinLength = !formData.password || formData.password.length >= 6;
    const hasNumber = !formData.password || /\d/.test(formData.password);
    const hasSpecialChar = !formData.password || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(formData.password);
    const passwordsMatch = !formData.password || formData.password === formData.confirmPassword;
    
    const isPasswordValid = hasMinLength && hasNumber && hasSpecialChar;
    
    // Check if form is valid for submission
    const isFormValid = 
        formData.name.trim() !== '' &&
        isEmailValid(formData.email) &&
        isPasswordValid &&
        passwordsMatch;

    // Carregar dados do usuário ao montar o componente
    useEffect(() => {
        async function loadUserData() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Usuário não autenticado");
                }

                const response = await api.get("/meu-perfil", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = response.data;
                
                // Se houver um nome completo, extrai apenas o primeiro nome
                let firstName = "";
                if (userData.name) {
                    firstName = userData.name.split(' ')[0];
                    // Capitaliza o primeiro nome
                    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
                }
                
                setFormData({
                    name: firstName,
                    lastName: userData.lastName || "",
                    email: userData.email || "",
                    password: "",
                    confirmPassword: ""
                });

               
                    if (userData.image) {
                        const imageSrc = typeof userData.image === 'string'
                            ? userData.image
                            : userData.image.path?.startsWith('http')
                                ? userData.image.path
                                : `http://localhost:3000${userData.image.path}`;
                        
                        setCurrentImage(imageSrc);
                    }
            } catch (err) {
                console.error("Erro ao carregar dados do usuário:", err);
                setErrors(prev => ({
                    ...prev,
                    form: "Não foi possível carregar seus dados. Por favor, tente novamente."
                }));
            }
        }

        loadUserData();
    }, []);

    function isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        
        // Tratamento especial para o campo 'name'
        if (name === 'name') {
            // Extrai apenas o primeiro nome (remove espaços e pega a primeira palavra)
            const firstName = value.trim().split(' ')[0];
            
            // Capitaliza a primeira letra e mantém o resto minúsculo
            const capitalizedName = firstName 
                ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
                : '';
                
            setFormData(prev => ({
                ...prev,
                [name]: capitalizedName
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear error when field is changed
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    }

    function handleBlur(e) {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    }

    function handleImageChange(e) {
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
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }
    
    // Toggle confirm password visibility
    function toggleConfirmPasswordVisibility() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    // Validate form on value changes and touched fields
    useEffect(() => {
        const newErrors = {};
        
        if (touched.name || attemptedSubmit) {
            if (formData.name.trim() === '') {
                newErrors.name = 'Nome é obrigatório';
            } else if (formData.name.includes(' ')) {
                newErrors.name = 'Digite apenas o primeiro nome';
            }
        }
        
        if (touched.email || attemptedSubmit) {
            if (formData.email.trim() === '') {
                newErrors.email = 'Email é obrigatório';
            } else if (!isEmailValid(formData.email)) {
                newErrors.email = 'Email inválido';
            }
        }
        
        // Only validate password fields if the user has attempted to fill them
        if ((touched.password || attemptedSubmit) && formData.password) {
            if (!hasMinLength) {
                newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
            } else if (!hasNumber || !hasSpecialChar) {
                newErrors.password = 'A senha deve conter pelo menos 1 número e 1 caractere especial';
            }
        }
        
        if ((touched.confirmPassword || attemptedSubmit) && formData.confirmPassword) {
            if (!passwordsMatch) {
                newErrors.confirmPassword = 'As senhas não correspondem';
            }
        }
        
        setErrors(prev => ({
            ...prev,
            ...newErrors
        }));
    }, [formData, touched, attemptedSubmit, hasMinLength, hasNumber, hasSpecialChar, passwordsMatch]);

    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        setAttemptedSubmit(true);

        // Validate form before submission
        if (!isFormValid) {
            // Focus on the first field with an error
            if (formData.name.trim() === '') {
                nameRef.current.focus();
            } else if (!isEmailValid(formData.email)) {
                emailRef.current.focus();
            } else if (formData.password && !isPasswordValid) {
                passwordRef.current.focus();
            } else if (formData.password && !passwordsMatch) {
                confirmPasswordRef.current.focus();
            }
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
            // Garantir que o nome tenha a primeira letra maiúscula
            const nameFormatted = formData.name.charAt(0).toUpperCase() + formData.name.slice(1).toLowerCase();
            
            // Adicionar campos ao FormData
            submitFormData.append("name", nameFormatted);
            submitFormData.append("lastName", formData.lastName);
            submitFormData.append("email", formData.email);
            
            // Adicionar senha apenas se estiver preenchida
            if (formData.password) {
                submitFormData.append("password", formData.password);
            }

            // Add image only if a new one was selected
            if (image) {
                submitFormData.append("image", image);
            }

            await api.post("/alterar-perfil", submitFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Dados do usuário alterados com sucesso");

            navigate('/meu-perfil');
            
            // If a new image was sent, update the view
            if (imagePreview) {
                setCurrentImage(imagePreview);
            }
            
            // Clear password fields after success
            setFormData(prev => ({
                ...prev,
                password: "",
                confirmPassword: ""
            }));
            
            setImage(null);
            setImagePreview(null);
            setTouched({
                name: false,
                lastName: false,
                email: false,
                password: false,
                confirmPassword: false
            });
            setAttemptedSubmit(false);
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                form: err.response?.data?.message || "Erro ao alterar dados do usuário"
            }));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // Clean up URL objects when component unmounts
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
                <PageTitle>Alterar Dados do Usuário</PageTitle>

                <Form onSubmit={handleSubmit}>
                    <DivImg>
                        <FormLabel htmlFor="image-upload">Imagem do Perfil:</FormLabel>
                        <InputUpload
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleImageChange}
                        />

                        {(imagePreview || currentImage) && (
                            <ImagePreviewContainer>
                                <ImagePreview
                                    src={imagePreview || currentImage}
                                    alt="Foto de perfil"
                                />
                            </ImagePreviewContainer>
                        )}

                        {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
                    </DivImg>

                    <DivForm>
                        <div>
                            <FormLabel htmlFor="name">Nome (apenas primeiro nome) *</FormLabel>
                            <Input
                                id="name"
                                name="name"
                                ref={nameRef}
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Primeiro nome"
                                type="text"
                                error={errors.name}
                            />
                            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                        </div>

                        <div>
                            <FormLabel htmlFor="lastName">Sobrenome</FormLabel>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Sobrenome"
                                type="text"
                                error={errors.lastName}
                            />
                            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
                        </div>
                        
                        {/* <div>
                            <FormLabel htmlFor="email">Email *</FormLabel>
                            <Input
                                id="email"
                                name="email"
                                ref={emailRef}
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Email"
                                type="email"
                                error={errors.email}
                            />
                            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                        </div> */}

                        <div>
                            <FormLabel htmlFor="password">Nova Senha</FormLabel>
                            <PasswordInputContainer>
                                <Input
                                    id="password"
                                    name="password"
                                    ref={passwordRef}
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Digite a nova senha (deixe em branco para não alterar)"
                                    type={showPassword ? "text" : "password"}
                                    error={errors.password}
                                />
                                <PasswordToggleButton type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? "Ocultar" : "Mostrar"}
                                </PasswordToggleButton>
                            </PasswordInputContainer>
                            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                            
                            {formData.password && (
                                <ChecklistContainer>
                                    <ChecklistItem satisfied={hasMinLength}>
                                        <CheckIcon satisfied={hasMinLength}>{hasMinLength ? '✓' : ''}</CheckIcon>
                                        Mínimo de 6 caracteres
                                    </ChecklistItem>
                                    <ChecklistItem satisfied={hasNumber}>
                                        <CheckIcon satisfied={hasNumber}>{hasNumber ? '✓' : ''}</CheckIcon>
                                        Pelo menos 1 número
                                    </ChecklistItem>
                                    <ChecklistItem satisfied={hasSpecialChar}>
                                        <CheckIcon satisfied={hasSpecialChar}>{hasSpecialChar ? '✓' : ''}</CheckIcon>
                                        Pelo menos 1 caractere especial
                                    </ChecklistItem>
                                </ChecklistContainer>
                            )}
                        </div>

                        <div>
                            <FormLabel htmlFor="confirmPassword">Confirmar Nova Senha</FormLabel>
                            <PasswordInputContainer>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    ref={confirmPasswordRef}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Confirme a nova senha"
                                    type={showConfirmPassword ? "text" : "password"}
                                    error={errors.confirmPassword}
                                />
                                <PasswordToggleButton type="button" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? "Ocultar" : "Mostrar"}
                                </PasswordToggleButton>
                            </PasswordInputContainer>
                            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                            
                            {formData.password && formData.confirmPassword && (
                                <ChecklistContainer>
                                    <ChecklistItem satisfied={passwordsMatch}>
                                        <CheckIcon satisfied={passwordsMatch}>{passwordsMatch ? '✓' : ''}</CheckIcon>
                                        Senhas correspondem
                                    </ChecklistItem>
                                </ChecklistContainer>
                            )}
                        </div>

                        {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}

                        <DivButton>
                            <Button type="submit" disabled={loading || !isFormValid}>
                                {loading ? "Salvando..." : "Salvar Alteração"}
                            </Button>
                        </DivButton>
                    </DivForm>
                </Form>
            </ContainerForms>
        </Container>
    );
}

export default PerfilEdit;

