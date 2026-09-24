import React, { useState } from 'react';
import { Screen, CartItem } from '../types';
import { LOGO_URL } from '../data/initialData';
import { formatCOP } from '../utils/formatters';

interface DeliveryScreenProps {
  cart: CartItem[];
  deliveryType: 'domicilio' | 'tienda';
  address: string;
  deliveryNotes: string;
  onUpdateDeliveryType: (type: 'domicilio' | 'tienda') => void;
  onUpdateAddress: (address: string) => void;
  onUpdateDeliveryNotes: (notes: string) => void;
  onNavigate: (screen: Screen) => void;
}

export const DeliveryScreen: React.FC<DeliveryScreenProps> = ({
  cart,
  deliveryType,
  address,
  deliveryNotes,
  onUpdateDeliveryType,
  onUpdateAddress,
  onUpdateDeliveryNotes,
  onNavigate,
}) => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);

  const subtotalProducts = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discount = subtotalProducts >= 15000 ? 1000 : 0;
  const subtotalAfterDiscount = Math.max(0, subtotalProducts - discount);
  const deliveryCost = deliveryType === 'domicilio' ? 2000 : 0;
  const totalWithDelivery = subtotalAfterDiscount + deliveryCost;
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSaveAddress = () => {
    onUpdateAddress(tempAddress);
    setIsEditingAddress(false);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pb-28">
      {/* Stepper de Checkout y Navegación Contextual */}
      <section className="px-4 pt-2 pb-3 bg-[#f1f3ff] shadow-xs border-b border-[#e8eeff]">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => onNavigate('cart')}
            aria-label="Volver a Mi Canasta"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#021b3d] shadow-xs active:scale-95 transition-transform border border-[#dfe8ff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div className="flex flex-col text-center flex-1 min-w-0">
            <span className="text-[11px] text-[#006d43] uppercase tracking-wider font-bold">
              Paso 1 de 2
            </span>
            <h1 className="text-[18px] text-[#021b3d] font-bold truncate leading-tight">
              Tipo de Entrega
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs border border-[#dfe8ff] p-1.5">
            <img alt="Click&Listo" className="w-full h-full object-contain" src={LOGO_URL} />
          </div>
        </div>

        {/* Stepper visual estilizado */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#006d43] text-white px-3 py-1 rounded-full shadow-xs">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span className="text-[11px] font-bold">1. Entrega</span>
          </div>
          <div className="h-0.5 w-6 bg-[#0fa76b]/40 rounded-full"></div>
          <button
            onClick={() => onNavigate('payment')}
            className="flex items-center gap-1.5 bg-[#d7e3ff] text-[#3d4a41] px-3 py-1 rounded-full opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">payments</span>
            <span className="text-[11px]">2. Pago</span>
          </button>
        </div>
      </section>

      <div className="px-4 flex flex-col gap-3.5 mt-3">
        {/* Tienda que Despacha */}
        <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-[#e8eeff] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full bg-[#adf0a6]/40 flex items-center justify-center flex-shrink-0 text-[#006d43]">
              <span className="material-symbols-outlined text-[24px]">store</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-[#3d4a41] leading-none">Despacho desde</span>
              <span className="text-[15px] text-[#021b3d] truncate font-bold mt-0.5">
                Tienda La Esperanza (Don Luis)
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0fa76b] animate-pulse"></span>
                <span className="text-[11px] text-[#006d43] font-bold">Abierto ahora</span>
                <span className="text-[#3d4a41] text-[11px]">• Entrega inmediata hoy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selector de Método de Entrega */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[16px] font-bold text-[#021b3d]">
            ¿Cómo deseas recibir tu pedido?
          </label>

          {/* Opción A: A Domicilio */}
          <div
            onClick={() => onUpdateDeliveryType('domicilio')}
            className={`relative p-4 rounded-2xl bg-white transition-all duration-200 cursor-pointer border ${
              deliveryType === 'domicilio'
                ? 'border-[#0fa76b] shadow-md ring-2 ring-[#0fa76b]/15'
                : 'border-[#e8eeff] shadow-xs hover:border-[#adf0a6]'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs transition-colors ${
                    deliveryType === 'domicilio'
                      ? 'bg-[#006d43] text-white'
                      : 'bg-[#dfe8ff] text-[#021b3d]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[26px]">two_wheeler</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[15px] text-[#021b3d] font-bold">A domicilio</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#adf0a6] text-[#326f34] text-[11px] font-bold">
                      + $2.000 COP
                    </span>
                  </div>
                  <p className="text-[12px] text-[#3d4a41] mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#006d43]">
                      schedule
                    </span>
                    Tiempo estimado: <strong className="text-[#021b3d]">15 - 25 min</strong>
                  </p>
                </div>
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-xs transition-colors ${
                  deliveryType === 'domicilio'
                    ? 'bg-[#006d43] text-white'
                    : 'bg-[#dfe8ff] text-[#3d4a41]'
                }`}
              >
                {deliveryType === 'domicilio' && (
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                )}
              </div>
            </div>

            {/* Dirección Guardada y Detalles desplegados para Domicilio */}
            {deliveryType === 'domicilio' && (
              <div className="mt-3 pt-3 border-t border-[#f1f3ff] flex flex-col gap-2.5 animate-in fade-in">
                <div className="p-3 rounded-xl bg-[#f1f3ff] flex items-start justify-between gap-2 border border-[#e8eeff]">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[#006d43] text-[18px] mt-0.5">
                      location_on
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] text-[#3d4a41] font-bold">Entregar en:</span>
                      {isEditingAddress ? (
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="text"
                            value={tempAddress}
                            onChange={(e) => setTempAddress(e.target.value)}
                            className="bg-white px-2.5 py-1 text-[13px] rounded-lg border border-[#0fa76b] text-[#021b3d] w-full"
                          />
                          <button
                            onClick={handleSaveAddress}
                            className="px-2.5 py-1 rounded-lg bg-[#006d43] text-white text-[11px] font-bold"
                          >
                            Listo
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-[13px] text-[#021b3d] font-semibold truncate">
                            {address}
                          </span>
                          <span className="text-[11px] text-[#3d4a41]">
                            Barrio Los Cortijos, Valledupar
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {!isEditingAddress && (
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="px-2.5 py-1 rounded-full bg-white text-[#006d43] text-[11px] font-bold shadow-xs active:scale-95 transition-transform flex-shrink-0 border border-[#dfe8ff] cursor-pointer"
                      type="button"
                    >
                      Cambiar
                    </button>
                  )}
                </div>

                {/* Punto de Referencia Input */}
                <div className="flex flex-col gap-1">
                  <label
                    className="text-[11px] text-[#3d4a41] font-bold flex items-center gap-1"
                    htmlFor="address-notes"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit_note</span>
                    Indicaciones para el domiciliario
                  </label>
                  <input
                    className="w-full h-11 px-3 py-2 text-[#021b3d] bg-[#f1f3ff] rounded-xl text-[13px] placeholder:text-[#6d7a70] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0fa76b]/20 border border-[#dfe8ff] transition-all"
                    id="address-notes"
                    placeholder="Ej. Casa esquinera, timbre blanco..."
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => onUpdateDeliveryNotes(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Opción B: Recoger en Tienda */}
          <div
            onClick={() => onUpdateDeliveryType('tienda')}
            className={`relative p-4 rounded-2xl bg-white transition-all duration-200 cursor-pointer border ${
              deliveryType === 'tienda'
                ? 'border-[#0fa76b] shadow-md ring-2 ring-[#0fa76b]/15'
                : 'border-[#e8eeff] shadow-xs hover:border-[#adf0a6]'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs transition-colors ${
                    deliveryType === 'tienda'
                      ? 'bg-[#006d43] text-white'
                      : 'bg-[#dfe8ff] text-[#021b3d]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[26px]">storefront</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[15px] text-[#021b3d] font-bold">Recoger en tienda</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#aff3a9] text-[#002204] text-[11px] font-bold">
                      ¡Gratis!
                    </span>
                  </div>
                  <p className="text-[12px] text-[#3d4a41] mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#3d4a41]">
                      schedule
                    </span>
                    Listo para retirar en: <strong className="text-[#021b3d]">10 min</strong>
                  </p>
                </div>
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-xs transition-colors ${
                  deliveryType === 'tienda'
                    ? 'bg-[#006d43] text-white'
                    : 'bg-[#dfe8ff] text-[#3d4a41]'
                }`}
              >
                {deliveryType === 'tienda' && (
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                )}
              </div>
            </div>

            {/* Dirección de Tienda desplegada para Recogida */}
            {deliveryType === 'tienda' && (
              <div className="mt-3 pt-3 border-t border-[#f1f3ff] flex flex-col gap-2.5 animate-in fade-in">
                <div className="p-3 rounded-xl bg-[#f1f3ff] flex items-start gap-2 border border-[#e8eeff]">
                  <span className="material-symbols-outlined text-[#006d43] text-[18px] mt-0.5">
                    pin_drop
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#3d4a41] font-bold">Punto de retiro:</span>
                    <span className="text-[13px] text-[#021b3d] font-semibold">
                      Calle 14 # 9-20, Los Cortijos
                    </span>
                    <span className="text-[11px] text-[#3d4a41]">Valledupar, Cesar</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#adf0a6]/40 text-[#326f34]">
                  <span className="material-symbols-outlined text-[18px]">savings</span>
                  <span className="text-[12px] font-medium">Ahorras $2.000 COP en el costo de envío</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#e8eeff] flex flex-col gap-1.5">
          <span className="text-[15px] text-[#021b3d] font-bold mb-1">Resumen del pedido</span>
          <div className="flex justify-between items-center text-[#3d4a41] text-[13px]">
            <span>Subtotal ({totalCount} productos)</span>
            <span className="font-semibold text-[#021b3d]">
              {formatCOP(subtotalAfterDiscount)} COP
            </span>
          </div>
          <div className="flex justify-between items-center text-[#3d4a41] text-[13px]">
            <span>Costo de envío</span>
            <span
              className={`font-semibold ${
                deliveryCost > 0 ? 'text-[#006d43]' : 'text-[#2d6b30]'
              }`}
            >
              {deliveryCost > 0 ? `+ ${formatCOP(deliveryCost)} COP` : 'Gratis ($0)'}
            </span>
          </div>
          <div className="h-[1px] bg-[#e8eeff] my-1"></div>
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-[#021b3d] font-bold">Total parcial</span>
            <span className="font-extrabold text-[19px] text-[#006d43]">
              {formatCOP(totalWithDelivery)} COP
            </span>
          </div>
        </div>

        {/* Botón de Acción Principal */}
        <div className="flex flex-col gap-2 mt-1">
          <button
            onClick={() => onNavigate('payment')}
            className="w-full h-12 rounded-full bg-[#0fa76b] hover:bg-[#006d43] text-white flex items-center justify-between px-5 shadow-md active:scale-98 transition-all cursor-pointer font-bold"
            type="button"
          >
            <span className="text-[15px]">Continuar a Pago</span>
            <div className="flex items-center gap-1">
              <span className="text-[15px]">{formatCOP(totalWithDelivery)}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </div>
          </button>
          <p className="text-[11px] text-center text-[#3d4a41] flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#006d43]">security</span>
            Elige tu método de pago en el siguiente paso (Efectivo, Nequi o Fiado)
          </p>
        </div>
      </div>
    </div>
  );
};
