import React, { useState } from 'react';
import { LOGO_URL } from '../data/initialData';
import { Screen } from '../types';

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
  onLoginSuccess: (identifier: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('301 234 5678');
  const [password, setPassword] = useState('vecinoconfiable123');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(identifier);
    onNavigate('catalog');
  };

  const handleGoogleLogin = () => {
    onLoginSuccess('vecino.valledupar@gmail.com');
    onNavigate('catalog');
  };

  const handleForgotPassword = () => {
    setToastMessage('Te enviamos un SMS con el código de recuperación.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col relative w-full bg-[#f9f9ff] min-h-screen">
      <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-8 pt-2">
        {/* Top Navigation & Location Badge */}
        <div className="flex items-center justify-between w-full py-2">
          <button
            onClick={() => onNavigate('welcome')}
            aria-label="Volver a Selección de Rol"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e8eeff] text-[#021b3d] transition-transform active:scale-95 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <span className="px-3 py-1 rounded-full bg-[#adf0a6]/40 text-[#326f34] text-[11px] font-bold tracking-wide">
            VALLEDUPAR
          </span>
        </div>

        {/* Brand Visual / Logo */}
        <div className="flex flex-col items-center justify-center pt-2 pb-2">
          <div className="w-20 h-20 rounded-2xl bg-white p-2 shadow-sm flex items-center justify-center border border-[#e8eeff]">
            <img
              alt="Click&Listo Logo Oficial"
              className="w-full h-full object-contain"
              src={LOGO_URL}
            />
          </div>
        </div>

        {/* Header Cluster */}
        <div className="flex flex-col items-center text-center px-1 mb-5">
          <h1 className="text-[22px] text-[#021b3d] font-extrabold mb-1 tracking-tight">
            {isRegisterMode ? 'Crea tu cuenta de vecino' : 'Iniciar sesión como vecino'}
          </h1>
          <p className="text-[14px] text-[#3d4a41] max-w-[290px]">
            {isRegisterMode
              ? 'Regístrate para pedir fiado y hacer pedidos a tu tienda cercana'
              : '¡Hola vecino! Ingresa tus datos para pedir en tu tienda cercana'}
          </p>
        </div>

        {/* Interactive Form */}
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          {/* Identifier Input (Phone or Email) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-[#021b3d]" htmlFor="identifierInput">
              Correo electrónico o celular
            </label>
            <div className="relative flex items-center w-full bg-white rounded-2xl shadow-xs px-3.5 py-1 border border-[#e8eeff] focus-within:border-[#0fa76b] focus-within:ring-2 focus-within:ring-[#0fa76b]/20 transition-all">
              {/* Prefix */}
              <div className="flex items-center gap-1 pr-2 mr-2 border-r border-[#bccabe]/30 text-[#3d4a41]">
                <span className="material-symbols-outlined text-[18px] text-[#0fa76b]">call</span>
                <span className="text-[12px] font-bold text-[#021b3d]">+57</span>
              </div>
              <input
                className="w-full py-2.5 bg-transparent text-[14px] text-[#021b3d] placeholder:text-[#6d7a70] focus:outline-none"
                id="identifierInput"
                placeholder="Ej. 301 234 5678 o vecino@gmail.com"
                required
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input with Toggle */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-semibold text-[#021b3d]" htmlFor="passwordInput">
                Contraseña
              </label>
              {!isRegisterMode && (
                <button
                  onClick={handleForgotPassword}
                  className="text-[12px] text-[#0fa76b] font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                  type="button"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}
            </div>
            <div className="relative flex items-center w-full bg-white rounded-2xl shadow-xs px-3.5 py-1 border border-[#e8eeff] focus-within:border-[#0fa76b] focus-within:ring-2 focus-within:ring-[#0fa76b]/20 transition-all">
              <span className="material-symbols-outlined text-[20px] text-[#6d7a70] mr-2">lock</span>
              <input
                className="w-full py-2.5 bg-transparent text-[14px] text-[#021b3d] placeholder:text-[#6d7a70] focus:outline-none"
                id="passwordInput"
                placeholder="Tu contraseña secreta"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                aria-label="Mostrar contraseña"
                className="p-1.5 rounded-full text-[#6d7a70] hover:text-[#021b3d] active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Main Submit Action */}
          <div className="pt-1">
            <button
              className="w-full h-12 rounded-full bg-[#0fa76b] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-md hover:bg-[#006d43] active:scale-[0.98] transition-all cursor-pointer"
              type="submit"
            >
              <span>{isRegisterMode ? 'Crear mi cuenta' : 'Ingresar'}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </form>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="mt-3 p-2 bg-[#adf0a6] text-[#00331d] rounded-xl text-center text-[12px] font-bold animate-in fade-in">
            {toastMessage}
          </div>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-[1px] bg-[#d7e3ff]"></div>
          </div>
          <span className="relative px-3 bg-[#f9f9ff] text-[12px] text-[#6d7a70] font-medium">
            o continúa con
          </span>
        </div>

        {/* Social Action (Google) */}
        <div className="w-full">
          <button
            onClick={handleGoogleLogin}
            className="w-full h-12 rounded-full bg-white text-[#021b3d] text-[14px] font-bold flex items-center justify-center gap-3 shadow-xs active:scale-[0.98] transition-all hover:bg-[#f1f3ff] border border-[#dfe8ff] cursor-pointer"
            type="button"
          >
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
                fill="#4285F4"
              />
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
                fill="#34A853"
              />
              <path
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15Z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                fill="#EA4335"
              />
            </svg>
            <span>Continuar con Google</span>
          </button>
        </div>

        {/* Registration Toggle */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <span className="text-[14px] text-[#3d4a41]">
            {isRegisterMode ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta?'}
          </span>
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-[14px] font-bold text-[#0fa76b] hover:underline active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            {isRegisterMode ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </div>

        {/* Trust & Neighborhood Badge */}
        <div className="mt-6 mx-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8eeff] text-[#3d4a41] border border-[#dfe8ff]">
          <span className="material-symbols-outlined text-[16px] text-[#006d43]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <span className="text-[11px] font-semibold">
            Tiendas de barrio verificadas en Valledupar
          </span>
        </div>
      </div>
    </div>
  );
};
