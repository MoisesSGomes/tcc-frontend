import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { DivCallback, LoadingSpinner, StatusMessage } from './styles';

function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('Redirecionando...');
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      // Salvar o token
      localStorage.setItem('token', token);
      
      // Configurar o token para futuras requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Buscar informações do usuário logado
      api.get('/me')  // Crie esta rota no backend para retornar os dados do usuário autenticado
        .then(response => {
          // Armazenar dados do usuário se necessário
          localStorage.setItem('userData', JSON.stringify(response.data));
          
          // Redirecionar para a página inicial
          navigate('/');
        })
        .catch(err => {
          console.error("Erro ao buscar dados do usuário:", err);
          setStatus('Erro ao obter dados do usuário');
          setError(true);
        });
    } else {
      setStatus('Token não encontrado');
      setError(true);
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [location, navigate]);
  
  return (
    <DivCallback>
      <LoadingSpinner />
      <StatusMessage $isError={error}>{status}</StatusMessage>
    </DivCallback>
  );
}

export default OAuthCallback;