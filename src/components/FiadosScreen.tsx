import React, { useState } from 'react';
import { FiadoAccount, FiadoMovement } from '../types';
import { formatCOP } from '../utils/formatters';

interface FiadosScreenProps {
  fiadoAccount: FiadoAccount;
  onMakeAbono: (amount: number, method: string) => void;
}

export const FiadosScreen: React.FC<FiadosScreenProps> = ({
  fiadoAccount,
  onMakeAbono,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'charge' | 'payment'>('all');
  const [showAbonoModal, setShowAbonoModal] = useState(false);
  const [abonoAmount, setAbonoAmount] = useState('20000');
  const [abonoMethod, setAbonoMethod] = useState<'nequi' | 'efectivo'>('nequi');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const usedPercentage = Math.min(
    100,
    Math.round((fiadoAccount.usedAmount / fiadoAccount.totalLimit) * 100)
  );
  const availableAmount = Math.max(0, fiadoAccount.totalLimit - fiadoAccount.usedAmount);

  const filteredMovements = fiadoAccount.movements.filter((m) => {
    if (activeFilter === 'all') return true;
    return m.type === activeFilter;
  });

  const handleConfirmAbono = () => {
    const num = parseInt(abonoAmount.replace(/\D/g, ''), 10) || 0;
    if (num > 0) {
      onMakeAbono(num, abonoMethod === 'nequi' ? 'Nequi' : 'Efectivo en Tienda');
      setShowAbonoModal(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#006d43] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-[95] animate-in fade-in zoom-in-95 duration-150">
          <span className="material-symbols-outlined text-white text-[18px]">verified</span>
          <span className="text-[12px] font-bold">¡Abono registrado en tu libreta!</span>
        </div>
      )}

      {/* 1. ENCABEZADO DE SECCIÓN */}
      <div className="flex flex-col gap-2 pt-1 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[22px] text-[#021b3d] font-extrabold tracking-tight">
                Mis Fiados
              </h1>
              <span
                className="material-symbols-outlined text-[#006d43] text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <p className="text-[12px] text-[#3d4a41]">
              Libreta digital de confianza y respaldo vecinal
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[#adf0a6] px-3 py-1 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#006d43] animate-pulse"></span>
            <span className="text-[11px] text-[#326f34] font-extrabold uppercase tracking-wider">
              Al día
            </span>
          </div>
        </div>

        {/* Info Tendero de Confianza */}
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-xs border border-[#e8eeff]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-full bg-[#dfe8ff] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#021b3d] text-[22px]">store</span>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#0fa76b] rounded-full border-2 border-white"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-bold text-[#021b3d] truncate">
                {fiadoAccount.storeName}
              </span>
              <span className="text-[11px] text-[#3d4a41] flex items-center gap-1 truncate">
                <span>{fiadoAccount.shopkeeper}</span>
                <span>•</span>
                <span className="text-[#006d43] font-medium">{fiadoAccount.neighborhood}</span>
              </span>
            </div>
          </div>
          <span className="bg-[#e8eeff] px-2.5 py-1 rounded-lg text-[11px] text-[#021b3d] font-bold whitespace-nowrap">
            Vecino Verificado
          </span>
        </div>
      </div>

      {/* 2. TARJETA PRINCIPAL DE SALDO Y CUPO (HERO FINANCIERO) */}
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-xs border border-[#e8eeff] p-5 flex flex-col gap-3.5 mt-1">
        {/* Ambient glow */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#adf0a6]/30 blur-2xl pointer-events-none"></div>

        <div className="flex flex-col gap-1 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[12px] uppercase tracking-wider text-[#3d4a41] font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006d43] text-[18px]">
                account_balance_wallet
              </span>
              Saldo Pendiente Actual
            </span>
            <span className="text-[11px] text-[#006d43] font-bold bg-[#f1f3ff] px-2.5 py-0.5 rounded-full border border-[#dfe8ff]">
              Corte: Quincena
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[36px] font-extrabold text-[#021b3d] tracking-tight leading-none">
              {formatCOP(fiadoAccount.usedAmount)}
            </span>
            <span className="text-[14px] font-semibold text-[#3d4a41]">COP</span>
          </div>
          <p className="text-[11px] text-[#3d4a41] flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[#006d43] text-[15px]">info</span>
            Incluye tu último pedido <strong className="text-[#021b3d]">#CL12345</strong> de hoy
          </p>
        </div>

        {/* Barra de Progreso del Cupo */}
        <div className="flex flex-col gap-2 bg-[#f1f3ff] p-3.5 rounded-xl border border-[#e8eeff]">
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[#3d4a41] font-medium">
              Cupo en uso: <strong className="text-[#021b3d] font-bold">{usedPercentage}%</strong>
            </span>
            <span className="text-[#006d43] font-bold">
              Disponible: {formatCOP(availableAmount)} COP
            </span>
          </div>
          {/* Barra visual estilizada */}
          <div className="w-full h-3 bg-[#dfe8ff] rounded-full overflow-hidden flex p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#006d43] to-[#0fa76b] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${usedPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[11px] text-[#3d4a41] pt-0.5 font-medium">
            <span>Usado: {formatCOP(fiadoAccount.usedAmount)}</span>
            <span>Cupo Total: {formatCOP(fiadoAccount.totalLimit)} COP</span>
          </div>
        </div>

        {/* Plazo de confianza y corte */}
        <div className="flex items-center gap-2.5 bg-white py-1.5 px-2 rounded-lg border border-[#e8eeff]">
          <span className="material-symbols-outlined text-[#db7a00] text-[20px]">event_repeat</span>
          <p className="text-[12px] text-[#021b3d] leading-tight">
            Acuerdo de pago: <strong className="font-bold">{fiadoAccount.dueDate}</strong> o con tu
            próximo pago.
          </p>
        </div>

        {/* Botones de Acción Primarios */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          <button
            onClick={() => setShowAbonoModal(true)}
            className="col-span-3 min-h-[46px] px-4 rounded-full bg-[#0fa76b] hover:bg-[#006d43] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            <span>Abonar a mi saldo</span>
          </button>
          <a
            href="https://wa.me/573012345678?text=Hola%20Don%20Luis%2C%20quisiera%20consultar%20mi%20saldo%20de%20fiado"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 min-h-[46px] px-3 rounded-full bg-[#e8eeff] hover:bg-[#dfe8ff] text-[#021b3d] font-bold text-[14px] flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform border border-[#dfe8ff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#006d43] text-[18px]">chat</span>
            <span className="truncate">Don Luis</span>
          </a>
        </div>
      </div>

      {/* 3. MÉTODOS DE ABONO RÁPIDO */}
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] text-[#021b3d] font-bold">¿Cómo quieres abonar?</h3>
          <span className="text-[11px] text-[#006d43] font-bold">Sin comisiones</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Opción 1: Digital (Nequi / Daviplata) */}
          <button
            onClick={() => {
              setAbonoMethod('nequi');
              setShowAbonoModal(true);
            }}
            className="flex flex-col p-3.5 bg-white rounded-2xl shadow-xs border border-[#e8eeff] hover:border-[#0fa76b] text-left active:scale-[0.98] transition-all cursor-pointer"
            type="button"
          >
            <div className="w-9 h-9 rounded-xl bg-[#e8eeff] flex items-center justify-center text-[#006d43] mb-2">
              <span className="material-symbols-outlined text-[20px]">send_to_mobile</span>
            </div>
            <span className="text-[14px] text-[#021b3d] font-bold">Nequi o Daviplata</span>
            <span className="text-[11px] text-[#3d4a41] mt-0.5 leading-tight">
              Reporte automático en segundos
            </span>
          </button>

          {/* Opción 2: Tienda Física */}
          <button
            onClick={() => {
              setAbonoMethod('efectivo');
              setShowAbonoModal(true);
            }}
            className="flex flex-col p-3.5 bg-white rounded-2xl shadow-xs border border-[#e8eeff] hover:border-[#0fa76b] text-left active:scale-[0.98] transition-all cursor-pointer"
            type="button"
          >
            <div className="w-9 h-9 rounded-xl bg-[#adf0a6] flex items-center justify-center text-[#326f34] mb-2">
              <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
            </div>
            <span className="text-[14px] text-[#021b3d] font-bold">En la Tienda</span>
            <span className="text-[11px] text-[#3d4a41] mt-0.5 leading-tight">
              Efectivo en caja con Don Luis
            </span>
          </button>
        </div>
      </div>

      {/* 4. HISTORIAL DE MOVIMIENTOS */}
      <div className="flex flex-col gap-2.5 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] text-[#021b3d] font-bold">Movimientos de la libreta</h3>
          <span className="text-[11px] text-[#3d4a41]">Últimos 30 días</span>
        </div>

        {/* Pestañas Filtro */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#006d43] text-white shadow-xs'
                : 'bg-white text-[#3d4a41] border border-[#dfe8ff] hover:bg-[#f1f3ff]'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveFilter('charge')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'charge'
                ? 'bg-[#006d43] text-white shadow-xs'
                : 'bg-white text-[#3d4a41] border border-[#dfe8ff] hover:bg-[#f1f3ff]'
            }`}
          >
            Compras fiadas
          </button>
          <button
            onClick={() => setActiveFilter('payment')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'payment'
                ? 'bg-[#006d43] text-white shadow-xs'
                : 'bg-white text-[#3d4a41] border border-[#dfe8ff] hover:bg-[#f1f3ff]'
            }`}
          >
            Abonos realizados
          </button>
        </div>

        {/* Lista de Movimientos */}
        <div className="flex flex-col gap-2">
          {filteredMovements.map((movement) => {
            const isCharge = movement.type === 'charge';
            return (
              <div
                key={movement.id}
                className="flex items-center justify-between p-3.5 bg-white rounded-2xl shadow-xs border border-[#e8eeff] hover:bg-[#f1f3ff] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCharge
                        ? 'bg-[#f1f3ff] text-[#021b3d]'
                        : 'bg-[#adf0a6] text-[#326f34]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: isCharge ? "'FILL' 0" : "'FILL' 1" }}
                    >
                      {isCharge ? 'receipt_long' : 'check_circle'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-bold text-[#021b3d] truncate">
                      {movement.title}
                    </span>
                    <span className="text-[12px] text-[#3d4a41] truncate">{movement.subtitle}</span>
                    <span className="text-[11px] text-[#6d7a70] mt-0.5">{movement.dateStr}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end flex-shrink-0 pl-2">
                  <span
                    className={`font-extrabold text-[16px] ${
                      isCharge ? 'text-[#021b3d]' : 'text-[#006d43]'
                    }`}
                  >
                    {isCharge ? `+${formatCOP(movement.amount)}` : formatCOP(movement.amount)}
                  </span>
                  <span
                    className={`mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      isCharge
                        ? 'bg-[#e8eeff] text-[#3d4a41]'
                        : 'bg-[#adf0a6] text-[#326f34]'
                    }`}
                  >
                    {movement.badgeText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. NOTA DE CONFIANZA BARRIAL */}
      <div className="flex items-start gap-3 bg-[#f1f3ff] p-4 rounded-2xl mt-4 border border-[#e8eeff]">
        <div className="w-8 h-8 rounded-full bg-[#006d43] flex items-center justify-center text-white flex-shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[18px]">handshake</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[14px] text-[#021b3d] font-bold">
            ¿Cómo funciona tu libreta en Click&amp;Listo?
          </span>
          <p className="text-[12px] text-[#3d4a41] leading-relaxed">
            Don Luis habilita tu cupo de confianza para que nunca te falte nada en casa. Haz tus pedidos
            tranquilos y abona a tiempo en tu quincena para mantener tu crédito siempre abierto.
          </p>
        </div>
      </div>

      {/* Modal para Abonar */}
      {showAbonoModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl flex flex-col gap-3.5 border border-[#dfe8ff] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#e8eeff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d43] text-[22px]">payments</span>
                <span className="text-[16px] text-[#021b3d] font-bold">Registrar Abono a Fiado</span>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-[#e8eeff] flex items-center justify-center text-[#021b3d] cursor-pointer"
                onClick={() => setShowAbonoModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-[12px] text-[#3d4a41]">
              Ingresa el monto que deseas abonar a tu saldo actual de {formatCOP(fiadoAccount.usedAmount)}:
            </p>

            {/* Quick amount chips */}
            <div className="flex gap-2 flex-wrap">
              {['10000', '20000', '30000', `${fiadoAccount.usedAmount}`].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAbonoAmount(amt)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors ${
                    abonoAmount === amt
                      ? 'bg-[#006d43] text-white'
                      : 'bg-[#e8eeff] text-[#021b3d]'
                  }`}
                >
                  {formatCOP(parseInt(amt, 10))}
                </button>
              ))}
            </div>

            {/* Method selection */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setAbonoMethod('nequi')}
                className={`flex-1 p-2.5 rounded-xl border text-[12px] font-bold flex items-center justify-center gap-1.5 ${
                  abonoMethod === 'nequi'
                    ? 'border-[#0fa76b] bg-[#adf0a6]/25 text-[#006d43]'
                    : 'border-[#dfe8ff] text-[#3d4a41]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">send_to_mobile</span>
                <span>Nequi / Davi</span>
              </button>
              <button
                type="button"
                onClick={() => setAbonoMethod('efectivo')}
                className={`flex-1 p-2.5 rounded-xl border text-[12px] font-bold flex items-center justify-center gap-1.5 ${
                  abonoMethod === 'efectivo'
                    ? 'border-[#0fa76b] bg-[#adf0a6]/25 text-[#006d43]'
                    : 'border-[#dfe8ff] text-[#3d4a41]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
                <span>En Tienda</span>
              </button>
            </div>

            {abonoMethod === 'nequi' && (
              <div className="bg-[#f1f3ff] p-2.5 rounded-xl text-[12px] text-[#021b3d] flex items-center justify-between">
                <span>Número Nequi de Don Luis:</span>
                <strong className="font-mono text-[#006d43]">301 234 5678</strong>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAbonoModal(false)}
                className="flex-1 py-2.5 rounded-full bg-[#e8eeff] text-[#021b3d] text-[13px] font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAbono}
                className="flex-1 py-2.5 rounded-full bg-[#0fa76b] hover:bg-[#006d43] text-white text-[13px] font-bold shadow-xs cursor-pointer"
              >
                Confirmar Abono
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
