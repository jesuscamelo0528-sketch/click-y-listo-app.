import React from 'react';
import { Screen } from '../types';

interface BottomNavBarProps {
  currentScreen: Screen;
  cartCount: number;
  onNavigate: (screen: Screen) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  cartCount,
  onNavigate,
}) => {
  const isCatalog = currentScreen === 'catalog';
  const isCart = currentScreen === 'cart' || currentScreen === 'delivery' || currentScreen === 'payment' || currentScreen === 'confirmation';
  const isOrders = currentScreen === 'orders';
  const isFiados = currentScreen === 'fiados';

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#f9f9ff]/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(18,40,74,0.06)] border-t border-[#e8eeff]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1">
        {/* Inicio */}
        <button
          onClick={() => onNavigate('catalog')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-colors cursor-pointer ${
            isCatalog ? 'text-[#006d43] font-bold' : 'text-[#3d4a41] hover:text-[#021b3d]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: isCatalog ? "'FILL' 1" : "'FILL' 0" }}
          >
            storefront
          </span>
          <span className="text-[11px] leading-none mt-1 font-semibold">Inicio</span>
        </button>

        {/* Canasta */}
        <button
          onClick={() => onNavigate('cart')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-colors cursor-pointer ${
            isCart ? 'text-[#006d43] font-bold' : 'text-[#3d4a41] hover:text-[#021b3d]'
          }`}
        >
          <div className="relative">
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: isCart ? "'FILL' 1" : "'FILL' 0" }}
            >
              shopping_basket
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 bg-[#006d43] text-white rounded-full text-[10px] leading-tight flex items-center justify-center font-bold shadow-xs animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-none mt-1 font-semibold">Canasta</span>
        </button>

        {/* Pedidos */}
        <button
          onClick={() => onNavigate('orders')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-colors cursor-pointer ${
            isOrders ? 'text-[#006d43] font-bold' : 'text-[#3d4a41] hover:text-[#021b3d]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: isOrders ? "'FILL' 1" : "'FILL' 0" }}
          >
            local_shipping
          </span>
          <span className="text-[11px] leading-none mt-1 font-semibold">Pedidos</span>
        </button>

        {/* Mis Fiados */}
        <button
          onClick={() => onNavigate('fiados')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-colors cursor-pointer ${
            isFiados ? 'text-[#006d43] font-bold' : 'text-[#3d4a41] hover:text-[#021b3d]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: isFiados ? "'FILL' 1" : "'FILL' 0" }}
          >
            menu_book
          </span>
          <span className="text-[11px] leading-none mt-1 font-semibold">Mis Fiados</span>
        </button>
      </div>
    </nav>
  );
};
