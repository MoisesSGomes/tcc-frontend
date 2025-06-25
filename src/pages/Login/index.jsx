import { Link, useNavigate, useLocation } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import api from '../../services/api.js'
import googleImage from '../../assets/images/google-icon.svg'
import {
  DivLogin,
  TituloLogin,
  FormLogin,
  InputContainer,
  InputLabel,
  InputLogin,
  ErrorMessage,
  PasswordInputContainer,
  PasswordToggleButton,
  ButtonLogin,
  RegisterLink,
  ForgotPasswordLink,
  VerificationAlertContainer,
  VerificationAlertMessage,
  VerificationAlertButtons,
  VerificationAlertButton,
  AlertCloseButton,
  SocialLoginContainer,
  GoogleLoginButton,
  OrDivider
} from "./styles"

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })
    
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        general: ''
    })
    
    const [touched, setTouched] = useState({
        email: false,
        password: false
    })
    
    const [attemptedSubmit, setAttemptedSubmit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showVerificationAlert, setShowVerificationAlert] = useState(false)
    
    // Check if user is coming back from OAuth
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const token = params.get('token')
        
        if (token) {
            localStorage.setItem('token', token)
            navigate('/')
        }
    }, [location, navigate])
    
    // Check if all form fields are valid
    const isFormValid = 
        isEmailValid(formValues.email) && 
        formValues.password.trim() !== ''

    function isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    
    // Handle form input changes
    function handleInputChange(e) {
        const { name, value } = e.target
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
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
        setShowPassword(!showPassword)
    }
    
    // Validate form on value changes and touched fields
    useEffect(() => {
        const errors = {
            email: '',
            password: '',
            general: ''
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
            }
        }
        
        setFormErrors(errors)
    }, [formValues, touched, attemptedSubmit])

    async function handleSubmit(event) {
        event.preventDefault()
        setAttemptedSubmit(true)

        // Reset errors
        setFormErrors({
            email: '',
            password: '',
            general: ''
        })

        if (!isFormValid) {
            // Focus on the first field with an error
            if (!isEmailValid(formValues.email)) {
                emailRef.current.focus()
            } else if (formValues.password.trim() === '') {
                passwordRef.current.focus()
            }
            return
        }

        try {
            setIsSubmitting(true)
            const { data: token } = await api.post('/login', {
                email: formValues.email,
                password: formValues.password
            })

            localStorage.setItem('token', token)
            
            navigate('/')

        } catch (err) {
            console.error('Login error:', err)
            
            if (err.response?.status === 403 && err.response?.data?.needsVerification) {
                // Usuário precisa verificar o email
                setShowVerificationAlert(true)
            } else if (err.response?.status === 404) {
                setFormErrors(prev => ({
                    ...prev,
                    email: 'Usuário não encontrado'
                }))
            } else if (err.response?.status === 400) {
                setFormErrors(prev => ({
                    ...prev,
                    password: 'Senha inválida'
                }))
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    general: 'Erro ao fazer login. Tente novamente mais tarde.'
                }))
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    // Função para reenviar email de verificação
    function handleResendVerification() {
        navigate('/reenviar-verificacao', { state: { email: formValues.email } })
    }
    
    // Handle Google login
    function handleGoogleLogin() {
        window.location.href = `${api.defaults.baseURL}/auth/google`
    }

    return (
        <DivLogin>
            <TituloLogin>Login</TituloLogin>
            {formErrors.general && <ErrorMessage>{formErrors.general}</ErrorMessage>}
            
            {showVerificationAlert && (
                <VerificationAlertContainer>
                    <VerificationAlertMessage>
                        Seu email ainda não foi verificado. Por favor, verifique sua caixa de entrada ou spam.
                    </VerificationAlertMessage>
                    <VerificationAlertButtons>
                        <VerificationAlertButton onClick={handleResendVerification}>
                            Reenviar Email
                        </VerificationAlertButton>
                        <AlertCloseButton onClick={() => setShowVerificationAlert(false)}>
                            Fechar
                        </AlertCloseButton>
                    </VerificationAlertButtons>
                </VerificationAlertContainer>
            )}
            
            <SocialLoginContainer>
                <GoogleLoginButton type="button" onClick={handleGoogleLogin}>
                    <img src={googleImage} alt="Google" />
                    Entrar com Google
                </GoogleLoginButton>
            </SocialLoginContainer>
            
            <OrDivider>
                <span>ou</span>
            </OrDivider>
            
            <FormLogin onSubmit={handleSubmit}>
                <InputContainer>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <InputLogin 
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
                        <InputLogin 
                            id="password"
                            name="password"
                            ref={passwordRef} 
                            placeholder="Digite sua senha" 
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
                </InputContainer>
                
                <ForgotPasswordLink to="/recuperar-senha">Esqueceu sua senha?</ForgotPasswordLink>
                
                <ButtonLogin disabled={!isFormValid || isSubmitting}>
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                </ButtonLogin>
            </FormLogin>
            <RegisterLink to="/cadastro">Não tem uma conta? Cadastre-se</RegisterLink>
        </DivLogin>
    )
}

export default Login