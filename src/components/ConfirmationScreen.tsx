import React, { useState } from 'react';
import { Order, Screen } from '../types';
import { DON_LUIS_PHOTO } from '../data/initialData';
import { formatCOP } from '../utils/formatters';

interface ConfirmationScreenProps {
  order: Order;
  onNavigate: (screen: Screen) => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  order,
  onNavigate,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`#${order.id}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2400);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2">
      {/* Celebration Top Area */}
      <div className="relative flex flex-col items-center text-center pt-4 pb-3">
        {/* Pulse & Celebration Halo */}
        <div className="relative flex items-center justify-center mb-3">
          <div className="absolute w-28 h-28 rounded-full bg-[#adf0a6]/40 animate-ping opacity-60"></div>
          <div className="absolute w-24 h-24 rounded-full bg-[#7bfbb6]/50 blur-xs"></div>
          <div className="relative w-20 h-20 rounded-full bg-[#0fa76b] flex items-center justify-center shadow-lg shadow-[#0fa76b]/30">
            <span
              className="material-symbols-outlined text-white text-[42px]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
            >
              check_circle
            </span>
          </div>
          {/* Confetti decoration */}
          <span className="absolute -top-1 -right-2 text-[#db7a00] material-symbols-outlined text-[20px] animate-bounce">
            star
          </span>
          <span className="absolute bottom-1 -left-2 text-[#006d43] material-symbols-outlined text-[18px]">
            celebration
          </span>
        </div>

        {/* Main Headings */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#adf0a6] text-[#326f34] text-[11px] font-bold mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#006d43] animate-pulse"></span>
          <span>¡COMPRA EXITOSA!</span>
        </div>
        <h1 className="text-[22px] text-[#021b3d] font-extrabold tracking-tight mb-1">
          ¡Pedido Confirmado, Vecino!
        </h1>
        <p className="text-[13px] text-[#3d4a41] max-w-[320px] mx-auto leading-relaxed">
          <strong className="text-[#021b3d]">Don Luis</strong> ya recibió tu encargo en{' '}
          <span className="text-[#006d43] font-semibold">Tienda La Esperanza</span> y está
          empacando tus víveres frescos.
        </p>

        {/* Order Tag Badge */}
        <div className="mt-3 inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-xs border border-[#dfe8ff]">
          <span className="text-[11px] text-[#3d4a41] uppercase font-bold">Pedido</span>
          <span className="text-[16px] text-[#021b3d] font-extrabold tracking-wide">
            #{order.id}
          </span>
          <button
            onClick={handleCopy}
            className="w-7 h-7 rounded-full bg-[#e8eeff] flex items-center justify-center text-[#006d43] active:scale-90 transition-transform cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copiedCode ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>
        {copiedCode && (
          <p className="text-[11px] font-bold text-[#006d43] mt-1 animate-in fade-in">
            ¡Código copiado al portapapeles!
          </p>
        )}
      </div>

      {/* Realtime Estimated Status Pill */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#e8eeff] mb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#aff3a9] flex items-center justify-center flex-shrink-0 text-[#002204]">
              <span className="material-symbols-outlined text-[22px]">timer</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#3d4a41] uppercase tracking-wider font-bold">
                Estado estimado
              </span>
              <span className="text-[15px] font-bold text-[#021b3d] truncate">
                En preparación (15-25 min)
              </span>
            </div>
          </div>
          <span className="text-[11px] text-[#006d43] font-bold bg-[#adf0a6]/50 px-2.5 py-0.5 rounded-full">
            A tiempo
          </span>
        </div>

        {/* Stepper bar */}
        <div className="w-full grid grid-cols-3 gap-1.5 mt-3">
          <div className="h-1.5 rounded-full bg-[#0fa76b]"></div>
          <div className="h-1.5 rounded-full bg-[#5ddd9c] animate-pulse"></div>
          <div className="h-1.5 rounded-full bg-[#dfe8ff]"></div>
        </div>
        <div className="flex justify-between items-center text-[10px] font-semibold text-[#3d4a41] mt-1.5">
          <span className="text-[#006d43] font-bold">1. Recibido</span>
          <span className="text-[#021b3d] font-bold">2. Empacando</span>
          <span>3. En camino</span>
        </div>
      </div>

      {/* Shopkeeper Contact Card */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#e8eeff] mb-3">
        <div className="flex items-center gap-3 pb-3 border-b border-[#f1f3ff]">
          <div className="relative w-11 h-11 rounded-full bg-[#e8eeff] flex items-center justify-center overflow-hidden flex-shrink-0 border border-[#adf0a6]">
            <img
              alt="Don Luis Pinedo"
              className="w-full h-full object-cover"
              src={DON_LUIS_PHOTO}
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-bold text-[#021b3d] truncate">Don Luis Pinedo</span>
              <span
                className="material-symbols-outlined text-[16px] text-[#006d43]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <span className="text-[12px] text-[#3d4a41]">Tienda La Esperanza • Los Cortijos</span>
          </div>
        </div>

        {/* Communication Quick Triggers */}
        <div className="grid grid-cols-2 gap-2.5 pt-3">
          <a
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#adf0a6] text-[#326f34] text-[13px] font-bold active:scale-95 transition-transform cursor-pointer"
            href="https://wa.me/573012345678?text=Hola%20Don%20Luis%2C%20acabo%20de%20confirmar%20el%20pedido%20CL12345%20por%20Click%26Listo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>WhatsApp</span>
          </a>
          <a
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#e8eeff] text-[#021b3d] text-[13px] font-bold active:scale-95 transition-transform cursor-pointer"
            href="tel:+573012345678"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Llamar</span>
          </a>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#e8eeff] mb-4">
        <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#f1f3ff]">
          <div className="flex items-center gap-1.5 text-[#021b3d]">
            <span className="material-symbols-outlined text-[#006d43] text-[20px]">receipt_long</span>
            <span className="text-[15px] font-bold">Resumen del Pedido</span>
          </div>
          <span className="text-[11px] font-semibold text-[#3d4a41] bg-[#e8eeff] px-2 py-0.5 rounded-full">
            {order.items.length} productos
          </span>
        </div>

        {/* Items preview list */}
        <div className="flex flex-col gap-2 py-1">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 text-[#021b3d]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#f1f3ff] flex items-center justify-center text-[#006d43] font-bold text-[12px] flex-shrink-0">
                  {item.quantity}x
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-semibold truncate">{item.name}</span>
                  <span className="text-[11px] text-[#6d7a70]">{item.unit}</span>
                </div>
              </div>
              <span className="text-[13px] font-bold whitespace-nowrap">
                {formatCOP(item.subtotal)}
              </span>
            </div>
          ))}
        </div>

        {/* Delivery and Payment Information Group */}
        <div className="mt-3 pt-2.5 bg-[#f1f3ff] rounded-xl p-3 flex flex-col gap-2 border border-[#e8eeff]">
          <div className="flex items-start gap-2 text-[#021b3d]">
            <span className="material-symbols-outlined text-[#006d43] text-[18px] mt-0.5 flex-shrink-0">
              location_on
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#3d4a41] uppercase font-bold">Entrega en</span>
              <span className="text-[12px] font-semibold truncate">
                {order.deliveryType === 'domicilio'
                  ? `${order.address}, Barrio Los Cortijos`
                  : 'Recogida en Calle 14 # 9-20, Los Cortijos'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[#021b3d]">
            <span className="material-symbols-outlined text-[#db7a00] text-[18px] mt-0.5 flex-shrink-0">
              menu_book
            </span>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#3d4a41] uppercase font-bold">Método de Pago</span>
                <span className="text-[10px] bg-[#ffdcc2] text-[#6d3a00] px-1.5 py-0.2 rounded font-bold uppercase">
                  {order.paymentMethod}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-[#8f4e00]">
                {order.paymentMethod === 'fiado'
                  ? 'Libreta de Confianza (Pagas a fin de mes)'
                  : order.paymentMethod === 'efectivo'
                  ? 'Efectivo contra entrega'
                  : 'Transferencia Nequi / Daviplata'}
              </span>
            </div>
          </div>
        </div>

        {/* Final Price Row */}
        <div className="mt-3 pt-2.5 border-t border-[#f1f3ff] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[12px] text-[#3d4a41]">Total Cargado</span>
            <span className="text-[11px] text-[#006d43] font-semibold">
              {order.deliveryCost === 0 ? 'Envío de barrio gratis' : 'Domicilio incluido'}
            </span>
          </div>
          <span className="text-[20px] font-extrabold text-[#006d43]">
            {formatCOP(order.total)}{' '}
            <span className="text-[12px] font-normal text-[#3d4a41]">COP</span>
          </span>
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div className="flex flex-col gap-2.5 w-full">
        <button
          onClick={() => onNavigate('orders')}
          className="w-full h-12 rounded-full bg-[#0fa76b] hover:bg-[#006d43] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform cursor-pointer"
          type="button"
        >
          <span>Ver Mis Pedidos</span>
          <span className="material-symbols-outlined text-[20px]">local_shipping</span>
        </button>
        <button
          onClick={() => onNavigate('catalog')}
          className="w-full h-12 rounded-full bg-white text-[#006d43] font-bold text-[15px] flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#e8eeff] transition-colors active:scale-[0.98] border border-[#dfe8ff] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Seguir Comprando</span>
        </button>
      </div>
    </div>
  );
};
