import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from '../../services/api.js'
import {
  DivVerification,
  TituloVerification,
  VerificationMessage,
  VerificationButton,
  LoginLink
} from "./styles"

function EmailVerification() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [verificationStatus, setVerificationStatus] = useState({
    loading: true,
    success: false,
    message: "Verificando seu email..."
  })

  useEffect(() => {
    let isCancelled = false

    const verifyEmail = async () => {
      try {
        const response = await api.get(`/verificar-email/${token}`)
        if (!isCancelled) {
          setVerificationStatus({
            loading: false,
            success: true,
            message: response.data.message
          })
        }
      } catch (error) {
        if (!isCancelled) {
          setVerificationStatus({
            loading: false,
            success: false,
            message: error.response?.data?.message || "Não foi possível verificar seu email. O link pode ter expirado ou ser inválido."
          })
        }
      }
    }

    if (token) {
      verifyEmail()
    }

    return () => {
      isCancelled = true
    }
  }, [token])

  return (
    <DivVerification>
      <TituloVerification>Verificação de Email</TituloVerification>

      {verificationStatus.loading ? (
        <VerificationMessage>Verificando seu email...</VerificationMessage>
      ) : (
        <>
          <VerificationMessage $success={verificationStatus.success}>
            {verificationStatus.message}
          </VerificationMessage>

          {verificationStatus.success ? (
            <VerificationButton onClick={() => navigate('/login')}>
              Ir para Login
            </VerificationButton>
          ) : (
            <VerificationButton onClick={() => navigate('/reenviar-verificacao')}>
              Solicitar Novo Link
            </VerificationButton>
          )}
        </>
      )}

      <LoginLink to="/login">Voltar para Login</LoginLink>
    </DivVerification>
  )
}

export default EmailVerification


