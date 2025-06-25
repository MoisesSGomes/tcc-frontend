import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import api from '../../services/api.js'
import {
  DivResend,
  TituloResend,
  FormResend,
  InputContainer,
  InputLabel,
  InputResend,
  ErrorMessage,
  ButtonResend,
  LoginLink
} from "./styles" // You'll need to create these styled components

function ResendVerification() {
    const emailRef = useRef()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    function isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        
        // Reset previous errors and messages
        setEmailError('')
        setSubmitMessage('')
        
        // Validate email
        if (!email.trim()) {
            setEmailError('Email é obrigatório')
            emailRef.current.focus()
            return
        }
        
        if (!isEmailValid(email)) {
            setEmailError('Email inválido')
            emailRef.current.focus()
            return
        }
        
        try {
            setIsSubmitting(true)
            const response = await api.post('/reenviar-verificacao', { email })
            
            setIsSuccess(true)
            setSubmitMessage(response.data.message)
        } catch (error) {
            setIsSuccess(false)
            setSubmitMessage(error.response?.data?.message || "Erro ao reenviar o email de verificação. Tente novamente mais tarde.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <DivResend>
            <TituloResend>Reenviar Email de Verificação</TituloResend>
            
            {submitMessage ? (
                <>
                    <p className={isSuccess ? 'success-message' : 'error-message'}>
                        {submitMessage}
                    </p>
                    <LoginLink to="/login">Voltar para Login</LoginLink>
                </>
            ) : (
                <>
                    <p>Digite seu email para receber um novo link de verificação.</p>
                    
                    <FormResend onSubmit={handleSubmit}>
                        <InputContainer>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <InputResend 
                                id="email"
                                ref={emailRef} 
                                placeholder="exemplo@email.com" 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                $error={!!emailError}
                            />
                            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                        </InputContainer>
                        
                        <ButtonResend disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Enviar Link de Verificação'}
                        </ButtonResend>
                    </FormResend>
                    
                    <LoginLink to="/login">Voltar para Login</LoginLink>
                </>
            )}
        </DivResend>
    )
}

export default ResendVerification
