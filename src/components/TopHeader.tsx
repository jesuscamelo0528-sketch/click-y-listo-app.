import React from 'react';
import { LOGO_URL } from '../data/initialData';
import { Screen, UserRole } from '../types';

interface TopHeaderProps {
  subtitle: string;
  onNavigate: (screen: Screen) => void;
  userRole: UserRole;
  onToggleRole: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  subtitle,
  onNavigate,
  userRole,
  onToggleRole,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f9f9ff]/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e8eeff]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('catalog')}
          className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer active:opacity-80 transition-opacity"
        >
          <img
            alt="Click&Listo Logo Oficial"
            className="h-8 w-auto object-contain flex-shrink-0"
            src={LOGO_URL}
          />
          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[16px] text-[#021b3d] tracking-tight">Click&amp;Listo</span>
              <span className="text-[11px] text-[#3d4a41] opacity-75 truncate">• {subtitle}</span>
            </div>
            <span className="text-[12px] text-[#006d43] flex items-center gap-1 font-medium truncate">
              <span className="material-symbols-outlined text-[14px]">storefront</span>
              Mi Tienda de Barrio - Valledupar
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick role toggle button */}
          <button
            onClick={onToggleRole}
            title={userRole === 'vecino' ? 'Cambiar a modo Tendero' : 'Cambiar a modo Vecino'}
            className={`px-2 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all active:scale-95 ${
              userRole === 'tendero'
                ? 'bg-[#006d43] text-white shadow-xs'
                : 'bg-[#e8eeff] text-[#021b3d] hover:bg-[#dfe8ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {userRole === 'tendero' ? 'store' : 'person'}
            </span>
            <span className="capitalize">{userRole}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
