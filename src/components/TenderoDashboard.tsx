import React, { useState } from 'react';
import { Order, OrderStep, Screen, UserRole } from '../types';
import { DON_LUIS_PHOTO } from '../data/initialData';
import { formatCOP } from '../utils/formatters';

interface TenderoDashboardProps {
  activeOrder: Order;
  onUpdateOrderStatus: (status: OrderStep) => void;
  onNavigate: (screen: Screen) => void;
  onSelectRole: (role: UserRole) => void;
}

export const TenderoDashboard: React.FC<TenderoDashboardProps> = ({
  activeOrder,
  onUpdateOrderStatus,
  onNavigate,
  onSelectRole,
}) => {
  const [storeOpen, setStoreOpen] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleStatusChange = (newStatus: OrderStep) => {
    onUpdateOrderStatus(newStatus);
    setToastMsg(`Estado del pedido actualizado a: ${newStatus.toUpperCase()}`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const nextStepMap: Record<OrderStep, OrderStep | null> = {
    recibido: 'confirmado',
    confirmado: 'preparacion',
    preparacion: 'en_camino',
    en_camino: 'entregado',
    entregado: null,
  };

  const currentNext = nextStepMap[activeOrder.status];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#021b3d] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-[95] animate-in fade-in zoom-in-95 duration-150">
          <span className="material-symbols-outlined text-[#5ddd9c] text-[18px]">check_circle</span>
          <span className="text-[12px] font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Tendero Header */}
      <div className="flex items-center justify-between pt-1 pb-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#e8eeff] flex-shrink-0 border border-[#adf0a6]">
            <img
              alt="Don Luis Pinedo"
              className="w-full h-full object-cover"
              src={DON_LUIS_PHOTO}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#006d43] font-bold uppercase tracking-wider">
              Panel del Tendero
            </span>
            <h1 className="text-[18px] text-[#021b3d] font-extrabold truncate leading-tight">
              Tienda La Esperanza
            </h1>
            <span className="text-[11px] text-[#3d4a41]">Don Luis Pinedo • Los Cortijos</span>
          </div>
        </div>

        {/* Store Open/Close Toggle */}
        <button
          onClick={() => setStoreOpen(!storeOpen)}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            storeOpen
              ? 'bg-[#adf0a6] text-[#326f34]'
              : 'bg-[#ffdad6] text-[#93000a]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              storeOpen ? 'bg-[#006d43] animate-pulse' : 'bg-[#ba1a1a]'
            }`}
          ></span>
          <span>{storeOpen ? 'Abierto' : 'Cerrado'}</span>
        </button>
      </div>

      {/* Switcher back to Vecino */}
      <div className="mb-3">
        <button
          onClick={() => {
            onSelectRole('vecino');
            onNavigate('catalog');
          }}
          className="w-full py-2 px-3 rounded-xl bg-[#e8eeff] hover:bg-[#dfe8ff] text-[#021b3d] text-[12px] font-bold flex items-center justify-center gap-1.5 border border-[#dfe8ff] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-[#006d43]">shopping_bag</span>
          <span>Ir a comprar como Vecino</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2.5 mb-3.5">
        <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e8eeff] flex flex-col">
          <span className="text-[11px] text-[#3d4a41] font-semibold">Ventas del Día</span>
          <span className="text-[20px] font-extrabold text-[#006d43] mt-0.5">$164.500</span>
          <span className="text-[10px] text-[#326f34] font-bold mt-0.5">8 pedidos despachados</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e8eeff] flex flex-col">
          <span className="text-[11px] text-[#3d4a41] font-semibold">Fiados por Cobrar</span>
          <span className="text-[20px] font-extrabold text-[#db7a00] mt-0.5">$184.000</span>
          <span className="text-[10px] text-[#3d4a41] font-bold mt-0.5">6 vecinos con crédito</span>
        </div>
      </div>

      {/* Active Order Control Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e8eeff] flex flex-col gap-3 mb-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0fa76b] animate-pulse"></span>
            <span className="text-[15px] text-[#021b3d] font-bold">
              Pedido Entrante #{activeOrder.id}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffdcc2] text-[#6d3a00] text-[10px] font-bold uppercase">
            {activeOrder.paymentMethod}
          </span>
        </div>

        <div className="bg-[#f1f3ff] p-3 rounded-xl flex flex-col gap-1.5 border border-[#e8eeff]">
          <div className="flex justify-between text-[12px]">
            <span className="text-[#3d4a41]">Cliente:</span>
            <strong className="text-[#021b3d]">Vecino Los Cortijos</strong>
          </div>
          <div className="flex justify-between text-[12px]">
            <span className="text-[#3d4a41]">Dirección:</span>
            <span className="text-[#021b3d] font-medium truncate max-w-[200px]">
              {activeOrder.address}
            </span>
          </div>
          <div className="flex justify-between text-[12px]">
            <span className="text-[#3d4a41]">Total a cobrar:</span>
            <strong className="text-[#006d43] text-[14px]">
              {formatCOP(activeOrder.total)} COP
            </strong>
          </div>
          {activeOrder.notes && (
            <div className="mt-1 pt-1 border-t border-[#dfe8ff] text-[11px] text-[#3d4a41]">
              <strong>Nota del vecino:</strong> "{activeOrder.notes}"
            </div>
          )}
        </div>

        {/* Current State Indicator */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[12px] text-[#3d4a41]">Estado actual:</span>
          <span className="px-3 py-1 rounded-full bg-[#0fa76b] text-white text-[12px] font-bold uppercase">
            {activeOrder.status}
          </span>
        </div>

        {/* Action button to advance status */}
        {currentNext ? (
          <button
            onClick={() => handleStatusChange(currentNext)}
            className="w-full py-3 rounded-full bg-[#006d43] hover:bg-[#0fa76b] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">forward</span>
            <span>Pasar a: {currentNext.replace('_', ' ').toUpperCase()}</span>
          </button>
        ) : (
          <div className="p-2.5 rounded-xl bg-[#adf0a6]/50 text-[#326f34] text-center text-[12px] font-bold flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>¡Pedido completado y entregado con éxito!</span>
          </div>
        )}

        {/* Manual step reset for testing */}
        <div className="flex items-center justify-between text-[11px] text-[#3d4a41] pt-1">
          <span>Cambiar a cualquier estado:</span>
          <select
            value={activeOrder.status}
            onChange={(e) => handleStatusChange(e.target.value as OrderStep)}
            className="bg-[#e8eeff] px-2 py-1 rounded-lg text-[11px] font-bold text-[#021b3d] border border-[#dfe8ff] cursor-pointer"
          >
            <option value="recibido">1. Recibido</option>
            <option value="confirmado">2. Confirmado</option>
            <option value="preparacion">3. En preparación</option>
            <option value="en_camino">4. En camino</option>
            <option value="entregado">5. Entregado</option>
          </select>
        </div>
      </div>

      {/* Libreta de Fiados del Barrio (Don Luis Control) */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e8eeff] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#db7a00] text-[20px]">menu_book</span>
            <h3 className="text-[15px] font-bold text-[#021b3d]">Libreta de Clientes</h3>
          </div>
          <button
            onClick={() => onNavigate('fiados')}
            className="text-[11px] text-[#006d43] font-bold hover:underline cursor-pointer"
          >
            Ver detalle
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { name: 'Vecino Los Cortijos (Tú)', debt: 30600, limit: 80000, status: 'Al día' },
            { name: 'Doña María V. (Mz 4)', debt: 24000, limit: 60000, status: 'Al día' },
            { name: 'Carlos Morales (Cra 12)', debt: 45000, limit: 50000, status: 'Por vencer' },
          ].map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 bg-[#f1f3ff] rounded-xl border border-[#e8eeff]"
            >
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#021b3d]">{c.name}</span>
                <span className="text-[11px] text-[#3d4a41]">
                  Cupo máx: {formatCOP(c.limit)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[13px] font-bold text-[#021b3d]">
                  {formatCOP(c.debt)}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    c.status === 'Al día'
                      ? 'bg-[#adf0a6] text-[#326f34]'
                      : 'bg-[#ffdcc2] text-[#6d3a00]'
                  }`}
                >
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
