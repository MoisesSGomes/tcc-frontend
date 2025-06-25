import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { InstallBanner, InstallButton, CancelButton } from './App.styles'
import Header from "./components/Header"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ShowEvent from "./pages/ShowEvent"
import CreateEvent from "./pages/CreateEvent"
import Footer from "./components/Footer"
import ShowAllEvents from "./pages/ShowAllEvents"
import FilterEvent from "./pages/FilterEvent"
import SearchFilter from "./pages/SearchFilter"
import MyEvents from "./pages/MyEvents"
import MyPerfil from "./pages/MyPerfil"
import PerfilEdit from "./pages/PerfilEdit"
import EventEdit from "./pages/EventEdit"
import RequestPasswordReset from "./pages/RequestPasswordReset"
import ResetPassword from "./pages/ResetPassword"
import TermOfUse from "./pages/TermOfUse"
import DateFilter from "./pages/DateFilter"
import EmailVerification from "./pages/EmailVerification"
import ResendVerification from "./pages/ResendVerification"
import OAuthCallback from "./pages/OAuthCallback"
import MyFavorites from "./pages/MyFavorites"
import Contact from "./pages/Contact"
import About from "./pages/About"

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Verifica se já está instalado
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone ||
                       document.referrer.includes('android-app://');

    if (isInstalled) {
      setShowInstallButton(false);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA foi instalado');
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/evento" element={<ShowEvent />} />
          <Route path="/criar-evento" element={<CreateEvent />} />
          <Route path="/mostrar-todos-eventos" element={<ShowAllEvents />} />
          <Route path="/filtrar-eventos/:category" element={<FilterEvent />} />
          <Route path="/eventos" element={<SearchFilter />} />
          <Route path="/meus-eventos" element={<MyEvents />} />
          <Route path="/meu-perfil" element={<MyPerfil />} />
          <Route path="/editar-meu-perfil" element={<PerfilEdit />} />
          <Route path="/editar-evento/:id" element={<EventEdit />} />
          <Route path="/recuperar-senha" element={<RequestPasswordReset />} />
          <Route path="/redefinir-senha/:token" element={<ResetPassword />} />
          <Route path="/termos-de-uso" element={<TermOfUse />} />
          <Route path="/eventos-por-data" element={<DateFilter />} />
          <Route path="/verificar-email/:token" element={<EmailVerification />} />
          <Route path="/reenviar-verificacao" element={<ResendVerification />} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          <Route path="/meus-favoritos" element={<MyFavorites />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/sobre" element={<About />} />
        </Routes>

        <Footer />
      </BrowserRouter>

      {showInstallButton && (
        <InstallBanner>
          <p>Instale nosso aplicativo para melhor experiência!</p>
          <div>
            <CancelButton onClick={() => setShowInstallButton(false)}>
              Mais tarde
            </CancelButton>
            <InstallButton onClick={handleInstallClick}>
              Instalar
            </InstallButton>
          </div>
        </InstallBanner>
      )}
    </div>
  )
}

export default App