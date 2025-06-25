import { Link, useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import api from '../../services/api.js'
import {
  DivRegister,
  TituloRegister,
  FormRegister,
  InputContainer,
  InputLabel,
  InputRegister,
  ErrorMessage,
  ChecklistContainer,
  ChecklistItem,
  CheckIcon,
  TermsContainer,
  TermsLink,
  ButtonRegister,
  LoginLink,
  PasswordInputContainer,
  PasswordToggleButton
} from "./styles"

function Register() {
    const navigate = useNavigate()
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: ''
    })
    
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    })
    
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [attemptedSubmit, setAttemptedSubmit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    // Password validation criteria
    const hasMinLength = formValues.password.length >= 6
    const hasNumber = /\d/.test(formValues.password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(formValues.password)
    const passwordsMatch = formValues.password === formValues.confirmPassword && formValues.password !== ''
    
    const isPasswordValid = hasMinLength && hasNumber && hasSpecialChar
    
    // Check if all form fields are valid
    const isFormValid = 
        formValues.name.trim() !== '' && 
        isEmailValid(formValues.email) && 
        isPasswordValid && 
        passwordsMatch && 
        termsAccepted

    function isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    function isFirstNameOnly(name) {
        return !name.includes(' ');
    }

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Handle form input changes
    function handleInputChange(e) {
        const { name, value } = e.target
        
        if (name === 'name') {
            // Split by space and take only the first part (first name)
            const firstName = value.split(' ')[0];
            // Capitalize the first letter
            const formattedName = capitalizeFirstLetter(firstName);
            setFormValues(prev => ({
                ...prev,
                [name]: formattedName
            }));
        } else {
            setFormValues(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }
    
    // Handle input blur to mark fields as touched
    function handleBlur(e) {
        const { name } = e.target
        setTouched(prev => ({
            ...prev,
            [name]: true
        }))
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
        const errors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: ''
        }
        
        if (touched.name || attemptedSubmit) {
            if (formValues.name.trim() === '') {
                errors.name = 'Nome é obrigatório'
            } else if (!isFirstNameOnly(formValues.name)) {
                errors.name = 'Por favor, insira apenas o primeiro nome'
            }
        }
        
        if (touched.email || attemptedSubmit) {
            if (formValues.email.trim() === '') {
                errors.email = 'Email é obrigatório'
            } else if (!isEmailValid(formValues.email)) {
                errors.email = 'Email inválido'
            }
        }
        
        if (touched.password || attemptedSubmit) {
            if (formValues.password === '') {
                errors.password = 'Senha é obrigatória'
            } else if (!isPasswordValid) {
                errors.password = 'Senha não atende aos requisitos'
            }
        }
        
        if (touched.confirmPassword || attemptedSubmit) {
            if (formValues.confirmPassword === '') {
                errors.confirmPassword = 'Confirmação de senha é obrigatória'
            } else if (!passwordsMatch) {
                errors.confirmPassword = 'As senhas não correspondem'
            }
        }
        
        if (attemptedSubmit && !termsAccepted) {
            errors.terms = 'Você deve aceitar os termos'
        }
        
        setFormErrors(errors)
    }, [formValues, touched, termsAccepted, attemptedSubmit, isPasswordValid, passwordsMatch])

    async function handleSubmit(event) {
        event.preventDefault()
        setAttemptedSubmit(true)

        if (!isFormValid) {
            // Focus on the first field with an error
            if (formValues.name.trim() === '') {
                nameRef.current.focus()
            } else if (!isFirstNameOnly(formValues.name)) {
                nameRef.current.focus()
            } else if (!isEmailValid(formValues.email)) {
                emailRef.current.focus()
            } else if (!isPasswordValid) {
                passwordRef.current.focus()
            } else if (!passwordsMatch) {
                confirmPasswordRef.current.focus()
            }
            return
        }

        try {
            await api.post('/cadastro', {
                name: capitalizeFirstLetter(formValues.name),
                email: formValues.email,
                password: formValues.password
            })

            alert("Usuário Cadastrado com sucesso!!!\nPor favor, verifique seu email para ativar sua conta."

            )
            // Reset form after successful submission
            setFormValues({ name: '', email: '', password: '', confirmPassword: '' })
            setTouched({ name: false, email: false, password: false, confirmPassword: false })
            setTermsAccepted(false)
            setAttemptedSubmit(false)
            setShowPassword(false)
            setShowConfirmPassword(false)
            navigate('/login')
        } catch (err) {
            alert("Erro ao cadastrar usuário!!!")
        }
    }

    return (
        <DivRegister>
            <TituloRegister>Cadastro</TituloRegister>
            <FormRegister onSubmit={handleSubmit}>
                <InputContainer>
                    <InputLabel htmlFor="name">Primeiro Nome</InputLabel>
                    <InputRegister 
                        id="name"
                        name="name"
                        ref={nameRef} 
                        placeholder="Seu primeiro nome" 
                        type="text" 
                        value={formValues.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        $error={formErrors.name !== ''}
                    />
                    <ErrorMessage>{formErrors.name}</ErrorMessage>
                </InputContainer>
                
                <InputContainer>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <InputRegister 
                        id="email"
                        name="email"
                        ref={emailRef} 
                        placeholder="exemplo@email.com" 
                        type="email" 
                        value={formValues.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        $error={formErrors.email !== ''}
                    />
                    <ErrorMessage>{formErrors.email}</ErrorMessage>
                </InputContainer>
                
                <InputContainer>
                    <InputLabel htmlFor="password">Senha</InputLabel>
                    <PasswordInputContainer>
                        <InputRegister 
                            id="password"
                            name="password"
                            ref={passwordRef} 
                            placeholder="Crie uma senha forte" 
                            type={showPassword ? "text" : "password"} 
                            value={formValues.password}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            $error={formErrors.password !== ''}
                        />
                        <PasswordToggleButton type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </PasswordToggleButton>
                    </PasswordInputContainer>
                    <ErrorMessage>{formErrors.password}</ErrorMessage>
                    
                    <ChecklistContainer>
                        <ChecklistItem $satisfied={hasMinLength}>
                            <CheckIcon $satisfied={hasMinLength}>{hasMinLength ? '✓' : ''}</CheckIcon>
                            Mínimo de 6 caracteres
                        </ChecklistItem>
                        <ChecklistItem $satisfied={hasNumber}>
                            <CheckIcon $satisfied={hasNumber}>{hasNumber ? '✓' : ''}</CheckIcon>
                            Pelo menos 1 número
                        </ChecklistItem>
                        <ChecklistItem $satisfied={hasSpecialChar}>
                            <CheckIcon $satisfied={hasSpecialChar}>{hasSpecialChar ? '✓' : ''}</CheckIcon>
                            Pelo menos 1 caractere especial
                        </ChecklistItem>
                    </ChecklistContainer>
                </InputContainer>
                
                <InputContainer>
                    <InputLabel htmlFor="confirmPassword">Confirmar Senha</InputLabel>
                    <PasswordInputContainer>
                        <InputRegister 
                            id="confirmPassword"
                            name="confirmPassword"
                            ref={confirmPasswordRef} 
                            placeholder="Repita sua senha" 
                            type={showConfirmPassword ? "text" : "password"} 
                            value={formValues.confirmPassword}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            $error={formErrors.confirmPassword !== ''}
                        />
                        <PasswordToggleButton type="button" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? "Ocultar" : "Mostrar"}
                        </PasswordToggleButton>
                    </PasswordInputContainer>
                    <ErrorMessage>{formErrors.confirmPassword}</ErrorMessage>
                    
                    <ChecklistContainer>
                        <ChecklistItem $satisfied={passwordsMatch}>
                            <CheckIcon $satisfied={passwordsMatch}>{passwordsMatch ? '✓' : ''}</CheckIcon>
                            Senhas correspondem
                        </ChecklistItem>
                    </ChecklistContainer>
                </InputContainer>
                
                <TermsContainer>
                    <input 
                        id="terms"
                        type="checkbox" 
                        checked={termsAccepted} 
                        onChange={(e) => setTermsAccepted(e.target.checked)} 
                    />
                    <label htmlFor="terms">
                        Concordo com os <TermsLink to="/termos-de-uso">Termos de uso e políticas da Let's Go Party</TermsLink>
                    </label>
                </TermsContainer>
                {formErrors.terms && <ErrorMessage>{formErrors.terms}</ErrorMessage>}
                
                <ButtonRegister disabled={!isFormValid}>Cadastrar-se</ButtonRegister>
            </FormRegister>
            <LoginLink to="/login">Já tem uma conta? Faça login</LoginLink>
        </DivRegister>
    )
}

export default Register