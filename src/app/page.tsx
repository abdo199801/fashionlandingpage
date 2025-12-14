// src/app/page.tsx
'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Heart, Star, ShoppingBag, Clock, Users, Award,
  MessageCircle, ChevronDown, Send, ArrowRight, CheckCircle,
  Phone, Mail, MapPin, Menu, X, Facebook, Instagram, Youtube,
  Briefcase, ChevronRight, Check, Truck, TrendingUp,
  Gem, Crown, Flower, Calendar, Quote,
  ShoppingCart, Package, Gift as GiftIcon,
  Tag, Percent, CreditCard, Shield,
  Camera, Music, Palette, Scissors,
  Zap, Target, Globe, BarChart, PieChart
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  date: string;
  time: string;
  stylist: string;
  preferences: string;
  message: string;
}

interface Category {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  image: string;
  price: string;
  items: string;
}

interface Collection {
  name: string;
  description: string;
  highlights: string[];
  pieces: string;
  price: string;
  icon: React.ReactNode;
  image: string;
}

interface Stylist {
  name: string;
  specialty: string;
  experience: string;
  certifications: string[];
  availability: string;
  description: string;
  specialties: string[];
  rating: number;
  image: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  purchase: string;
  duration: string;
  rating: number;
  image: string;
}

interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface Package {
  name: string;
  price: string;
  duration: string;
  features: string[];
  color: string;
  popular: boolean;
}

export default function FashionKenitra() {
  // State Management
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [activeCollection, setActiveCollection] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('basic');

  // Form State
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    date: '',
    time: '',
    stylist: '',
    preferences: '',
    message: ''
  });

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);

  // Images data - Using Unsplash fashion images
  const images = {
    hero: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    collection1: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    collection2: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    collection3: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80",
    stylist1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80",
    stylist2: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2127&q=80",
    stylist3: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=2134&q=80",
    dress1: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    dress2: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80",
    accessories: "https://images.unsplash.com/photo-1591369822095-925a4c2e3d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    boutique: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  };

  // Data
  const categories: Category[] = [
    {
      icon: <Gem className="w-8 h-8" />,
      title: 'Robes de Soirée',
      description: 'Collection exclusive de robes élégantes pour vos occasions spéciales.',
      features: ['Soirées', 'Mariages', 'Galas', 'Événements'],
      color: 'from-indigo-500 to-purple-600',
      image: images.dress1,
      price: 'À partir de 800DH',
      items: '50+ modèles'
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Prêt-à-Porter',
      description: 'Vêtements tendance pour votre garde-robe quotidienne.',
      features: ['Tendances 2024', 'Qualité premium', 'Styles variés', 'Confort'],
      color: 'from-teal-500 to-emerald-600',
      image: images.dress2,
      price: 'À partir de 300DH',
      items: '200+ articles'
    },
    {
      icon: <Tag className="w-8 h-8" />,
      title: 'Chaussures & Accessoires',
      description: 'Complétez votre look avec nos accessoires de luxe.',
      features: ['Chaussures', 'Sacs', 'Bijoux', 'Écharpes'],
      color: 'from-rose-500 to-pink-600',
      image: images.accessories,
      price: 'À partir de 250DH',
      items: '150+ accessoires'
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: 'Collection Haute Couture',
      description: 'Pièces uniques créées par nos designers locaux.',
      features: ['Sur mesure', 'Pièces uniques', 'Designers', 'Luxe'],
      color: 'from-amber-500 to-orange-600',
      image: images.collection2,
      price: 'Sur devis',
      items: 'Édition limitée'
    }
  ];

  const collections: Collection[] = [
    {
      name: 'Collection Printemps 2024',
      description: 'Inspirée par les couleurs vives et les motifs floraux du printemps marocain.',
      highlights: ['Tissus légers', 'Couleurs pastel', 'Motifs traditionnels', 'Coupes modernes'],
      pieces: '35 pièces',
      price: 'À partir de 450DH',
      icon: <Flower className="w-6 h-6" />,
      image: images.collection1
    },
    {
      name: 'Élégance Marocaine',
      description: 'Fusion parfaite entre tradition marocaine et design contemporain.',
      highlights: ['Broderies artisanales', 'Tissus nobles', 'Silhouettes élégantes', 'Détails précieux'],
      pieces: '20 pièces exclusives',
      price: 'À partir de 1200DH',
      icon: <Gem className="w-6 h-6" />,
      image: images.collection2
    },
    {
      name: 'Urban Chic',
      description: 'Style urbain sophistiqué pour la femme moderne de Kenitra.',
      highlights: ['Minimalisme', 'Confort', 'Polyvalence', 'Élégance discrète'],
      pieces: '40 pièces',
      price: 'À partir de 350DH',
      icon: <TrendingUp className="w-6 h-6" />,
      image: images.collection3
    }
  ];

  const stylists: Stylist[] = [
    {
      name: 'Fatima Zahra',
      specialty: 'Styliste Personnelle',
      experience: '8 ans d\'expérience',
      certifications: ['Design Mode', 'Conseil Image', 'Style Personnel'],
      availability: 'Lun-Sam, 10h-20h',
      description: 'Spécialiste en création d\'images personnelles et conseils de style.',
      specialties: ['Style personnel', 'Couleurs', 'Morphologie', 'Occasions spéciales'],
      rating: 4.9,
      image: images.stylist1
    },
    {
      name: 'Leila Benani',
      specialty: 'Designer de Mode',
      experience: '12 ans d\'expérience',
      certifications: ['Haute Couture', 'Design Textile', 'Patronage'],
      availability: 'Mar-Sam, 9h-19h',
      description: 'Créatrice de collections exclusives et consultante en tendances.',
      specialties: ['Création', 'Sur mesure', 'Tendances', 'Design'],
      rating: 4.8,
      image: images.stylist2
    },
    {
      name: 'Yasmine El Amrani',
      specialty: 'Consultante Shopping',
      experience: '6 ans d\'expérience',
      certifications: ['Shopping Personnel', 'Garde-robe', 'Budget'],
      availability: 'Lun-Ven, 11h-21h',
      description: 'Expert en shopping personnel et optimisation de garde-robe.',
      specialties: ['Shopping', 'Budget', 'Garde-robe', 'Essaies'],
      rating: 4.7,
      image: images.stylist3
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Khadija Alami',
      role: 'Cliente Fidèle',
      content: "La meilleure boutique de mode à Kenitra ! Les conseils de style sont impeccables et la qualité exceptionnelle.",
      purchase: 'Robe de mariée',
      duration: 'Cliente depuis 4 ans',
      rating: 5,
      image: 'KA'
    },
    {
      name: 'Nadia Bennani',
      role: 'Épouse de diplomate',
      content: "Pour toutes mes réceptions officielles, je ne fais confiance qu'à Élégance Kenitra. Leur service est irréprochable.",
      purchase: 'Tenue de gala',
      duration: 'Cliente depuis 2 ans',
      rating: 5,
      image: 'NB'
    },
    {
      name: 'Sara Mounir',
      role: 'Nouvelle cliente',
      content: "Premier achat et totalement conquise ! Le personnel est attentionné et les vêtements magnifiques.",
      purchase: 'Tenue de travail',
      duration: 'Cliente depuis 1 mois',
      rating: 5,
      image: 'SM'
    }
  ];

  const stats: Stat[] = [
    { value: '95%', label: 'Satisfaction Clients', icon: <Heart className="w-5 h-5" />, description: 'Taux de satisfaction' },
    { value: '3K+', label: 'Clients Heureux', icon: <Users className="w-5 h-5" />, description: 'Depuis notre ouverture' },
    { value: '5', label: 'Designers Talentueux', icon: <Award className="w-5 h-5" />, description: 'Experts en mode' },
    { value: '500+', label: 'Modèles Uniques', icon: <Sparkles className="w-5 h-5" />, description: 'Dans notre collection' },
    { value: '100%', label: 'Qualité', icon: <Check className="w-5 h-5" />, description: 'Garantie' },
    { value: '24h', label: 'Livraison', icon: <Truck className="w-5 h-5" />, description: 'À Kenitra' }
  ];

  const packages: Package[] = [
    {
      name: 'Découverte',
      price: '300DH',
      duration: '1 heure',
      features: ['Consultation style', 'Essayage 5 tenues', 'Conseils couleurs', 'Guide shopping'],
      color: 'from-slate-50 to-slate-100',
      popular: false
    },
    {
      name: 'Élégance',
      price: '600DH',
      duration: '2 heures',
      features: ['Audit garde-robe', 'Création looks', 'Shopping accompagné', 'Conseils accessoires'],
      color: 'from-indigo-50 to-purple-50',
      popular: true
    },
    {
      name: 'Prestige',
      price: '1200DH',
      duration: '4 heures',
      features: ['Style complet', 'Shopping VIP', 'Conseils événement', 'Suivi mensuel', 'Essentiels offerts'],
      color: 'from-amber-50 to-orange-50',
      popular: false
    }
  ];

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          occasion: '',
          date: '',
          time: '',
          stylist: '',
          preferences: '',
          message: ''
        });

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);

        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }

      } else {
        setSubmitStatus('error');
        console.error('Erreur lors de l\'envoi:', result.error);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = `Bonjour Élégance Kenitra,

Je souhaite prendre rendez-vous pour une consultation style.
Occasion : ${formData.occasion}
Date souhaitée : ${formData.date} ${formData.time}
Styliste : ${formData.stylist}
Préférences : ${formData.preferences}

Pourriez-vous me recontacter pour confirmer le rendez-vous ?
Cordialement,
${formData.name}
${formData.phone}`;
    window.open(`https://wa.me/212612345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 21; hour++) {
      for (const minute of ['00', '30']) {
        slots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }
    return slots;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50/30 text-slate-800 antialiased overflow-x-hidden">
      {/* Top Banner */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-2 px-4 text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="font-semibold">NOUVELLE COLLECTION :</span>
          </div>
          <span className="font-bold">Printemps-Été 2024 disponible maintenant</span>
          <span className="hidden sm:inline mx-2">•</span>
          <span>Livraison gratuite à Kenitra</span>
        </div>
      </motion.div>

      {/* Header */}
      <motion.header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 shadow-lg backdrop-blur-lg py-3' 
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('accueil')}
            >
              <div className={`w-12 h-12 rounded-2xl ${
                isScrolled 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600' 
                  : 'bg-white/20 backdrop-blur-sm'
              } flex items-center justify-center mr-3 shadow-lg`}>
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className={`text-xl font-bold ${isScrolled ? 'text-slate-900' : 'text-white'}`}>Élégance Kenitra</div>
                <div className={`text-lg font-light ${isScrolled ? 'text-purple-600' : 'text-white/90'}`}>Haute Couture & Prêt-à-Porter</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {['accueil', 'collections', 'categories', 'stylistes', 'témoignages', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`transition-colors font-light tracking-wide ${
                    isScrolled 
                      ? 'text-slate-700 hover:text-indigo-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              ))}
              
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-xl transition-all font-medium shadow-lg hover:shadow-indigo-200"
              >
                Prendre Rendez-vous
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium"
              >
                Rendez-vous
              </motion.button>
              
              <motion.button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className={`w-6 h-6 ${isScrolled ? 'text-slate-700' : 'text-white'}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isScrolled ? 'text-slate-700' : 'text-white'}`} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              className="fixed right-0 top-0 h-full w-64 bg-white shadow-2xl z-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
            >
              <div className="flex flex-col h-full pt-20 px-6 space-y-6">
                {['accueil', 'collections', 'categories', 'stylistes', 'témoignages', 'contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      scrollToSection(item);
                      setIsMobileMenuOpen(false);
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="text-lg text-slate-700 hover:text-indigo-600 transition-colors py-3 text-left border-b border-slate-100"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="accueil" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-transparent z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${images.hero})`
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-light mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Crown className="w-4 h-4 mr-2" />
                Excellence en mode depuis 2015
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                L&apos;art de
                <span className="block font-serif italic mt-2 text-amber-200">
                  s&apos;habiller
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Découvrez l&apos;élégance à la marocaine. Des créations uniques 
                qui célèbrent votre beauté naturelle et votre style personnel.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-2xl transition-all font-medium text-lg flex items-center justify-center group shadow-xl hover:shadow-indigo-200"
                >
                  <span>Prendre rendez-vous</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  onClick={() => scrollToSection('collections')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full hover:bg-white/20 transition-all font-medium text-lg"
                >
                  Voir les collections
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-sm border border-white/20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Meilleure boutique</div>
                      <div className="text-sm text-white/80">Kenitra 2023</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-10 -left-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center mr-3">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Livraison 24h</div>
                      <div className="text-xs text-white/80">À Kenitra</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-white/70" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-4 mx-auto group-hover:from-indigo-200 group-hover:to-purple-200 transition-all shadow-md">
                  <div className="text-indigo-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-light text-slate-900 mb-2 font-serif">{stat.value}</div>
                <div className="font-medium text-slate-700 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-500">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-light mb-4">
              Nos Univers
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 font-serif">
              Catégories exclusives
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos collections organisées par style et occasion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCategory(idx)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 group-hover:border-indigo-100 overflow-hidden">
                  {/* Category Image */}
                  <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center z-20 shadow-lg`}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-light text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors font-serif">
                    {category.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                    {category.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {category.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center text-slate-700 text-sm">
                        <Check className="w-4 h-4 text-indigo-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-light text-slate-900 font-serif">{category.price}</div>
                        <div className="text-sm text-slate-500">{category.items}</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('collections')}
                        className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-200 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-light mb-4">
              Nouvelles Collections
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 font-serif">
              Éditions limitées
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Des collections créées avec passion par nos designers marocains
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-2/3">
                  <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20" />
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${collections[activeCollection].image})`
                      }}
                    />
                    <div className="absolute bottom-8 left-8 z-30 text-white">
                      <div className="text-3xl font-light font-serif">{collections[activeCollection].name}</div>
                      <div className="text-lg opacity-90">{collections[activeCollection].pieces} • {collections[activeCollection].price}</div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/3">
                  <div className="space-y-4">
                    {collections.map((collection, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveCollection(idx)}
                        whileHover={{ x: 5 }}
                        className={`w-full text-left p-6 rounded-2xl transition-all ${
                          idx === activeCollection 
                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 shadow-lg' 
                            : 'bg-white hover:bg-slate-50 border border-slate-100'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                            idx === activeCollection ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {collection.icon}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 mb-1">{collection.name}</div>
                            <div className="text-sm text-slate-600">{collection.pieces} • {collection.price}</div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                {collections[activeCollection].highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="font-medium text-slate-900">{highlight}</div>
                    </div>
                    <p className="text-slate-600 text-sm">
                      {collections[activeCollection].description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stylists Section */}
      <section id="stylistes" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-light mb-4">
              Notre Équipe
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 font-serif">
              Experts en style
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Rencontrez nos stylistes passionnés, dédiés à révéler votre style unique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {stylists.map((stylist, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-slate-50 shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Stylist Image */}
                  <div className="h-64 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${stylist.image})` }}
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                        <span className="font-medium">{stylist.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-light text-slate-900 font-serif mb-1">{stylist.name}</h3>
                        <p className="text-indigo-600 font-medium">{stylist.specialty}</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">{stylist.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-slate-500 text-sm">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span>{stylist.experience}</span>
                      </div>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{stylist.availability}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {stylist.specialties.map((specialty, sIdx) => (
                        <span key={sIdx} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all font-medium hover:shadow-indigo-200"
                    >
                      Consulter avec {stylist.name.split(' ')[0]}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-600 text-sm font-light mb-4">
              Services
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 font-serif">
              Expériences shopping
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Des services personnalisés pour transformer votre expérience shopping
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-sm font-medium shadow-lg">
                      Plus Populaire
                    </div>
                  </div>
                )}
                
                <div className={`relative rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  pkg.popular ? 'border-2 border-amber-200' : 'border border-slate-100'
                } bg-gradient-to-b ${pkg.color}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-light text-slate-900 font-serif mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-light text-slate-900 mb-2 font-serif">{pkg.price}</div>
                    <div className="text-slate-600">{pkg.duration}</div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center">
                        <Check className="w-5 h-5 text-emerald-500 mr-3" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedPackage(pkg.name.toLowerCase());
                      scrollToSection('contact');
                    }}
                    className={`w-full py-3 rounded-full font-medium ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-200' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-200'
                    }`}
                  >
                    Choisir ce service
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="témoignages" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-light mb-4">
              Témoignages
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 font-serif">
              Leurs expériences
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez ce que nos clientes disent de leur expérience shopping
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
                  <div className="flex items-start mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xl mr-6">
                      {testimonials[activeTestimonial].image}
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-slate-900 font-serif">
                        {testimonials[activeTestimonial].name}
                      </h3>
                      <p className="text-indigo-600">{testimonials[activeTestimonial].role}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 text-indigo-200 mb-6">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                    </svg>
                  </div>
                  
                  <p className="text-xl text-slate-700 italic mb-8 leading-relaxed">
                    &quot;{testimonials[activeTestimonial].content}&quot;
                  </p>
                  
                  <div className="pt-8 border-t border-indigo-100">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-slate-500">Dernier achat</div>
                        <div className="font-medium text-slate-900">{testimonials[activeTestimonial].purchase}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Relation client</div>
                        <div className="font-medium text-slate-900">{testimonials[activeTestimonial].duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === activeTestimonial 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 w-8' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-light mb-4">
                Rendez-vous
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 font-serif">
                Votre style vous attend
              </h2>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Prenez rendez-vous pour une consultation personnalisée avec nos experts en style
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-6">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-1">Téléphone</h3>
                    <a href="tel:212612345678" className="text-xl text-slate-600 hover:text-indigo-600 transition-colors">
                      06 12 34 56 78
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Du lundi au samedi, 10h-20h</p>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mr-6">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-1">Email</h3>
                    <a href="mailto:contact@elegancekenitra.ma" className="text-xl text-slate-600 hover:text-indigo-600 transition-colors">
                      contact@elegancekenitra.ma
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-6">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-1">Boutique</h3>
                    <p className="text-xl text-slate-600">Avenue Hassan II, Kenitra</p>
                    <button className="text-sm text-indigo-600 hover:underline mt-1 flex items-center">
                      Voir sur la carte
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl">
                <h3 className="font-medium text-slate-900 mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Horaires d&apos;ouverture
                </h3>
                <div className="space-y-4">
                  {[
                    { day: 'Lundi - Vendredi', hours: '10h - 20h' },
                    { day: 'Samedi', hours: '10h - 19h' },
                    { day: 'Dimanche', hours: '11h - 18h' },
                    { day: 'Jours fériés', hours: 'Sur rendez-vous' }
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-indigo-100 last:border-0">
                      <span className="text-slate-600">{schedule.day}</span>
                      <span className="font-medium text-slate-900">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="06 12 34 56 78"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="occasion" className="block text-sm font-medium text-slate-700 mb-2">
                      Occasion *
                    </label>
                    <select
                      id="occasion"
                      value={formData.occasion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Sélectionnez</option>
                      <option value="mariage">Mariage</option>
                      <option value="soiree">Soirée / Gala</option>
                      <option value="quotidien">Tenue quotidienne</option>
                      <option value="travail">Tenue de travail</option>
                      <option value="autre">Autre occasion</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="stylist" className="block text-sm font-medium text-slate-700 mb-2">
                      Styliste (optionnel)
                    </label>
                    <select
                      id="stylist"
                      value={formData.stylist}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">Aucune préférence</option>
                      <option value="fatima">Fatima Zahra</option>
                      <option value="leila">Leila Benani</option>
                      <option value="yasmine">Yasmine El Amrani</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
                      Date souhaitée
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">
                      Horaire souhaité
                    </label>
                    <select
                      id="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionnez</option>
                      {generateTimeSlots().map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="preferences" className="block text-sm font-medium text-slate-700 mb-2">
                    Vos préférences de style
                  </label>
                  <textarea
                    id="preferences"
                    rows={3}
                    value={formData.preferences}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Couleurs préférées, style vestimentaire, budget..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    'Confirmer le rendez-vous'
                  )}
                </motion.button>
              </form>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600 mr-3" />
                    <div>
                      <span className="font-medium text-emerald-800">Demande confirmée !</span>
                      <p className="text-emerald-700 text-sm mt-1">
                        Nous vous contacterons dans les plus brefs délais pour finaliser votre rendez-vous.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div className="mt-8 pt-8 border-t border-indigo-100">
                <p className="text-sm text-slate-500 text-center mb-4">
                  Ou contactez-nous directement par WhatsApp
                </p>
                <motion.button
                  onClick={openWhatsApp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:shadow-lg transition-all font-medium flex items-center justify-center shadow-md hover:shadow-emerald-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Échanger sur WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-3 shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">Élégance Kenitra</div>
                  <div className="text-lg font-light text-purple-300">Haute Couture</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Votre destination de mode exclusive à Kenitra. 
                Des créations uniques qui célèbrent l&apos;élégance marocaine.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-6 text-white">Collections</h3>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-purple-300 transition-colors">Robes de soirée</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Prêt-à-porter</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Accessoires</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Haute couture</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Collection été</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Cadeaux & coffrets</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-6 text-white">Contact</h3>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-1 text-purple-400" />
                  <div>
                    <div>06 12 34 56 78</div>
                    <div className="text-sm text-slate-500 mt-1">Rendez-vous</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-1 text-purple-400" />
                  <div>contact@elegancekenitra.ma</div>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-purple-400" />
                  <div>Avenue Hassan II<br />Kenitra, Maroc</div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-6 text-white">Newsletter</h3>
              <p className="text-slate-400 text-sm mb-4">
                Recevez nos nouvelles collections et offres exclusives
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-r-lg hover:opacity-90 transition-opacity">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="text-sm text-slate-500">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Livraison gratuite à Kenitra</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Élégance Kenitra. Tous droits réservés.
              </p>
              <div className="flex space-x-6 text-sm text-slate-500">
                <a href="#" className="hover:text-purple-300 transition-colors">Mentions légales</a>
                <a href="#" className="hover:text-purple-300 transition-colors">CGV</a>
                <a href="#" className="hover:text-purple-300 transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-purple-300 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <motion.button
        onClick={() => scrollToSection('contact')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all group"
      >
        <Calendar className="w-7 h-7 text-white" />
        <span className="absolute -top-12 right-0 bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Rendez-vous
        </span>
      </motion.button>

      <AnimatePresence>
        {isScrolled && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
          >
            <ChevronDown className="w-5 h-5 text-white rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        onClick={openWhatsApp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.button>
    </div>
  );
}