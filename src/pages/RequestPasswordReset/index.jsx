import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
  BackToLogin
} from "./styles"

function RequestPasswordReset() {
  const emailRef = useRef()
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isEmailTouched, setIsEmailTouched] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false)
  const [requestError, setRequestError] = useState('')
  
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  
  useEffect(() => {
    if (isEmailTouched || attemptedSubmit) {
      if (!email.trim()) {
        setEmailError('Email é obrigatório')
        setIsEmailValid(false)
      } else if (!validateEmail(email)) {
        setEmailError('Email inválido')
        setIsEmailValid(false)
      } else {
        setEmailError('')
        setIsEmailValid(true)
      }
    }
  }, [email, isEmailTouched, attemptedSubmit])
  
  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  
  function handleEmailBlur() {
    setIsEmailTouched(true)
  }
  
  async function handleSubmit(e) {
    e.preventDefault()
    setAttemptedSubmit(true)
    
    if (!isEmailValid) {
      emailRef.current.focus()
      return
    }
    
    try {
      // Enviar solicitação de recuperação de senha
      await api.post('/solicitar-redefinicao-senha', { email })
      setIsRequestSuccessful(true)
      setRequestError('')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao solicitar redefinição de senha'
      setRequestError(errorMessage)
      setIsRequestSuccessful(false)
    }
  }
  
  return (
    <ResetContainer>
      <ResetTitle>Recuperação de Senha</ResetTitle>
      
      {isRequestSuccessful ? (
        <>
          <SuccessMessage>
            Um email com instruções para redefinir sua senha foi enviado para {email}.
            Por favor, verifique sua caixa de entrada.
          </SuccessMessage>
          <BackToLogin to="/login">Voltar para o Login</BackToLogin>
        </>
      ) : (
        <ResetForm onSubmit={handleSubmit}>
          <p>
            Digite seu email e enviaremos um link para você redefinir sua senha.
          </p>
          
          <InputContainer>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              ref={emailRef}
              placeholder="exemplo@email.com"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              $error={!!emailError}
            />
            <ErrorMessage>{emailError}</ErrorMessage>
          </InputContainer>
          
          {requestError && <ErrorMessage style={{ textAlign: 'center' }}>{requestError}</ErrorMessage>}
          
          <ResetButton disabled={!isEmailValid}>Enviar Link de Recuperação</ResetButton>
          <BackToLogin to="/login">Voltar para o Login</BackToLogin>
        </ResetForm>
      )}
    </ResetContainer>
  )
}

export default RequestPasswordReset