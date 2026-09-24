import React, { useState } from 'react';
import { LOGO_URL } from '../data/initialData';
import { Screen, UserRole } from '../types';

interface WelcomeScreenProps {
  onSelectRole: (role: UserRole, targetScreen: Screen) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectRole }) => {
  const [selectedCity, setSelectedCity] = useState('Valledupar, Cesar');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const neighborhoods = [
    'Los Cortijos (Valledupar)',
    'La Nevada (Valledupar)',
    'San Joaquín (Valledupar)',
    'Fundadores (Valledupar)',
    'Doce de Octubre (Valledupar)',
    'Ciudadela 450 Años (Valledupar)',
  ];

  return (
    <div className="flex flex-col relative w-full bg-[#f9f9ff] min-h-screen">
      <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-8 pt-6">
        {/* Ambient Glow & Official Brand Logo */}
        <div className="relative w-full flex flex-col items-center pt-2 pb-6">
          <div className="absolute -top-6 w-48 h-48 bg-[#0fa76b]/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Official Brand Logo */}
          <div className="relative z-10 w-24 h-24 mb-3 rounded-full bg-white shadow-md flex items-center justify-center p-1 overflow-hidden border border-[#e8eeff]">
            <img
              alt="Click&Listo Logo Oficial"
              className="w-full h-full object-contain"
              src={LOGO_URL}
            />
          </div>

          {/* Brand Tagline & Warm Greeting */}
          <div className="text-center max-w-xs space-y-1.5 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#adf0a6]/60 text-[#326f34] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                storefront
              </span>
              Valledupar Conectada
            </span>
            <h1 className="font-headline-lg-mobile text-[24px] text-[#021b3d] tracking-tight font-extrabold leading-tight">
              Compra fácil, vida más simple
            </h1>
            <p className="font-body-md text-[14px] text-[#3d4a41] leading-relaxed">
              Tu tienda de confianza de Valledupar a un toque de distancia.
            </p>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="flex flex-col gap-4 w-full">
          {/* Card 1: Soy Vecino (Primary Experience) */}
          <div
            onClick={() => onSelectRole('vecino', 'login')}
            className="relative overflow-hidden bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] cursor-pointer border border-[#e8eeff]"
          >
            {/* Delight Accent Corner Badge */}
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-[#adf0a6]/30 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-start gap-4">
              {/* Visual Icon Avatar */}
              <div className="w-14 h-14 rounded-full bg-[#aff3a9]/40 flex-shrink-0 flex items-center justify-center text-[#006d43]">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shopping_bag
                </span>
              </div>
              {/* Content Area */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h2 className="text-[18px] text-[#021b3d] font-bold">Soy vecino</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#006d43]/10 text-[#006d43] text-[11px] font-bold">
                    Favorito
                  </span>
                </div>
                <p className="text-[12px] text-[#3d4a41] line-clamp-2 mb-3">
                  Pide tus víveres de la tienda de tu barrio, paga en efectivo, Nequi o pide fiado.
                </p>
                {/* Neighborhood Feature Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#e8eeff] text-[#021b3d]">
                    <span className="material-symbols-outlined text-[13px] text-[#006d43]">payments</span>
                    Efectivo o Nequi
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#e8eeff] text-[#021b3d]">
                    <span className="material-symbols-outlined text-[13px] text-[#db7a00]">menu_book</span>
                    Libreta de fiado
                  </span>
                </div>
                {/* Main Pill Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRole('vecino', 'login');
                  }}
                  className="w-full h-12 bg-[#0fa76b] hover:bg-[#006d43] active:bg-[#006d43] text-white rounded-full font-bold text-[16px] flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <span>Entrar como vecino</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Soy Tendero (Merchant Experience) */}
          <div
            onClick={() => onSelectRole('tendero', 'tendero')}
            className="relative overflow-hidden bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] cursor-pointer border border-[#e8eeff]"
          >
            <div className="flex items-start gap-4">
              {/* Merchant Icon */}
              <div className="w-14 h-14 rounded-full bg-[#dfe8ff] flex-shrink-0 flex items-center justify-center text-[#021b3d]">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  countertops
                </span>
              </div>
              {/* Content Area */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h2 className="text-[18px] text-[#021b3d] font-bold">Soy tendero</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#d7e3ff] text-[#3d4a41] text-[11px] font-bold">
                    Comercio
                  </span>
                </div>
                <p className="text-[12px] text-[#3d4a41] line-clamp-2 mb-3">
                  Gestiona tu inventario, controla pedidos en tiempo real y administra fiados.
                </p>
                {/* Store Metric Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#e8eeff] text-[#021b3d]">
                    <span className="material-symbols-outlined text-[13px] text-[#3d4a41]">inventory_2</span>
                    Inventario ágil
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#e8eeff] text-[#021b3d]">
                    <span className="material-symbols-outlined text-[13px] text-[#3d4a41]">monitoring</span>
                    Control diario
                  </span>
                </div>
                {/* Secondary Neutral Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRole('tendero', 'tendero');
                  }}
                  className="w-full h-12 bg-[#e8eeff] hover:bg-[#dfe8ff] active:bg-[#d7e3ff] text-[#021b3d] rounded-full font-bold text-[16px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <span>Acceso para tenderos</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Neighborhood Context & WhatsApp Support */}
        <div className="mt-6 flex flex-col items-center gap-2 w-full">
          {/* Location Switcher Pill */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs text-[#021b3d] text-[12px] active:bg-[#e8eeff] transition-colors border border-[#dfe8ff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006d43]" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <span className="font-bold">{selectedCity}</span>
            <span className="text-[#3d4a41] text-[12px]">• Cambiar</span>
          </button>

          {/* WhatsApp Support & Trust Helper */}
          <a
            className="inline-flex items-center gap-1.5 text-[#3d4a41] hover:text-[#006d43] transition-colors py-1 cursor-pointer"
            href="https://wa.me/573012345678?text=Hola%20Click%26Listo%2C%20tengo%20una%20pregunta%20sobre%20mi%20tienda%20en%20Valledupar"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[16px] text-[#0fa76b]" style={{ fontVariationSettings: "'FILL' 1" }}>
              chat
            </span>
            <span className="text-[12px]">¿Dudas con tu pedido? Escríbenos por WhatsApp</span>
          </a>

          {/* Local Community Stamp */}
          <p className="text-[11px] font-bold text-[#6d7a70] tracking-wider uppercase mt-1 text-center">
            Impulsando el comercio del barrio vallenato
          </p>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-xl border border-[#dfe8ff] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[16px] text-[#021b3d]">Selecciona tu ubicación</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="w-8 h-8 rounded-full bg-[#e8eeff] flex items-center justify-center text-[#021b3d]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-[12px] text-[#3d4a41] mb-3">
              Elige tu barrio en Valledupar para conectarte con las tiendas de tu sector:
            </p>
            <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto">
              {neighborhoods.map((nb) => (
                <button
                  key={nb}
                  onClick={() => {
                    setSelectedCity(nb);
                    setShowLocationModal(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-[13px] transition-colors ${
                    selectedCity === nb
                      ? 'bg-[#adf0a6]/50 text-[#006d43] font-bold'
                      : 'hover:bg-[#e8eeff] text-[#021b3d]'
                  }`}
                >
                  <span>{nb}</span>
                  {selectedCity === nb && (
                    <span className="material-symbols-outlined text-[18px] text-[#006d43]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
