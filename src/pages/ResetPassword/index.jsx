import { useRef, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from '../../services/api'
import {
  ResetContainer,
  ResetTitle,
  ResetForm,
  InputContainer,
  InputLabel,
  Input,
  ErrorMessage,
  ResetButton,
  SuccessMessage,
  BackToLogin,
  PasswordInputContainer,
  PasswordToggleButton,
  ChecklistContainer,
  ChecklistItem,
  CheckIcon,
  ResetFormContainer
} from "./styles"

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    form: ''
  })
  
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [isResetSuccessful, setIsResetSuccessful] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  
  // Password validation criteria - consistent with PerfilEdit
  const hasMinLength = !passwords.password || passwords.password.length >= 6;
  const hasNumber = !passwords.password || /\d/.test(passwords.password);
  const hasSpecialChar = !passwords.password || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwords.password);
  const passwordsMatch = !passwords.password || passwords.password === passwords.confirmPassword;
  
  const isPasswordValid = hasMinLength && hasNumber && hasSpecialChar;
  
  // Verificar se o token é válido
  useEffect(() => {
    async function verifyToken() {
      try {
        await api.get(`/verificar-token-redefinicao/${token}`)
        setIsTokenValid(true)
      } catch (err) {
        setIsTokenValid(false)
      } finally {
        setIsLoading(false)
      }
    }
    
    verifyToken()
  }, [token])
  
  // Validar formulário
  useEffect(() => {
    const newErrors = {
      password: '',
      confirmPassword: '',
      form: ''
    }
    
    if ((touched.password || attemptedSubmit) && passwords.password) {
      if (!hasMinLength) {
        newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
      } else if (!hasNumber || !hasSpecialChar) {
        newErrors.password = 'A senha deve conter pelo menos 1 número e 1 caractere especial';
      }
    }
    
    if ((touched.confirmPassword || attemptedSubmit) && passwords.confirmPassword) {
      if (!passwordsMatch) {
        newErrors.confirmPassword = 'As senhas não correspondem';
      }
    }
    
    setErrors(newErrors)
  }, [passwords, touched, attemptedSubmit, hasMinLength, hasNumber, hasSpecialChar, passwordsMatch])
  
  function handleInputChange(e) {
    const { name, value } = e.target
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  function handleBlur(e) {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }
  
  function togglePasswordVisibility(field) {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }
  
  function isFormValid() {
    return (
      passwords.password && 
      passwords.confirmPassword && 
      passwordsMatch &&
      isPasswordValid
    )
  }
  
  async function handleSubmit(e) {
    e.preventDefault()
    setAttemptedSubmit(true)
    
    if (!isFormValid()) {
      return
    }
    
    try {
      await api.post('/redefinir-senha', {
        token,
        newPassword: passwords.password
      })
      
      setIsResetSuccessful(true)
      
      // Limpar os campos
      setPasswords({
        password: '',
        confirmPassword: ''
      })
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao redefinir a senha'
      setErrors(prev => ({
        ...prev,
        form: errorMessage
      }))
    }
  }
  
  if (isLoading) {
    return (
      <ResetContainer>
        <p>Verificando link de redefinição...</p>
      </ResetContainer>
    )
  }
  
  if (!isTokenValid) {
    return (
      <ResetContainer>
        <ResetTitle>Link Inválido</ResetTitle>
        <p>O link de redefinição de senha é inválido ou expirou.</p>
        <BackToLogin to="/recuperar-senha">Solicitar novo link</BackToLogin>
      </ResetContainer>
    )
  }
  
  return (
    <ResetContainer>
      <ResetTitle>Redefinir Senha</ResetTitle>
      
      {isResetSuccessful ? (
        <>
          <SuccessMessage>
            Sua senha foi redefinida com sucesso. Você já pode fazer login com sua nova senha.
          </SuccessMessage>
          <BackToLogin to="/login">Ir para o Login</BackToLogin>
        </>
      ) : (
        <ResetFormContainer>
          <ResetForm onSubmit={handleSubmit}>
            <InputContainer>
              <InputLabel htmlFor="password">Nova Senha</InputLabel>
              <PasswordInputContainer>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  placeholder="Digite sua nova senha"
                  value={passwords.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  $error={!!errors.password}
                />
                <PasswordToggleButton 
                  type="button" 
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </PasswordToggleButton>
              </PasswordInputContainer>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
              
              {passwords.password && (
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
              )}
            </InputContainer>
            
            <InputContainer>
              <InputLabel htmlFor="confirmPassword">Confirmar Senha</InputLabel>
              <PasswordInputContainer>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  ref={confirmPasswordRef}
                  placeholder="Confirme sua nova senha"
                  value={passwords.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  $error={!!errors.confirmPassword}
                />
                <PasswordToggleButton 
                  type="button" 
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {showConfirmPassword ? "Ocultar" : "Mostrar"}
                </PasswordToggleButton>
              </PasswordInputContainer>
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
              
              {passwords.password && passwords.confirmPassword && (
                <ChecklistContainer>
                  <ChecklistItem $satisfied={passwordsMatch}>
                    <CheckIcon $satisfied={passwordsMatch}>{passwordsMatch ? '✓' : ''}</CheckIcon>
                    Senhas correspondem
                  </ChecklistItem>
                </ChecklistContainer>
              )}
            </InputContainer>
            
            {errors.form && <ErrorMessage style={{ textAlign: 'center' }}>{errors.form}</ErrorMessage>}
            
            <ResetButton disabled={!isFormValid()}>Redefinir Senha</ResetButton>
          </ResetForm>
          <BackToLogin to="/login">Voltar para o Login</BackToLogin>
        </ResetFormContainer>
      )}
    </ResetContainer>
  )
}

export default ResetPassword