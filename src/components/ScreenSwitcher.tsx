import React, { useState } from 'react';
import { Screen } from '../types';

interface ScreenSwitcherProps {
  currentScreen: Screen;
  onSelectScreen: (screen: Screen) => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: Screen; label: string; icon: string }[] = [
    { id: 'welcome', label: '1. Bienvenida / Roles', icon: 'waving_hand' },
    { id: 'login', label: '2. Login Vecino', icon: 'login' },
    { id: 'catalog', label: '3. Catálogo Tienda', icon: 'storefront' },
    { id: 'cart', label: '4. Mi Canasta', icon: 'shopping_basket' },
    { id: 'delivery', label: '5. Tipo de Entrega', icon: 'moped' },
    { id: 'payment', label: '6. Método de Pago', icon: 'payments' },
    { id: 'confirmation', label: '7. Pedido Confirmado', icon: 'check_circle' },
    { id: 'orders', label: '8. Mis Pedidos (Tracking)', icon: 'local_shipping' },
    { id: 'fiados', label: '9. Mis Fiados (Libreta)', icon: 'menu_book' },
    { id: 'tendero', label: '10. Portal Tendero', icon: 'countertops' },
  ];

  return (
    <div className="fixed top-2 right-2 z-[90]">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#021b3d] text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1.5 border border-white/20 active:scale-95 transition-all opacity-85 hover:opacity-100"
        >
          <span className="material-symbols-outlined text-[15px] text-[#5ddd9c]">grid_view</span>
          <span className="hidden sm:inline">Pantallas:</span>
          <span className="text-[#adf0a6] capitalize truncate max-w-[90px]">{currentScreen}</span>
          <span className="material-symbols-outlined text-[14px]">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-10 w-64 bg-[#ffffff] rounded-2xl shadow-2xl border border-[#dfe8ff] p-2 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 border-b border-[#e8eeff] flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#021b3d] uppercase tracking-wider">
                Ver Pantallas Click&amp;Listo
              </span>
              <span className="text-[10px] text-[#006d43] font-semibold bg-[#adf0a6]/40 px-2 py-0.5 rounded-full">
                10 Vistas
              </span>
            </div>
            <div className="max-h-72 overflow-y-auto py-1 flex flex-col gap-0.5">
              {screens.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectScreen(s.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-[12px] transition-colors cursor-pointer ${
                    currentScreen === s.id
                      ? 'bg-[#006d43] text-white font-bold'
                      : 'text-[#021b3d] hover:bg-[#e8eeff]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[17px] ${
                      currentScreen === s.id ? 'text-[#adf0a6]' : 'text-[#006d43]'
                    }`}
                  >
                    {s.icon}
                  </span>
                  <span className="truncate flex-1">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
