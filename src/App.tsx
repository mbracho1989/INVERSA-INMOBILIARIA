/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Heart, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  ArrowRight,
  Calculator,
  Building2,
  MessageSquare,
  ChevronDown,
  Eye,
  Orbit,
  Percent,
  Info,
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom Emblem Logo
const Logo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer gold circle */}
      <circle cx="250" cy="250" r="230" stroke="#d4af37" strokeWidth="5" />
      {/* Inner thin gold circle */}
      <circle cx="250" cy="250" r="210" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.6" />
      
      {/* Curved base support */}
      <path d="M 110 360 Q 250 325 390 360" stroke="#d4af37" strokeWidth="6" strokeLinecap="round" fill="none" />
      
      {/* Building 1 (Left): Golden sloped column */}
      <path d="M 180 348 L 180 230 C 180 230 180 215 190 210 L 225 180 L 225 340 Z" fill="url(#goldGradient)" />
      
      {/* Building 2 (Middle): Tallest golden building */}
      <path d="M 235 330 L 235 90 C 235 90 235 75 245 70 L 285 45 L 285 330 Z" fill="url(#goldGradient)" />
      
      {/* Building 3 (Right): Dark gray/black columns */}
      <path d="M 295 330 L 295 190 C 295 190 295 200 305 210 L 340 240 L 340 348 Z" fill="url(#darkGradient)" />
      
      {/* Dual leaves at bottom center representing legacy */}
      <path d="M 250 335 C 220 330 215 285 248 275 C 255 285 254 315 250 335 Z" fill="#2d5a27" stroke="#d4af37" strokeWidth="2.5" />
      <path d="M 250 335 C 280 330 285 285 252 275 C 245 285 246 315 250 335 Z" fill="#1b4d16" stroke="#d4af37" strokeWidth="2.5" />
      
      {/* Leaf lines */}
      <path d="M 233 303 Q 242 295 247 282" stroke="#d4af37" strokeWidth="1.2" fill="none" />
      <path d="M 267 303 Q 258 295 253 282" stroke="#d4af37" strokeWidth="1.2" fill="none" />

      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbf0b9" />
          <stop offset="30%" stopColor="#d4af37" />
          <stop offset="70%" stopColor="#9a721d" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
        <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#434343" />
          <stop offset="100%" stopColor="#151515" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const PROPERTIES = [
  {
    id: 1,
    status: 'EXCLUSIVO',
    price: '$2,850,000,000 COP',
    location: 'Club Campestre Serrezuela, Mosquera',
    name: 'Mansión Campestre Valle del Sol',
    beds: 5,
    baths: 6,
    description: 'Residencia de gran lujo campestre con amplios jardines privados, zona de BBQ independiente, cocina italiana equipada, y acceso premium al campo de golf del Club Serrezuela.',
    features: ['Acceso a Club Serrezuela', 'Piscina Privada', 'Zonas Verdes 1500m²', 'Seguridad Avanzada'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    status: 'EN LANZAMIENTO',
    price: '$1,450,000,000 COP',
    location: 'Hacienda Alcalá, Mosquera',
    name: 'Casa Premium Hacienda Alcalá',
    beds: 4,
    baths: 5,
    description: 'Moderna casa familiar en uno de los condominios más exclusivos de Mosquera, Cundinamarca. Cuenta con acabados de alta gama, luz natural integral y diseño bioclimático.',
    features: ['Seguridad Colectiva 24/7', 'Club House Integrado', 'Senderos Peatonales', 'Estudio & Terraza'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    status: 'EXCELENTE UBICACIÓN',
    price: '$420,000,000 COP',
    location: 'Novaterra, Mosquera - Cundinamarca',
    name: 'Apartamento Novaterra Club House',
    beds: 3,
    baths: 2,
    description: 'Hermoso apartamento de concepto abierto en Novaterra. Disfrute de un club house con piscina climatizada, gimnasio dotado, zonas infantiles y cercanía al parque principal de Mosquera.',
    features: ['Balcón Vista Oriente', 'Cocina Integral Abierta', 'Parqueadero Privado', 'Club House con Piscina'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
  }
];

// Modal Components
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-matte-black/80 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-[#151515] border border-white/10 rounded-sm shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-display font-bold gold-text">{title}</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const LoanCalculator = () => {
  const [amount, setAmount] = useState(500000);
  const [interest, setInterest] = useState(4.5);
  const [years, setYears] = useState(20);

  const monthlyPayment = React.useMemo(() => {
    const r = interest / 100 / 12;
    const n = years * 12;
    const payment = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(payment) ? 0 : payment.toFixed(2);
  }, [amount, interest, years]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Monto del Préstamo</span>
            <span className="gold-text font-bold">${amount.toLocaleString()}</span>
          </div>
          <input 
            type="range" min="50000" max="2000000" step="10000" 
            value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Interés Anual (%)</span>
            <span className="gold-text font-bold">{interest}%</span>
          </div>
          <input 
            type="range" min="1" max="15" step="0.1" 
            value={interest} onChange={(e) => setInterest(Number(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Plazo (Años)</span>
            <span className="gold-text font-bold">{years}</span>
          </div>
          <input 
            type="range" min="5" max="30" step="1" 
            value={years} onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
          />
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-sm border border-white/5 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-2">Pago Mensual Estimado</span>
        <div className="text-4xl font-display font-bold gold-text">${monthlyPayment}</div>
      </div>

      <button className="gold-button w-full">Reservar Consultoría Financiera</button>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'details' | '360'>('details');

  // Interactive AI Assistant chat states
  const [chatMessages, setChatMessages] = useState<Array<{sender: 'user' | 'assistant', text: string}>>([
    { sender: 'assistant', text: '¡Hola! Bienvenido a Inversa Inmobiliaria, inversiones que generan legado. Soy su asesor virtual jurídico e inmobiliario en Mosquera - Cundinamarca. ¿En qué puedo orientarle hoy?' }
  ]);
  const [chatInputValue, setChatInputValue] = useState('');

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMessage = { sender: 'user' as const, text };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInputValue('');

    // Custom response simulation simulating smart processing
    setTimeout(() => {
      let replyText = '';
      const query = text.toLowerCase();
      if (query.includes('patrimonio') || query.includes('suces') || query.includes('herencia') || query.includes('legal')) {
        replyText = 'En Inversa Inmobiliaria somos especialistas en la constitución y cancelación de Patrimonios de Familia y en el trámite de Sucesiones en Mosquera, Cundinamarca. Protegemos formalmente su legado patrimonial. ¿Desea que agendemos una cita directamente por WhatsApp al +57 318 8863420?';
      } else if (query.includes('licencia') || query.includes('constru') || query.includes('curadur') || query.includes('planea')) {
        replyText = 'Gestionamos y radicamos licencias de construcción, subdivisiones, reconocimientos y loteos ante la secretaría de Planeación de Mosquera de manera ágil y técnica. ¿Su proyecto es para obra nueva o ampliación?';
      } else if (query.includes('contacto') || query.includes('telefono') || query.includes('whatsapp') || query.includes('celular') || query.includes('numero') || query.includes('318')) {
        replyText = 'Claro que sí, puede contactarnos directamente por llamada telefónica o WhatsApp haciendo clic en el botón verde flotante de WhatsApp o marcando al +57 318 8863420.';
      } else if (query.includes('comprar') || query.includes('vender') || query.includes('propiedad') || query.includes('casa') || query.includes('arriendo') || query.includes('lote')) {
        replyText = 'Ofrecemos asesoría premium de corretaje inmobiliario en Mosquera y toda Sabana de Bogotá (Club Serrezuela, Hacienda Alcalá, Novaterra, etc.). Con mucho gusto programamos una cita para conocer sus requerimientos.';
      } else {
        replyText = 'Con el mayor gusto. En Inversa Inmobiliaria nos especializamos en compra/venta, sucesiones, patrimonios de familia, licencias de construcción y consultorías inmobiliarias premium en Mosquera - Cundinamarca. ¿Desea hablar directamente por WhatsApp al +57 318 8863420?';
      }
      setChatMessages(prev => [...prev, { sender: 'assistant' as const, text: replyText }]);
    }, 750);
  };

  // MetaMask & Web3 Investment state
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [investmentStatus, setInvestmentStatus] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Auto-detect wallet connection safely if window.ethereum is present
    const checkConnectedWallet = async () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const ethereum = (window as any).ethereum;
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (err) {
          console.warn("Auto-detection of MetaMask handled gracefully:", err);
        }
      }
    };
    checkConnectedWallet();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const connectWallet = async () => {
    setIsConnectingWallet(true);
    setWalletError(null);
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setShowWalletModal(false);
        } else {
          setWalletError("No se encontraron cuentas activas de MetaMask.");
        }
      } else {
        throw new Error("MetaMask no está instalado en este navegador. Para la mejor experiencia Web3, te recomendamos descargar e instalar la extensión de MetaMask en Chrome, Firefox o Edge.");
      }
    } catch (err: any) {
      console.warn("MetaMask connection handled gracefully:", err);
      setWalletError(err.message || "No se pudo conectar a MetaMask. Por favor, asegúrese de que la extensión está instalada y desbloqueada.");
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const connectDemoWallet = () => {
    setIsConnectingWallet(true);
    setWalletError(null);
    setTimeout(() => {
      setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
      setIsConnectingWallet(false);
      setShowWalletModal(false);
    }, 600);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletError(null);
  };

  const handleSimulatedInvestment = (projectName: string) => {
    setInvestmentStatus("Iniciando transacción...");
    setTimeout(() => {
      setInvestmentStatus("Esperando firma del contrato inteligente de Inversa Inmobiliaria...");
      setTimeout(() => {
        setInvestmentStatus(`¡Excelente! Inversión en ${projectName} completada de manera exitosa. Hash: 0x9f5a...3c8d`);
      }, 1500);
    }, 1000);
  };

  const openPropertyDetails = (property: any, mode: 'details' | '360') => {
    setSelectedProperty(property);
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen bg-matte-black text-white selection:bg-gold/30">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-matte-black/95 backdrop-blur-md py-3 shadow-lg border-b border-white/5' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => scrollToSection('inicio')} className="flex items-center gap-3 group cursor-pointer">
            <Logo className="w-11 h-11 transition-transform duration-500 group-hover:rotate-12" />
            <div className="flex flex-col text-left">
              <span className="text-xl md:text-2xl font-display font-bold tracking-tight text-white group-hover:gold-text transition-colors leading-none">
                INVERSA
              </span>
              <span className="text-[10px] tracking-[0.25em] font-medium text-gold">
                INMOBILIARIA
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button onClick={() => scrollToSection('inicio')} className="nav-link text-gold cursor-pointer py-1">Inicio</button>
            <button onClick={() => scrollToSection('servicios')} className="nav-link cursor-pointer py-1">Servicios</button>
            <button onClick={() => scrollToSection('propiedades')} className="nav-link cursor-pointer py-1">Propiedades</button>
            <button onClick={() => scrollToSection('valores')} className="nav-link cursor-pointer py-1">Filosofía</button>
            <button onClick={() => scrollToSection('inversion')} className="nav-link cursor-pointer py-1">Inversión</button>
            <button onClick={() => scrollToSection('contacto')} className="nav-link cursor-pointer py-1">Contacto</button>
          </nav>

          {/* Header Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {walletAddress ? (
              <button 
                onClick={() => setShowWalletModal(true)}
                className="gold-outline-button flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-mono text-xs">
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </span>
              </button>
            ) : (
              <button 
                onClick={() => setShowWalletModal(true)}
                className="gold-button flex items-center gap-2"
              >
                <Wallet size={16} />
                <span>Conectar Wallet</span>
              </button>
            )}
            <button 
              onClick={() => setIsLoanModalOpen(true)}
              className="gold-outline-button flex items-center gap-2"
            >
              Solicitar Financiación
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-matte-black pt-24 px-4 lg:hidden"
          >
            <nav className="flex flex-col space-y-6 items-center text-center">
              <button onClick={() => { scrollToSection('inicio'); setIsMenuOpen(false); }} className="text-xl font-medium gold-text cursor-pointer">Inicio</button>
              <button onClick={() => { scrollToSection('servicios'); setIsMenuOpen(false); }} className="text-xl font-medium text-white hover:text-gold transition-colors cursor-pointer">Servicios</button>
              <button onClick={() => { scrollToSection('propiedades'); setIsMenuOpen(false); }} className="text-xl font-medium text-white hover:text-gold transition-colors cursor-pointer">Propiedades</button>
              <button onClick={() => { scrollToSection('valores'); setIsMenuOpen(false); }} className="text-xl font-medium text-white hover:text-gold transition-colors cursor-pointer">Filosofía</button>
              <button onClick={() => { scrollToSection('inversion'); setIsMenuOpen(false); }} className="text-xl font-medium text-white hover:text-gold transition-colors cursor-pointer">Inversión</button>
              <button onClick={() => { scrollToSection('contacto'); setIsMenuOpen(false); }} className="text-xl font-medium text-white hover:text-gold transition-colors cursor-pointer">Contacto</button>
              
              {walletAddress ? (
                <button 
                  onClick={() => { setShowWalletModal(true); setIsMenuOpen(false); }}
                  className="gold-outline-button w-full py-4 text-lg mt-4 flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-mono text-base">
                    {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 4)}
                  </span>
                </button>
              ) : (
                <button 
                  onClick={() => { setShowWalletModal(true); setIsMenuOpen(false); }}
                  className="gold-button w-full py-4 text-lg mt-4 flex items-center justify-center gap-2"
                >
                  <Wallet size={20} />
                  <span>Conectar Wallet</span>
                </button>
              )}

              <button 
                onClick={() => { setIsLoanModalOpen(true); setIsMenuOpen(false); }}
                className="gold-outline-button w-full py-4 text-lg"
              >
                Solicitar Financiación
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
              alt="Luxury Property" 
              className="w-full h-full object-cover scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-matte-black/75 via-matte-black/30 to-matte-black/95"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-4">
                INVERSIONES QUE GENERAN LEGADO
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                <span className="text-white">Inmobiliaria Premium</span><br />
                <span className="gold-text">Inversiones Inteligentes</span>
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed font-light">
                Descubra la nueva forma de generar patrimonio familiar en Mosquera y toda Cundinamarca con asesoría experta en negocios inmobiliarios de alto nivel.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <button 
                  onClick={() => scrollToSection('propiedades')}
                  className="gold-button px-10 py-4 text-lg min-w-[220px] shadow-lg shadow-gold/10"
                >
                  Explorar Propiedades
                </button>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="gold-outline-button px-10 py-4 text-lg min-w-[220px]"
                >
                  Nuestros Servicios
                </button>
              </div>
            </motion.div>
          </div>

          {/* Search Bar (Floating over Hero) */}
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 container mx-auto px-4 hidden md:block">
            <div className="glass-card p-6 md:p-8 rounded-xl shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Ubicación</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={18} />
                    <input 
                      type="text" 
                      defaultValue="Mosquera - Cundinamarca" 
                      placeholder="Selección Ubicación" 
                      className="w-full bg-white/10 border border-white/20 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Tipo de Inmueble</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={18} />
                    <select className="w-full bg-white/10 border border-white/20 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors appearance-none text-white">
                      <option>Todos los Tipos</option>
                      <option>Casa Campestre / Mansión</option>
                      <option>Apartamento Club House</option>
                      <option>Terreno de Expansión</option>
                      <option>Local Comercial</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Presupuesto</label>
                  <div className="relative">
                    <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={18} />
                    <select className="w-full bg-white/10 border border-white/20 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors appearance-none text-white">
                      <option>Cualquier Presupuesto</option>
                      <option>$100M - $500M COP</option>
                      <option>$500M - $1.500M COP</option>
                      <option>Más de $1.500M COP</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2 flex-grow">
                    <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Operación</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="status" className="accent-gold h-4 w-4" defaultChecked />
                        Comprar
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="status" className="accent-gold h-4 w-4" />
                        Invertir
                      </label>
                    </div>
                  </div>
                  <button onClick={() => scrollToSection('propiedades')} className="gold-button h-12 px-8 flex items-center justify-center gap-2 cursor-pointer">
                    <Search size={18} />
                    <span>Buscar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Search Bar Wrapper Spacer */}
        <div className="md:hidden pt-8 px-4">
          <div className="glass-card p-4 rounded-lg space-y-4">
             <input 
                type="text" 
                placeholder="Ubicación" 
                className="w-full bg-white/10 border border-white/20 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold"
              />
              <button className="gold-button w-full py-3 flex items-center justify-center gap-2">
                <Search size={18} />
                <span>Buscar</span>
              </button>
          </div>
        </div>

        {/* Featured Properties Section */}
        <section id="propiedades" className="py-24 md:py-32 container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="gold-text uppercase tracking-widest text-sm font-bold">Nuestras Propiedades</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Inmuebles Premium Destacados</h2>
            </div>
            <button className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors font-medium">
              Ver todos los listados <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#151515] border border-white/5 rounded-sm overflow-hidden hover:border-gold/30 transition-all duration-500"
              >
                {/* Status Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gold text-matte-black text-[10px] font-bold px-3 py-1 rounded-sm">
                    {property.status}
                  </span>
                </div>
                
                {/* Favorite */}
                <button className="absolute top-4 right-4 z-10 p-2 bg-matte-black/40 backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors">
                  <Heart size={18} />
                </button>

                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 to-transparent"></div>
                  
                  {/* Interactive Overlays */}
                  <div className="absolute inset-0 bg-matte-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button 
                       onClick={() => openPropertyDetails(property, 'details')}
                       className="w-12 h-12 rounded-full bg-gold text-matte-black flex items-center justify-center hover:scale-110 transition-transform"
                       title="Ver Detalles"
                    >
                      <Info size={20} />
                    </button>
                    <button 
                       onClick={() => openPropertyDetails(property, '360')}
                       className="w-12 h-12 rounded-full bg-white text-matte-black flex items-center justify-center hover:scale-110 transition-transform"
                       title="Tour 360"
                    >
                      <Orbit size={20} />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span className="text-2xl font-bold font-display">{property.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:gold-text transition-colors">{property.name}</h3>
                  <div className="flex items-center gap-2 text-white/50 text-sm mb-6">
                    <MapPin size={14} className="text-gold" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Bed size={18} className="text-gold/60" />
                        <span className="text-sm font-medium">{property.beds} camas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath size={18} className="text-gold/60" />
                        <span className="text-sm font-medium">{property.baths} baños</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Nuestros Servicios Section (From Image 2) */}
        <section id="servicios" className="py-24 bg-[#0a0a0a] border-t border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="gold-text uppercase tracking-[0.2em] text-xs font-bold">NUESTRO PORTAFOLIO</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Servicios Inmobiliarios & Jurídicos Premium</h2>
              <div className="h-[2px] w-24 bg-gold mx-auto mt-4"></div>
              <p className="text-white/60 font-light text-sm md:text-base leading-relaxed pt-2">
                En Inversa Capital, acompañamos cada decisión de su legado patrimonial. Ofrecemos asesoramiento integral combinando experiencia legal, técnica e inmobiliaria.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Servicio 1: Compra y Venta */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-[#121212] border border-white/5 rounded-sm p-8 group hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 border border-gold/20 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                  <Building2 size={26} />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:gold-text transition-colors">COMPRA Y VENTA DE INMUEBLES</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  Elegancia, rigor y precisión en cada transacción comercial. Brindamos las mejores alternativas residenciales, campestres y comerciales en Mosquera, Cundinamarca y alrededores.
                </p>
              </motion.div>

              {/* Servicio 2: Patrimonios de Familia */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-[#121212] border border-white/5 rounded-sm p-8 group hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 border border-gold/20 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                  <Heart size={26} />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:gold-text transition-colors">PATRIMONIOS DE FAMILIA</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  Protección jurídica integral para su hogar. Guiamos la constitución y cancelación de gravámenes familiares para resguardar formalmente lo que más valora.
                </p>
              </motion.div>

              {/* Servicio 3: Sucesiones */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-[#121212] border border-white/5 rounded-sm p-8 group hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 border border-gold/20 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                  <MapPin size={26} />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:gold-text transition-colors">SUCESIONES</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  Acompañamiento legal humano y riguroso. Tramitamos la partición y adjudicación de herencias de manera amigable o notarial, reduciendo tiempos y cargas emocionales.
                </p>
              </motion.div>

              {/* Servicio 4: Licencias de Construcción */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-[#121212] border border-white/5 rounded-sm p-8 group hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 border border-gold/20 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                  <Calculator size={26} />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:gold-text transition-colors">LICENCIAS DE CONSTRUCCIÓN</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  Asesoría técnica y radicación exitosa. Gestionamos licencias de obra nueva, ampliaciones, subdivisiones, loteos y reconocimientos ante planeación municipal y curadurías urbanas.
                </p>
              </motion.div>

              {/* Servicio 5: Asesorías Inmobiliarias */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-[#121212] border border-white/5 rounded-sm p-8 group hover:border-gold/30 transition-all duration-300 col-span-1 md:col-span-2 lg:col-span-1 mx-auto max-w-md lg:max-w-none"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 border border-gold/20 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                  <ChevronDown size={26} />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:gold-text transition-colors">ASESORÍAS INMOBILIARIAS</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  Consultoría estratégica de alto nivel. Respuestas jurídicas claras sobre impuestos prediales, valoración de activos y estructuración de negocios inmobiliarios inteligentes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores Section */}
        <section id="valores" className="py-24 bg-[#050505] relative overflow-hidden">
          {/* Subtle design blur */}
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold">CULTURA CORPORATIVA</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Nuestros Pilares Fundamentales</h2>
              <div className="h-[2px] w-16 bg-gold mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Integridad */}
              <div className="bg-matte-black border border-white/5 rounded-sm p-8 hover:border-gold/20 transition-colors">
                <span className="text-gold font-mono text-2xl font-bold block mb-4">01</span>
                <h3 className="text-xl font-bold mb-3 text-white">INTEGRIDAD</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light font-sans">
                  Conducimos cada transacción comercial y proceso legal con absoluta honestidad, ética inquebrantable y total transparencia para su completa seguridad jurídica.
                </p>
              </div>

              {/* Innovación */}
              <div className="bg-matte-black border border-white/5 rounded-sm p-8 hover:border-gold/20 transition-colors">
                <span className="text-gold font-mono text-2xl font-bold block mb-4">02</span>
                <h3 className="text-xl font-bold mb-3 text-white">INNOVACIÓN</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light font-sans">
                  Adoptamos herramientas modernas de inversión fraccional, blockchain y digitalización 360 para llevar los negocios inmobiliarios tradicionales al siguiente nivel.
                </p>
              </div>

              {/* Cercanía */}
              <div className="bg-matte-black border border-white/5 rounded-sm p-8 hover:border-gold/20 transition-colors">
                <span className="text-gold font-mono text-2xl font-bold block mb-4">03</span>
                <h3 className="text-xl font-bold mb-3 text-white">CERCANÍA</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light font-sans">
                  Brindamos un trato altamente personalizado, empático y profesional. Sus metas son de nuestra absoluta prioridad, facilitando soluciones fluidas a cada necesidad familiar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Cards Section (Financing & Investment Portal) */}
        <section id="inversion" className="py-24 bg-[#0e0e0e] border-t border-white/5">
          <div className="container mx-auto px-4 max-w-5xl text-center mb-16 space-y-4">
            <span className="gold-text uppercase tracking-widest text-xs font-bold">PORTAL FINANCIERO</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Inversión Inteligente & Financiación</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">Use nuestras herramientas digitales para simular préstamos inmediatos o explore la innovación tecnológica Web3 aplicada a propiedades reales.</p>
          </div>
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card Left: Financing */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative h-[420px] rounded-sm overflow-hidden group border border-white/5"
            >
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" 
                alt="Financiación" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="text-3xl font-display font-bold mb-4">
                  <span className="gold-text">Financiación Premium</span><br />
                  & Hipotecas Corporativas
                </h3>
                <button 
                  onClick={() => setIsLoanModalOpen(true)}
                  className="gold-button px-8 py-3 flex items-center gap-2 group/btn cursor-pointer"
                >
                  Calcular Préstamo Inmobiliario
                  <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Card Right: Investments */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative h-[420px] rounded-sm overflow-hidden group border border-white/5"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                alt="Inversiones" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-80"
                referrerPolicy="no-referrer"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="text-3xl font-display font-bold mb-4 italic">
                  Inversiones Inteligentes<br />
                  con Tecnología Web3
                </h3>
                <button 
                  onClick={() => setIsInvestModalOpen(true)}
                  className="gold-button px-8 py-3 flex items-center gap-2 group/btn cursor-pointer"
                >
                  Consultar Fraccionados Blockchain
                  <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {isLoanModalOpen && (
          <Modal 
            isOpen={isLoanModalOpen} 
            onClose={() => setIsLoanModalOpen(false)} 
            title="Opciones de Préstamo e Hipotecas"
          >
            <LoanCalculator />
          </Modal>
        )}

        {/* Modal: MetaMask / Web3 Wallet Connection */}
        {showWalletModal && (
          <Modal
            isOpen={showWalletModal}
            onClose={() => { setShowWalletModal(false); setWalletError(null); }}
            title="Conexión de Billetera Digital"
          >
            <div className="space-y-6 text-center py-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                  <Wallet size={32} />
                </div>
              </div>
              
              {walletAddress ? (
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-sm border border-white/5 font-mono text-sm break-all">
                    <span className="text-white/40 block text-xs uppercase mb-1">Dirección Conectada</span>
                    {walletAddress}
                  </div>
                  <p className="text-sm text-green-400 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    MetaMask Conectado Exitosamente
                  </p>
                  <button 
                    onClick={disconnectWallet}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-3 rounded-sm font-semibold transition-all cursor-pointer"
                  >
                    Desconectar Billetera
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    Conecte su billetera de MetaMask para acceder a la plataforma de inversiones fraccionales de Inversa Inmobiliaria en la Blockchain.
                  </p>

                  {walletError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-sm text-left leading-relaxed">
                      <strong>Información de Conectividad:</strong> {walletError}
                    </div>
                  )}

                  <div className="grid gap-3 pt-2">
                    <button 
                      onClick={connectWallet}
                      disabled={isConnectingWallet}
                      className="gold-button w-full flex items-center justify-center gap-2 h-14 cursor-pointer"
                    >
                      {isConnectingWallet ? (
                        <>
                          <span className="w-5 h-5 border-2 border-matte-black border-t-transparent rounded-full animate-spin"></span>
                          <span>Conectando con MetaMask...</span>
                        </>
                      ) : (
                        <>
                          <Wallet size={20} />
                          <span>Conectar con MetaMask</span>
                        </>
                      )}
                    </button>

                    <div className="text-xs text-white/40 my-2">O bien, para propósitos de demostración en este ambiente de pruebas:</div>

                    <button 
                      onClick={connectDemoWallet}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-sm border border-white/15 transition-all text-sm cursor-pointer"
                    >
                      Utilizar Billetera de Pruebas (Simulado)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        )}

        {/* Modal: Tokenized Smart Real Estate Investments */}
        {isInvestModalOpen && (
          <Modal
            isOpen={isInvestModalOpen}
            onClose={() => { setIsInvestModalOpen(false); setInvestmentStatus(null); }}
            title="Inversiones Inteligentes Tokenizadas"
          >
            <div className="space-y-6">
              <div className="text-center pb-2">
                <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto">
                  Invierta de forma segura en bienes raíces premium fraccionados mediante contratos inteligentes respaldados por propiedades físicas de Inversa Inmobiliaria.
                </p>
              </div>

              {/* Connected Status Card */}
              <div className="bg-white/5 border border-white/10 rounded-sm p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${walletAddress ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <div className="text-left">
                    <span className="text-xs text-white/40 block">Estado de Billetera</span>
                    <span className="text-sm font-semibold">
                      {walletAddress ? 'MetaMask Conectado' : 'MetaMask Desconectado'}
                    </span>
                  </div>
                </div>
                {!walletAddress ? (
                  <button 
                    onClick={() => setShowWalletModal(true)}
                    className="gold-button text-xs py-2 px-4 flex items-center gap-1 cursor-pointer"
                  >
                    <Wallet size={12} />
                    Conectar
                  </button>
                ) : (
                  <div className="font-mono text-xs text-gold">
                    {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 4)}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-white/40">Proyectos Disponibles</h4>
                
                {/* Project 1 */}
                <div className="bg-[#1a1a1a] border border-white/5 rounded-sm p-4 hover:border-gold/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-bold text-base text-white">Santara Heights Premium Towers</h5>
                      <span className="text-xs text-white/50">Samcailonto Luxury Zone</span>
                    </div>
                    <span className="bg-gold/10 border border-gold/30 text-gold text-xs font-bold px-2.5 py-0.5 rounded-sm">
                      14.5% APR
                    </span>
                  </div>
                  <p className="text-white/70 text-xs mb-4 leading-relaxed">
                    Edificio habitacional de lujo con diseño inteligente. Tokenizado y respaldado por renta directa de inquilinos premium.
                  </p>
                  <div className="flex justify-between items-center text-xs text-white/50 border-t border-white/5 pt-3">
                    <span>Inversión Mínima: <strong className="text-white">$1,000 USDT</strong></span>
                    {walletAddress ? (
                      <button 
                        onClick={() => handleSimulatedInvestment("Santara Heights Premium Towers")}
                        className="gold-button text-xs py-1.5 px-4 h-auto rounded-sm cursor-pointer"
                      >
                        Invertir con MetaMask
                      </button>
                    ) : (
                      <button 
                        onClick={() => setShowWalletModal(true)}
                        className="gold-outline-button text-xs py-1.5 px-4 h-auto rounded-sm cursor-pointer"
                      >
                        Conectar para invertir
                      </button>
                    )}
                  </div>
                </div>

                {/* Project 2 */}
                <div className="bg-[#1a1a1a] border border-white/5 rounded-sm p-4 hover:border-gold/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-bold text-base text-white">Villa Samcailonto Fractional Shares</h5>
                      <span className="text-xs text-white/50">Exclusiva Zona Residencial</span>
                    </div>
                    <span className="bg-gold/10 border border-gold/30 text-gold text-xs font-bold px-2.5 py-0.5 rounded-sm">
                      12.8% APR
                    </span>
                  </div>
                  <p className="text-white/70 text-xs mb-4 leading-relaxed">
                    Proyecto turístico vacacional de alto rendimiento. Fracciones respaldadas por escritura pública tokenizada.
                  </p>
                  <div className="flex justify-between items-center text-xs text-white/50 border-t border-white/5 pt-3">
                    <span>Inversión Mínima: <strong className="text-white">0.5 ETH</strong></span>
                    {walletAddress ? (
                      <button 
                        onClick={() => handleSimulatedInvestment("Villa Samcailonto Fractional Shares")}
                        className="gold-button text-xs py-1.5 px-4 h-auto rounded-sm cursor-pointer"
                      >
                        Invertir con MetaMask
                      </button>
                    ) : (
                      <button 
                        onClick={() => setShowWalletModal(true)}
                        className="gold-outline-button text-xs py-1.5 px-4 h-auto rounded-sm cursor-pointer"
                      >
                        Conectar para invertir
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Investment Status Banner */}
              {investmentStatus && (
                <div className="bg-gold/10 border border-gold/25 text-gold p-4 rounded-sm text-sm flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold animate-ping"></div>
                  <p className="font-semibold">{investmentStatus}</p>
                </div>
              )}
            </div>
          </Modal>
        )}

        {selectedProperty && (
          <Modal
            isOpen={!!selectedProperty}
            onClose={() => setSelectedProperty(null)}
            title={viewMode === '360' ? `Tour 360°: ${selectedProperty.name}` : `Detalles: ${selectedProperty.name}`}
          >
            {viewMode === 'details' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-display font-bold gold-text">{selectedProperty.price}</span>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                      <Bed size={16} className="text-gold" />
                      <span className="text-sm">{selectedProperty.beds}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                      <Bath size={16} className="text-gold" />
                      <span className="text-sm">{selectedProperty.baths}</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-white/70 leading-relaxed italic">
                    "{selectedProperty.description || 'Una propiedad excepcional con acabados de primera clase y diseño contemporáneo.'}"
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-white/40">Características</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {(selectedProperty.features || ['Piscina', 'Terraza', 'Gimnasio', 'Seguridad']).map((f: string) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex gap-4">
                  <button className="gold-button flex-grow">Solicitar Visita</button>
                  <button 
                    onClick={() => setViewMode('360')}
                    className="gold-outline-button px-4"
                  >
                    <Orbit size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative aspect-video bg-matte-black rounded-sm overflow-hidden border border-white/10 group">
                  <img 
                    src={selectedProperty.image} 
                    alt="360 view" 
                    className="w-full h-full object-cover blur-sm opacity-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="mb-4 text-gold/40"
                    >
                      <Orbit size={64} />
                    </motion.div>
                    <h4 className="text-2xl font-display font-bold mb-2">Simulador Tour 360°</h4>
                    <p className="text-white/50 text-sm max-w-xs">
                      Estamos preparando la experiencia inmersiva para esta propiedad. Deslice para navegar por los interiores.
                    </p>
                    <button className="mt-6 px-6 py-2 border border-gold/50 text-gold text-xs rounded-full uppercase tracking-widest hover:bg-gold hover:text-matte-black transition-colors">
                      Iniciar Experiencia VR
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setViewMode('details')}
                  className="w-full py-3 text-white/40 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
                >
                  Regresar a Detalles <ArrowRight size={14} />
                </button>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>

      {/* Botón flotante de WhatsApp */}
      <div className="fixed bottom-8 left-8 z-[90] flex flex-col items-start group">
        {/* Tooltip banner */}
        <div className="absolute left-0 bottom-20 bg-matte-black/95 border border-gold/40 text-gold text-xs font-semibold px-4 py-2 rounded-md shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
          ¿Desea asesoría por WhatsApp? +57 318 8863420
        </div>
        <a 
          href="https://wa.me/573188863420?text=Hola,%20quisiera%20recibir%20asesor%C3%ADa%20sobre%20Inversa%20Capital"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative"
          id="whatsapp-trigger"
        >
          {/* Pulsing visual circles */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10 group-hover:scale-110"></span>
          <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 1.887.513 3.652 1.4 5.176l-1.393 5.09 5.2-.132A9.957 9.957 0 0 0 12 22c5.523 0 10-4.517 10-10.017C22 6.484 17.522 2 12 2Zm-1.895 13.911c-.426-.017-1.104-.336-1.428-.654-1.121-1.09-1.921-2.47-2.316-4.01-.157-.611-.122-1.228.102-1.802.264-.67.752-1.2 1.341-1.458.188-.083.407-.123.61-.115.175.006.347.042.502.108.307.13.56.346.726.623.238.402.482.809.73 1.21.144.234.195.514.14.787-.058.286-.228.536-.474.697-.221.145-.445.286-.67.425a17.472 17.472 0 0 0 .546 1.054c.299.492.65.945 1.05 1.353l.366-.35a3.86 3.86 0 0 1 .536-.454.773.773 0 0 1 .806.012c.381.25.766.495 1.151.74.225.143.344.397.311.661a.81.81 0 0 1-.365.556c-.521.365-1.168.52-1.8.423a4.707 4.707 0 0 1-1.444-.658Z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      {/* IA Chatbot */}
      <div className="fixed bottom-8 right-8 z-[80] flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 w-85 glass-card rounded-2xl overflow-hidden shadow-2xl p-6 border border-gold/30"
            >
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Logo className="w-7 h-7" />
                 </div>
                 <div className="text-left">
                    <h4 className="font-bold text-sm text-white">Inversa Inmobiliaria AI</h4>
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> En línea
                    </span>
                 </div>
              </div>

              {/* Message bubbles list */}
              <div className="h-48 overflow-y-auto space-y-3 mb-4 pr-1 text-xs text-left scrollbar-thin">
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-md leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-gold/10 border border-gold/20 text-white ml-auto max-w-[85%] text-right' 
                        : 'bg-white/5 border border-white/5 text-white/90 mr-auto max-w-[85%]'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Interactive suggestion chips */}
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                <button 
                  onClick={() => sendChatMessage("Asesoría en Patrimonios y Sucesiones")}
                  className="bg-white/[0.04] hover:bg-gold/10 hover:text-gold text-[10px] text-left p-1.5 rounded border border-white/5 transition-all text-white/70"
                >
                  ⚖️ Patrimonios & Sucesiones
                </button>
                <button 
                  onClick={() => sendChatMessage("Licencias de construcción")}
                  className="bg-white/[0.04] hover:bg-gold/10 hover:text-gold text-[10px] text-left p-1.5 rounded border border-white/5 transition-all text-white/70"
                >
                  🏗️ Licencias de obra/lotes
                </button>
                <button 
                  onClick={() => sendChatMessage("Ver propiedades en Mosquera")}
                  className="bg-white/[0.04] hover:bg-gold/10 hover:text-gold text-[10px] text-left p-1.5 rounded border border-white/5 transition-all text-white/70"
                >
                  🏡 Inmuebles Destacados
                </button>
                <button 
                  onClick={() => sendChatMessage("Llamar al teléfono de soporte")}
                  className="bg-white/[0.04] hover:bg-gold/10 hover:text-gold text-[10px] text-left p-1.5 rounded border border-white/5 transition-all text-white/70"
                >
                  📞 Contacto Directo
                </button>
              </div>
              
              <div className="flex gap-2 border-t border-white/5 pt-3">
                <input 
                  type="text" 
                  value={chatInputValue} 
                  onChange={(e) => setChatInputValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { sendChatMessage(chatInputValue); } }}
                  placeholder="Escriba su consulta..." 
                  className="flex-grow bg-white/10 border border-white/20 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-gold text-white"
                />
                <button 
                  onClick={() => sendChatMessage(chatInputValue)}
                  className="gold-button px-4 py-2 text-xs font-bold cursor-pointer"
                >
                  Enviar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 rounded-full bg-gold text-matte-black shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative"
          id="chat-toggle"
        >
          {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white border-2 border-gold rounded-full flex items-center justify-center text-[10px] font-bold text-matte-black">
              1
            </span>
          )}
        </button>
      </div>

      {/* Footer */}
      <footer id="contacto" className="bg-matte-black pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-center md:text-left">
            {/* Brands and Logo */}
            <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
               <div className="flex items-center gap-3">
                  <Logo className="w-12 h-12" />
                  <div className="flex flex-col text-left">
                    <span className="text-2xl font-display font-bold text-white leading-none">INVERSA</span>
                    <span className="text-[10px] tracking-[0.25em] font-medium text-gold">INMOBILIARIA</span>
                  </div>
                </div>
                <p className="text-white/50 text-sm max-w-xs leading-relaxed font-light">
                  Inversiones que generan legado. Especialistas en corretaje premium, patrimonios de familia, sucesiones, licencias de construcción y consultoría integral.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a href="#" className="p-3 bg-white/5 hover:bg-gold hover:text-matte-black transition-all rounded-full"><Facebook size={18} /></a>
                  <a href="#" className="p-3 bg-white/5 hover:bg-gold hover:text-matte-black transition-all rounded-full"><Twitter size={18} /></a>
                  <a href="#" className="p-3 bg-white/5 hover:bg-gold hover:text-matte-black transition-all rounded-full"><Instagram size={18} /></a>
                </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6 flex flex-col justify-start md:items-start">
              <h4 className="font-bold text-lg text-white">Navegación</h4>
              <ul className="space-y-3 text-center md:text-left flex flex-col items-center md:items-start">
                <li><button onClick={() => scrollToSection('inicio')} className="text-white/60 hover:text-gold transition-colors text-sm cursor-pointer">Inicio</button></li>
                <li><button onClick={() => scrollToSection('servicios')} className="text-white/60 hover:text-gold transition-colors text-sm cursor-pointer">Servicios Premium</button></li>
                <li><button onClick={() => scrollToSection('propiedades')} className="text-white/60 hover:text-gold transition-colors text-sm cursor-pointer">Propiedades</button></li>
                <li><button onClick={() => scrollToSection('valores')} className="text-white/60 hover:text-gold transition-colors text-sm cursor-pointer">Nuestros Pilares</button></li>
                <li><button onClick={() => scrollToSection('inversion')} className="text-white/60 hover:text-gold transition-colors text-sm cursor-pointer">Préstamos e Inversión</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-white">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 justify-center md:justify-start">
                  <Phone size={18} className="text-gold" />
                  <a href="tel:+573188863420" className="text-sm text-white/65 hover:text-gold transition-colors">+57 318 8863420</a>
                </li>
                <li className="flex items-center gap-4 justify-center md:justify-start">
                  <Mail size={18} className="text-gold" />
                  <a href="mailto:contacto@inversacapital.com" className="text-sm text-white/65 hover:text-gold transition-colors">contacto@inversacapital.com</a>
                </li>
                <li className="flex items-center gap-4 justify-center md:justify-start">
                  <MapPin size={18} className="text-gold" />
                  <span className="text-sm text-white/60">Mosquera - Cundinamarca, Colombia</span>
                </li>
              </ul>
            </div>

            {/* Site Map */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg text-white">Cobertura Legal</h4>
              <div className="grid grid-cols-1 gap-y-3 text-white/60 text-xs">
                <span>• Sabana de Bogotá Occidente</span>
                <span>• Curadurías de Cundinamarca</span>
                <span>• Registro Civil y Notariado</span>
                <span>• Constitución de Afectación Vivienda</span>
                <span>• Tramitación de Sucesiones</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} Inversa Inmobiliaria. Todos los derechos reservados. Inversiones que generan legado.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/30 hover:text-white transition-colors text-xs">Términos y Condiciones</a>
              <a href="#" className="text-white/30 hover:text-white transition-colors text-xs">Protección de Datos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
