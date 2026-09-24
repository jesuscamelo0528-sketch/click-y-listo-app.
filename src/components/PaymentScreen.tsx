import React, { useState } from 'react';
import { Screen, CartItem } from '../types';
import { LOGO_URL } from '../data/initialData';
import { formatCOP } from '../utils/formatters';

interface PaymentScreenProps {
  cart: CartItem[];
  deliveryType: 'domicilio' | 'tienda';
  address: string;
  paymentMethod: 'fiado' | 'efectivo' | 'transferencia';
  cashChangeAmount: string;
  onUpdatePaymentMethod: (method: 'fiado' | 'efectivo' | 'transferencia') => void;
  onUpdateCashChange: (change: string) => void;
  onConfirmOrder: () => void;
  onNavigate: (screen: Screen) => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  cart,
  deliveryType,
  address,
  paymentMethod,
  cashChangeAmount,
  onUpdatePaymentMethod,
  onUpdateCashChange,
  onConfirmOrder,
  onNavigate,
}) => {
  const [copiedAccount, setCopiedAccount] = useState(false);

  const subtotalProducts = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discount = subtotalProducts >= 15000 ? 1000 : 0;
  const deliveryCost = deliveryType === 'domicilio' ? 2000 : 0;
  const finalTotal = Math.max(0, subtotalProducts - discount) + deliveryCost;
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const fiadoCurrentUsed = 12000;
  const fiadoLimit = 80000;
  const fiadoNewBalance = fiadoCurrentUsed + finalTotal;

  const handleCopy = () => {
    navigator.clipboard.writeText('3012345678');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pb-28">
      {/* Navegación & Progreso de Checkout */}
      <div className="px-4 pt-2 pb-2">
        <div className="flex items-center justify-between py-1">
          <button
            onClick={() => onNavigate('delivery')}
            aria-label="Volver a Entrega"
            className="w-10 h-10 rounded-full bg-[#f1f3ff] text-[#021b3d] flex items-center justify-center active:scale-95 transition-transform border border-[#dfe8ff] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[18px] font-bold text-[#021b3d] leading-tight">
              Método de Pago
            </span>
            <span className="text-[11px] font-bold text-[#006d43]">Paso 2 de 2 • Finalizar</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-xs flex items-center justify-center p-1.5 border border-[#dfe8ff]">
            <img alt="Click&Listo" className="w-full h-full object-contain" src={LOGO_URL} />
          </div>
        </div>

        {/* Indicador de Progreso Visual */}
        <div className="w-full bg-[#dfe8ff] h-1.5 rounded-full overflow-hidden mt-2">
          <div className="bg-[#0fa76b] h-full w-full rounded-full transition-all duration-500"></div>
        </div>
      </div>

      {/* Contenedor de Opciones de Pago */}
      <div className="px-4 flex flex-col gap-3.5 mt-2">
        {/* OPCIÓN 1: Libreta de Fiado */}
        <div
          onClick={() => onUpdatePaymentMethod('fiado')}
          className={`relative rounded-2xl p-4 transition-all cursor-pointer border ${
            paymentMethod === 'fiado'
              ? 'bg-[#adf0a6]/25 border-[#0fa76b] shadow-md ring-2 ring-[#0fa76b]/15'
              : 'bg-white border-[#e8eeff] shadow-xs hover:border-[#adf0a6]'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#006d43] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[22px]">menu_book</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[15px] text-[#021b3d] font-bold">Libreta de Fiado</span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#ffdcc2] text-[#6d3a00] text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    ¡Autorizado por Don Luis!
                  </span>
                </div>
                <p className="text-[12px] text-[#3d4a41]">Pagas después con tu cupo de confianza</p>
              </div>
            </div>
            <div className="mt-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  paymentMethod === 'fiado'
                    ? 'bg-[#0fa76b] shadow-xs text-white'
                    : 'bg-[#dfe8ff]'
                }`}
              >
                {paymentMethod === 'fiado' && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          </div>

          {/* Detalle de Cupo & Saldos */}
          <div className="mt-2.5 bg-white/90 rounded-xl p-3 space-y-1.5 border border-[#e8eeff]">
            <div className="flex justify-between items-center text-[12px] text-[#3d4a41]">
              <span>Saldo actual fiado:</span>
              <span className="font-semibold text-[#021b3d]">{formatCOP(fiadoCurrentUsed)}</span>
            </div>
            <div className="flex justify-between items-center text-[12px] text-[#3d4a41]">
              <span>Cupo total asignado:</span>
              <span className="font-semibold text-[#021b3d]">{formatCOP(fiadoLimit)}</span>
            </div>
            <div className="flex justify-between items-center text-[12px] text-[#006d43]">
              <span>+ Este pedido:</span>
              <span className="font-bold">+{formatCOP(finalTotal)}</span>
            </div>
            <div className="pt-2 border-t border-[#e8eeff] flex justify-between items-center">
              <div>
                <span className="text-[11px] font-bold text-[#021b3d]">
                  Nuevo saldo pendiente:
                </span>
                <p className="text-[10px] text-[#006d43] font-semibold">
                  Dentro de tu límite autorizado
                </p>
              </div>
              <span className="text-[18px] font-extrabold text-[#021b3d]">
                {formatCOP(fiadoNewBalance)}
              </span>
            </div>
          </div>

          {/* Microtexto de vecindario */}
          <div className="mt-2 flex items-center gap-1.5 text-[#3d4a41]">
            <span className="material-symbols-outlined text-[16px] text-[#006d43]">schedule</span>
            <span className="text-[11px]">Paga a fin de mes o en tu próxima quincena.</span>
          </div>
        </div>

        {/* OPCIÓN 2: Efectivo Contra Entrega */}
        <div
          onClick={() => onUpdatePaymentMethod('efectivo')}
          className={`rounded-2xl p-4 transition-all cursor-pointer border ${
            paymentMethod === 'efectivo'
              ? 'bg-[#adf0a6]/25 border-[#0fa76b] shadow-md ring-2 ring-[#0fa76b]/15'
              : 'bg-white border-[#e8eeff] shadow-xs hover:border-[#adf0a6]'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e8eeff] text-[#021b3d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">payments</span>
              </div>
              <div>
                <span className="text-[15px] text-[#021b3d] font-bold">
                  Efectivo contra entrega
                </span>
                <p className="text-[12px] text-[#3d4a41]">Paga al recibir en tu puerta</p>
              </div>
            </div>
            <div className="mt-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  paymentMethod === 'efectivo'
                    ? 'bg-[#0fa76b] shadow-xs text-white'
                    : 'bg-[#dfe8ff]'
                }`}
              >
                {paymentMethod === 'efectivo' && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          </div>

          {/* Sub-opción Dinámica: Cambio */}
          {paymentMethod === 'efectivo' && (
            <div className="mt-3 pt-3 border-t border-[#e8eeff] animate-in fade-in">
              <p className="text-[12px] font-semibold text-[#021b3d] mb-2">
                ¿Con cuánto vas a pagar para alistar tu cambio?
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {['$20.000', '$50.000', 'Exacto'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateCashChange(chip);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
                      cashChangeAmount === chip
                        ? 'bg-[#006d43] text-white font-bold shadow-xs'
                        : 'bg-[#e8eeff] text-[#021b3d] hover:bg-[#dfe8ff]'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* OPCIÓN 3: Transferencia Digital */}
        <div
          onClick={() => onUpdatePaymentMethod('transferencia')}
          className={`rounded-2xl p-4 transition-all cursor-pointer border ${
            paymentMethod === 'transferencia'
              ? 'bg-[#adf0a6]/25 border-[#0fa76b] shadow-md ring-2 ring-[#0fa76b]/15'
              : 'bg-white border-[#e8eeff] shadow-xs hover:border-[#adf0a6]'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e8eeff] text-[#021b3d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">
                  account_balance_wallet
                </span>
              </div>
              <div>
                <span className="text-[15px] text-[#021b3d] font-bold">Transferencia Digital</span>
                <p className="text-[12px] text-[#3d4a41]">
                  Nequi o Daviplata al número de la tienda
                </p>
              </div>
            </div>
            <div className="mt-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  paymentMethod === 'transferencia'
                    ? 'bg-[#0fa76b] shadow-xs text-white'
                    : 'bg-[#dfe8ff]'
                }`}
              >
                {paymentMethod === 'transferencia' && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          </div>

          {/* Datos Rápidos de Cuenta */}
          {paymentMethod === 'transferencia' && (
            <div className="mt-3 pt-3 border-t border-[#e8eeff] animate-in fade-in">
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#dfe8ff]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#d7e3ff] text-[#021b3d] font-bold">
                    NEQUI / DAVI
                  </span>
                  <span className="text-[13px] text-[#021b3d] font-mono font-bold tracking-wide">
                    301 234 5678
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy();
                  }}
                  className="flex items-center gap-1 text-[#006d43] text-[11px] font-bold cursor-pointer hover:underline"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {copiedAccount ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedAccount ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resumen Final Desglosado del Pedido */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e8eeff] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-bold text-[#021b3d]">Resumen de Cuenta</span>
            <span className="text-[12px] text-[#006d43] font-semibold">
              {totalCount} artículos
            </span>
          </div>

          {/* Lista de costos */}
          <div className="space-y-1 text-[13px] text-[#3d4a41]">
            <div className="flex justify-between">
              <span>Subtotal productos</span>
              <span className="text-[#021b3d] font-medium">{formatCOP(subtotalProducts)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#006d43]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">local_offer</span>
                  Ahorro vecino
                </span>
                <span className="font-semibold">-{formatCOP(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>
                {deliveryType === 'domicilio'
                  ? 'Domicilio (Los Cortijos)'
                  : 'Recogida en tienda'}
              </span>
              <span className="text-[#021b3d] font-medium">
                {deliveryCost > 0 ? formatCOP(deliveryCost) : 'Gratis ($0)'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#e8eeff] flex justify-between items-baseline">
            <div>
              <span className="text-[15px] font-bold text-[#021b3d]">TOTAL A PAGAR</span>
              <p className="text-[11px] text-[#3d4a41] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px] text-[#006d43]">pin_drop</span>
                {deliveryType === 'domicilio' ? `${address} (15-25 min)` : 'Calle 14 # 9-20 (10 min)'}
              </p>
            </div>
            <span className="text-[20px] font-extrabold text-[#006d43]">
              {formatCOP(finalTotal)}
            </span>
          </div>
        </div>

        {/* Bloque de Confirmación Final */}
        <div className="flex flex-col space-y-1.5 pt-1">
          <button
            onClick={onConfirmOrder}
            className="w-full h-14 bg-[#0fa76b] hover:bg-[#006d43] text-white rounded-full font-bold text-[16px] shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            type="button"
          >
            <span>Confirmar Pedido</span>
            <span>•</span>
            <span>{formatCOP(finalTotal)}</span>
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </button>
          <div className="flex items-center justify-center gap-1.5 py-1 px-2 text-center text-[#3d4a41]">
            <span className="material-symbols-outlined text-[16px] text-[#006d43] flex-shrink-0">
              verified_user
            </span>
            <span className="text-[11px]">
              Don Luis recibirá tu pedido de inmediato por WhatsApp y Click&amp;Listo.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
