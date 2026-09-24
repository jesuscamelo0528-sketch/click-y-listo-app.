import React, { useState } from 'react';
import { Order, Product } from '../types';
import { formatCOP } from '../utils/formatters';

interface OrdersScreenProps {
  activeOrder: Order;
  pastOrders: Order[];
  onReorder: (order: Order) => void;
  onAdvanceStep?: () => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  activeOrder,
  pastOrders,
  onReorder,
  onAdvanceStep,
}) => {
  const [activeTab, setActiveTab] = useState<'encurso' | 'historial'>('encurso');
  const [itemsExpanded, setItemsExpanded] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const handleReorderClick = (order: Order) => {
    onReorder(order);
    setToastText(`¡Productos de #${order.id} agregados a tu canasta!`);
    setTimeout(() => setToastText(null), 2500);
  };

  // Helper for tracking steps
  const steps = [
    {
      id: 'recibido',
      title: 'Recibido',
      time: '10:42 AM',
      description: 'Tu pedido fue registrado en el sistema.',
      icon: 'check',
    },
    {
      id: 'confirmado',
      title: 'Confirmado',
      time: '10:45 AM',
      description: 'Don Luis aceptó el despacho en la tienda.',
      icon: 'check',
    },
    {
      id: 'preparacion',
      title: 'En preparación',
      time: 'Ahora',
      description: 'Seleccionando los mejores productos para ti.',
      icon: 'autorenew',
    },
    {
      id: 'en_camino',
      title: 'Listo / En camino',
      time: 'Pronto',
      description: 'Asignando domiciliario de confianza.',
      icon: 'two_wheeler',
    },
    {
      id: 'entregado',
      title: 'Entregado',
      time: activeOrder.estimatedDeliveryTime || 'Est. 11:15 AM',
      description: 'Entrega segura en tu puerta.',
      icon: 'home',
    },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'recibido':
        return 0;
      case 'confirmado':
        return 1;
      case 'preparacion':
        return 2;
      case 'en_camino':
        return 3;
      case 'entregado':
        return 4;
      default:
        return 2;
    }
  };

  const currentIdx = getStepIndex(activeOrder.status);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2">
      {/* Toast Feedback */}
      {toastText && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#021b3d] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-[95] animate-in fade-in zoom-in-95 duration-150">
          <span className="material-symbols-outlined text-[#5ddd9c] text-[18px]">check_circle</span>
          <span className="text-[12px] font-bold">{toastText}</span>
        </div>
      )}

      {/* Header Contextual */}
      <div className="flex items-center justify-between pt-1 pb-2">
        <div>
          <h1 className="text-[22px] text-[#021b3d] font-extrabold tracking-tight">
            Mis Pedidos
          </h1>
          <p className="text-[12px] text-[#3d4a41] flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[15px] text-[#006d43]">pin_drop</span>
            Los Cortijos, Valledupar
          </p>
        </div>
        <button
          onClick={() => setShowReceipt(true)}
          aria-label="Historial de compras"
          className="w-10 h-10 rounded-full bg-[#e8eeff] flex items-center justify-center text-[#021b3d] hover:bg-[#dfe8ff] transition-colors border border-[#dfe8ff] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">receipt_long</span>
        </button>
      </div>

      {/* Segmented Tabs Filter */}
      <div className="flex p-1 bg-[#e8eeff] rounded-xl gap-1 mb-3">
        <button
          onClick={() => setActiveTab('encurso')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'encurso'
              ? 'bg-white shadow-xs text-[#021b3d] font-bold'
              : 'text-[#3d4a41] hover:text-[#021b3d]'
          }`}
        >
          <span className="text-[13px]">En Curso</span>
          <span className="w-5 h-5 rounded-full bg-[#0fa76b] text-white text-[11px] flex items-center justify-center font-bold">
            1
          </span>
        </button>
        <button
          onClick={() => setActiveTab('historial')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'historial'
              ? 'bg-white shadow-xs text-[#021b3d] font-bold'
              : 'text-[#3d4a41] hover:text-[#021b3d]'
          }`}
        >
          <span className="text-[13px]">Historial</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#dfe8ff] text-[#3d4a41] text-[11px] font-semibold">
            {pastOrders.length}
          </span>
        </button>
      </div>

      {/* SECCIÓN: PEDIDO EN CURSO */}
      {activeTab === 'encurso' && (
        <div className="flex flex-col gap-3.5 animate-in fade-in">
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e8eeff] flex flex-col gap-3">
            {/* Encabezado de la Tarjeta Activa */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#f1f3ff] flex items-center justify-center flex-shrink-0 text-[#006d43]">
                  <span className="material-symbols-outlined text-[24px]">storefront</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[12px] text-[#006d43] font-bold">#{activeOrder.id}</span>
                    <span className="text-[#3d4a41] text-[10px]">•</span>
                    <span className="text-[12px] text-[#3d4a41]">{activeOrder.timeStr}</span>
                  </div>
                  <span className="text-[15px] text-[#021b3d] truncate font-bold">
                    {activeOrder.storeName}
                  </span>
                  <span className="text-[12px] text-[#3d4a41]">{activeOrder.storeNeighborhood}</span>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#adf0a6] text-[#326f34] text-[11px] font-bold uppercase">
                {activeOrder.paymentMethod}
              </span>
            </div>

            {/* Live Status Banner */}
            <div className="bg-[#f1f3ff] rounded-xl p-3 flex items-center justify-between border border-[#e8eeff]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="relative flex h-3 w-3 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0fa76b] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#006d43]"></span>
                </span>
                <span className="text-[12px] text-[#021b3d] font-bold truncate">
                  {activeOrder.statusText}
                </span>
              </div>
              <span className="text-[11px] text-[#8f4e00] font-bold bg-[#ffdcc2]/80 px-2 py-0.5 rounded-full flex-shrink-0 ml-1">
                {activeOrder.estimatedDeliveryTime}
              </span>
            </div>

            {/* 5-step Vertical Stepper */}
            <div className="flex flex-col relative pl-2 py-1">
              {steps.map((step, idx) => {
                const isPassed = idx < currentIdx;
                const isCurrent = idx === currentIdx;
                const isFuture = idx > currentIdx;

                return (
                  <div key={step.id} className="flex items-start gap-3 relative pb-4 last:pb-0">
                    {/* Line connection */}
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute left-[13px] top-7 bottom-0 w-[2px] ${
                          isPassed ? 'bg-[#006d43]' : 'bg-[#dfe8ff]'
                        }`}
                      ></div>
                    )}

                    {/* Step circle icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center z-10 flex-shrink-0 shadow-xs transition-colors ${
                        isPassed
                          ? 'bg-[#006d43] text-white'
                          : isCurrent
                          ? 'bg-[#0fa76b] text-white shadow-[0_0_10px_rgba(15,167,107,0.4)]'
                          : 'bg-[#dfe8ff] text-[#6d7a70]'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[15px] ${
                          isCurrent ? 'animate-spin' : ''
                        }`}
                      >
                        {step.icon}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0 pt-0.5 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[13px] ${
                            isCurrent
                              ? 'font-extrabold text-[#006d43] flex items-center gap-1.5'
                              : isPassed
                              ? 'font-bold text-[#021b3d]'
                              : 'font-medium text-[#6d7a70]'
                          }`}
                        >
                          {step.title}
                          {isCurrent && (
                            <span className="w-2 h-2 rounded-full bg-[#006d43] inline-block animate-pulse"></span>
                          )}
                        </span>
                        <span
                          className={`text-[11px] ${
                            isCurrent
                              ? 'text-[#006d43] font-bold'
                              : 'text-[#3d4a41] font-medium'
                          }`}
                        >
                          {step.time}
                        </span>
                      </div>
                      <span
                        className={`text-[12px] ${
                          isCurrent ? 'text-[#021b3d]' : 'text-[#6d7a70]'
                        }`}
                      >
                        {step.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Demo Step Advance (Optional tester control) */}
            {onAdvanceStep && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={onAdvanceStep}
                  className="text-[11px] text-[#006d43] bg-[#adf0a6]/30 px-2.5 py-1 rounded-full font-bold hover:bg-[#adf0a6]/60 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Simular avance del pedido"
                >
                  <span className="material-symbols-outlined text-[14px]">fast_forward</span>
                  <span>Simular siguiente estado</span>
                </button>
              </div>
            )}

            {/* Resumen Desplegable de Artículos */}
            <div className="bg-[#f1f3ff] rounded-xl p-3 flex flex-col gap-2 border border-[#e8eeff]">
              <button
                className="w-full flex items-center justify-between text-left cursor-pointer"
                onClick={() => setItemsExpanded(!itemsExpanded)}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006d43] text-[20px]">
                    shopping_bag
                  </span>
                  <span className="text-[13px] text-[#021b3d] font-bold">
                    {activeOrder.items.length} artículos en este pedido
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#3d4a41]">
                  <span className="text-[15px] text-[#006d43] font-extrabold">
                    {formatCOP(activeOrder.total)}
                  </span>
                  <span
                    className="material-symbols-outlined text-[20px] transition-transform"
                    style={{ transform: itemsExpanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
                  >
                    expand_more
                  </span>
                </div>
              </button>

              {itemsExpanded && (
                <div className="flex flex-col gap-1.5 pt-1 animate-in fade-in">
                  {activeOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1.5 bg-white px-2.5 rounded-lg border border-[#e8eeff]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#006d43] font-bold">{item.quantity}x</span>
                        <span className="text-[12px] text-[#021b3d] font-medium truncate">
                          {item.name} {item.unit}
                        </span>
                      </div>
                      <span className="text-[12px] text-[#3d4a41] font-semibold">
                        {formatCOP(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Destino de entrega */}
            <div className="flex items-center gap-3 p-3 bg-[#f1f3ff] rounded-xl border border-[#e8eeff]">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#021b3d]">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-[#3d4a41]">Dirección de entrega</span>
                <span className="text-[13px] text-[#021b3d] font-bold truncate">
                  {activeOrder.address}
                </span>
              </div>
            </div>

            {/* Botones de Acción Inmediata */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                className="h-11 px-3 rounded-full bg-[#0fa76b] hover:bg-[#006d43] text-white flex items-center justify-center gap-2 transition-colors shadow-xs text-[13px] font-bold cursor-pointer"
                href={`https://wa.me/573012345678?text=Hola%20Don%20Luis%2C%20consulta%20sobre%20mi%20pedido%20${activeOrder.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Don Luis</span>
              </a>
              <button
                className="h-11 px-3 rounded-full bg-[#e8eeff] hover:bg-[#dfe8ff] text-[#021b3d] flex items-center justify-center gap-2 transition-colors text-[13px] font-bold border border-[#dfe8ff] cursor-pointer"
                onClick={() => setShowReceipt(true)}
              >
                <span className="material-symbols-outlined text-[18px]">description</span>
                <span>Ver Recibo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN: HISTORIAL DE PEDIDOS */}
      {(activeTab === 'historial' || activeTab === 'encurso') && (
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] text-[#021b3d] font-bold">Pedidos Anteriores</h2>
            <span className="text-[11px] text-[#3d4a41]">Últimos 30 días</span>
          </div>

          {pastOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-[#e8eeff] flex flex-col gap-2.5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] flex items-center justify-center flex-shrink-0 text-[#006d43]">
                    <span className="material-symbols-outlined text-[22px]">storefront</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] text-[#3d4a41] font-bold">#{order.id}</span>
                      <span className="text-[#3d4a41] text-[10px]">•</span>
                      <span className="text-[12px] text-[#3d4a41]">{order.timeStr}</span>
                    </div>
                    <span className="text-[15px] text-[#021b3d] font-bold">{order.storeName}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#adf0a6] text-[#326f34] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Entregado
                </span>
              </div>

              <div className="flex items-center justify-between py-2 bg-[#f1f3ff] px-3 rounded-xl border border-[#e8eeff]">
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#3d4a41]">
                    {order.items.length} productos • {order.paymentMethod === 'fiado' ? 'Fiado' : order.paymentMethod === 'efectivo' ? 'Efectivo' : 'Nequi'}
                  </span>
                  <span className="text-[16px] text-[#021b3d] font-extrabold">
                    {formatCOP(order.total)} COP
                  </span>
                </div>
                <button
                  onClick={() => handleReorderClick(order)}
                  className="h-9 px-3.5 rounded-full bg-[#006d43] hover:bg-[#0fa76b] text-white transition-all flex items-center gap-1.5 shadow-xs active:scale-95 text-[12px] font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">replay</span>
                  <span>Pedir de nuevo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Neighborhood Community Tip Card */}
      <div className="bg-[#f1f3ff] rounded-2xl p-4 flex items-center gap-3 mt-4 border border-[#e8eeff]">
        <div className="w-10 h-10 rounded-full bg-[#adf0a6] text-[#326f34] flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[20px]">thumb_up</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] text-[#021b3d] font-bold">
            ¿Sabías que puedes fiar con confianza?
          </span>
          <span className="text-[12px] text-[#3d4a41] leading-tight mt-0.5">
            Don Luis anota tu saldo en su libreta digital de Click&amp;Listo.
          </span>
        </div>
      </div>

      {/* Modal Recibo Digital */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl flex flex-col gap-3.5 max-h-[90vh] overflow-y-auto border border-[#dfe8ff] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#e8eeff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d43] text-[24px]">receipt</span>
                <span className="text-[17px] text-[#021b3d] font-bold">Recibo Digital</span>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-[#e8eeff] flex items-center justify-center text-[#021b3d] cursor-pointer"
                onClick={() => setShowReceipt(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col items-center py-2.5 text-center bg-[#f1f3ff] rounded-xl border border-[#e8eeff]">
              <span className="text-[12px] text-[#006d43] font-bold">TIENDA LA ESPERANZA</span>
              <span className="text-[11px] text-[#3d4a41]">NIT: 77.189.204-1 • Valledupar, Cesar</span>
              <span className="text-[28px] text-[#021b3d] font-black mt-1">
                {formatCOP(activeOrder.total)}
              </span>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#adf0a6] text-[#326f34] text-[11px] font-bold">
                Modalidad: {activeOrder.paymentMethod === 'fiado' ? 'Fiado de Barrio' : 'Pago Inmediato'}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 text-[12px] border-b border-[#e8eeff] pb-2">
              <div className="flex justify-between text-[#3d4a41]">
                <span>Pedido No:</span>
                <span className="font-bold text-[#021b3d]">#{activeOrder.id}</span>
              </div>
              <div className="flex justify-between text-[#3d4a41]">
                <span>Fecha y Hora:</span>
                <span className="font-medium text-[#021b3d]">{activeOrder.timeStr}</span>
              </div>
              <div className="flex justify-between text-[#3d4a41]">
                <span>Cliente:</span>
                <span className="font-medium text-[#021b3d]">Vecino Los Cortijos</span>
              </div>
              <div className="flex justify-between text-[#3d4a41]">
                <span>Domiciliario:</span>
                <span className="font-medium text-[#021b3d]">Asignado por Don Luis</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 py-1">
              <span className="text-[11px] text-[#3d4a41] uppercase font-bold">Detalle de víveres</span>
              {activeOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[12px]">
                  <span>
                    {it.quantity}x {it.name} {it.unit}
                  </span>
                  <span className="font-bold text-[#021b3d]">{formatCOP(it.subtotal)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#e8eeff]">
              <button
                className="w-full h-11 rounded-full bg-[#006d43] hover:bg-[#0fa76b] text-white text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                onClick={() => {
                  window.print();
                }}
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Descargar Comprobante</span>
              </button>
              <button
                className="w-full h-10 rounded-full bg-[#e8eeff] text-[#021b3d] text-[13px] font-semibold cursor-pointer"
                onClick={() => setShowReceipt(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
