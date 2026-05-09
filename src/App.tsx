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
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PROPERTIES = [
  {
    id: 1,
    status: 'EN VENTA',
    price: '$1,255,000',
    location: 'Sen Mardalc, Samcailonto',
    name: 'Clirneris - Santara',
    beds: 3,
    baths: 3,
    description: 'Residencia de ultra-lujo con acabados de mármol italiano y una vista panorámica impresionante de la bahía.',
    features: ['Piscina Infinita', 'Cava de Vinos', 'Domótica Total'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    status: 'EN VENTA',
    price: '$359,000',
    location: 'Locación, Aliventala',
    name: 'Chimere - Santara',
    beds: 3,
    baths: 3,
    description: 'Moderna casa familiar situada en una comunidad privada, ideal para el crecimiento y la seguridad de sus hijos.',
    features: ['Seguridad 24/7', 'Área de Juegos', 'Jardín Privado'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    status: 'EN VENTA',
    price: '$325,000',
    location: 'Locación, Anthellaria',
    name: 'Climarto - Santara',
    beds: 3,
    baths: 3,
    description: 'Apartamento de concepto abierto con luz natural abundante y diseño minimalista funcional.',
    features: ['Balcón Amplio', 'Cocina Integral', 'Gimnasio'],
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openPropertyDetails = (property: any, mode: 'details' | '360') => {
    setSelectedProperty(property);
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen bg-matte-black text-white selection:bg-gold/30">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-matte-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="relative flex items-center">
              <div className="relative flex flex-col items-center">
                <div className="flex items-baseline gap-1">
                   <Building2 className="text-gold w-8 h-8 mb-[-4px]" />
                   <span className="text-3xl font-display font-bold tracking-tighter gold-text">RVR</span>
                </div>
                <div className="h-[2px] w-full bg-gold/50 mt-[-2px]"></div>
                <span className="text-[10px] tracking-[0.3em] font-medium text-white/80 mt-1">VIZCARRA</span>
                <span className="text-[8px] tracking-[0.2em] font-light text-white/50">INMOBILIARIA</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="nav-link text-gold">Inicio</a>
            <a href="#" className="nav-link">Venta</a>
            <a href="#" className="nav-link">Arriendo</a>
            <a href="#" className="nav-link">Inversión & Préstamos</a>
            <a href="#" className="nav-link">Sobre Nosotros</a>
            <a href="#" className="nav-link">Contacto</a>
          </nav>

          {/* Header Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="gold-button flex items-center gap-2">
              Solicitar Financiación
            </button>
            <button className="p-2 text-white/80 hover:text-gold transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white"
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
              <a href="#" className="text-xl font-medium gold-text">Inicio</a>
              <a href="#" className="text-xl font-medium text-white">Venta</a>
              <a href="#" className="text-xl font-medium text-white">Arriendo</a>
              <a href="#" className="text-xl font-medium text-white">Inversión & Préstamos</a>
              <a href="#" className="text-xl font-medium text-white">Sobre Nosotros</a>
              <a href="#" className="text-xl font-medium text-white">Contacto</a>
              <button className="gold-button w-full py-4 text-lg mt-4">
                Solicitar Financiación
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
              alt="Luxury Property" 
              className="w-full h-full object-cover scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-matte-black/60 via-matte-black/20 to-matte-black/90"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                <span className="gold-text">Inmobiliaria e Inversiones:</span><br />
                Tu Futuro Inmobiliario Simplificado.
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                <button 
                  onClick={() => setIsLoanModalOpen(true)}
                  className="gold-button px-10 py-4 text-lg min-w-[220px]"
                >
                  Explorar Propiedades
                </button>
                <button 
                  onClick={() => setIsLoanModalOpen(true)}
                  className="gold-outline-button px-10 py-4 text-lg min-w-[220px]"
                >
                  Opciones de Préstamo
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
                      placeholder="Selección Ubicación" 
                      className="w-full bg-white/10 border border-white/20 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Tipo de Inmueble</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={18} />
                    <select className="w-full bg-white/10 border border-white/20 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option>Tipo de Inmueble</option>
                      <option>Apartamento</option>
                      <option>Casa</option>
                      <option>Terreno</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Rango de Precio</label>
                  <div className="relative">
                    <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={18} />
                    <select className="w-full bg-white/10 border border-white/20 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option>Rango de Precio</option>
                      <option>$0 - $100k</option>
                      <option>$100k - $500k</option>
                      <option>$500k+</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2 flex-grow">
                    <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Estado</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="status" className="accent-gold h-4 w-4" defaultChecked />
                        Venta
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="status" className="accent-gold h-4 w-4" />
                        Arriendo
                      </label>
                    </div>
                  </div>
                  <button className="gold-button h-12 px-8 flex items-center justify-center gap-2">
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
        <section className="py-24 md:py-32 container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="gold-text uppercase tracking-widest text-sm font-bold">Nuestras Propiedades</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Propiedades Destacadas</h2>
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

        {/* Dual Cards Section (Services) */}
        <section className="py-24 bg-[#050505]">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card Left: Financing */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative h-[450px] rounded-sm overflow-hidden group border border-white/5"
            >
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" 
                alt="Financiación" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <h3 className="text-4xl font-display font-bold mb-6">
                  <span className="gold-text">Financiación Global</span><br />
                  & Hipotecas
                </h3>
                <button 
                  onClick={() => setIsLoanModalOpen(true)}
                  className="gold-button px-8 py-3 flex items-center gap-2 group/btn"
                >
                  Calcula Tu Préstamo
                  <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Card Right: Investments */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative h-[450px] rounded-sm overflow-hidden group border border-white/5"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                alt="Inversiones" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-80"
                referrerPolicy="no-referrer"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <h3 className="text-4xl font-display font-bold mb-6 italic">
                  Inversiones<br />
                  Inteligentes
                </h3>
                <button className="gold-button px-8 py-3 flex items-center gap-2 group/btn">
                  Consultar Proyectos
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

      {/* IA Chatbot */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 w-80 glass-card rounded-2xl overflow-hidden shadow-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                    <Building2 className="text-matte-black" size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">RVR Asistente</h4>
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> En línea
                    </span>
                 </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Hola, soy el Asistente Virtual de RVR Vizcarra. ¿Buscas casa o financiación?
              </p>
              <div className="flex flex-col gap-2">
                <button className="bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-lg text-xs text-left">
                  Buscar propiedades en renta
                </button>
                <button className="bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-lg text-xs text-left">
                  Consultar opciones de crédito
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 rounded-full bg-gold text-matte-black shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative"
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
      <footer className="bg-matte-black pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-center md:text-left">
            {/* Brands and Logo */}
            <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
               <div className="flex items-center gap-1">
                  <Building2 className="text-gold w-10 h-10" />
                  <div className="flex flex-col">
                    <span className="text-3xl font-display font-bold gold-text">RVR</span>
                    <span className="text-[10px] tracking-[0.3em] font-medium text-white/80 -mt-1">VIZCARRA</span>
                  </div>
                </div>
                <p className="text-white/50 text-sm max-w-xs leading-relaxed">
                  Líderes en el mercado inmobiliario premium, ofreciendo soluciones integrales de vivienda e inversión.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a href="#" className="p-3 bg-white/5 hover:bg-gold hover:text-matte-black transition-all rounded-full"><Facebook size={18} /></a>
                  <a href="#" className="p-3 bg-white/5 hover:bg-gold hover:text-matte-black transition-all rounded-full"><Twitter size={18} /></a>
                  <a href="#" className="p-3 bg-white/5 hover:bg-gold hover:text-matte-black transition-all rounded-full"><Instagram size={18} /></a>
                </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-gold transition-colors text-sm">Inicio</a></li>
                <li><a href="#" className="text-white/60 hover:text-gold transition-colors text-sm">Venta</a></li>
                <li><a href="#" className="text-white/60 hover:text-gold transition-colors text-sm">Arriendo</a></li>
                <li><a href="#" className="text-white/60 hover:text-gold transition-colors text-sm">Inversión & Préstamos</a></li>
                <li><a href="#" className="text-white/60 hover:text-gold transition-colors text-sm">Sobre Nosotros</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 justify-center md:justify-start">
                  <Phone size={18} className="text-gold" />
                  <span className="text-sm text-white/60">+1 (125) 356 7893</span>
                </li>
                <li className="flex items-center gap-4 justify-center md:justify-start">
                  <Mail size={18} className="text-gold" />
                  <span className="text-sm text-white/60">inicio@rvrvizcarra.com</span>
                </li>
                <li className="flex items-center gap-4 justify-center md:justify-start">
                  <MapPin size={18} className="text-gold" />
                  <span className="text-sm text-white/60">Calle de Lujo 123, Santara</span>
                </li>
              </ul>
            </div>

            {/* Site Map */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Site Map</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <a href="#" className="text-white/60 hover:text-gold transition-colors text-xs">Contacto</a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors text-xs">Contact us</a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors text-xs">Sobre Nosotros</a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors text-xs">Diriario</a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors text-xs">Map</a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors text-xs">Maps</a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors text-xs">Distihuclon</a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors text-xs">Menia</a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors text-xs">Site Einota</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} RVR Vizcarra Inmobiliaria. Todos los derechos reservados.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/30 hover:text-white transition-colors text-xs">Términos y Condiciones</a>
              <a href="#" className="text-white/30 hover:text-white transition-colors text-xs">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
