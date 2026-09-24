import React, { useState } from 'react';
import { CartItem, Screen } from '../types';
import { formatCOP } from '../utils/formatters';

interface CartScreenProps {
  cart: CartItem[];
  notes: string;
  onUpdateNotes: (notes: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (screen: Screen) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  notes,
  onUpdateNotes,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}) => {
  const [removedItemIds, setRemovedItemIds] = useState<string[]>([]);

  const subtotalProducts = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  // Neighborhood discount if subtotal >= 15.000
  const discount = subtotalProducts >= 15000 ? 1000 : 0;
  const subtotalAfterDiscount = Math.max(0, subtotalProducts - discount);
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleRemoveAnimated = (productId: string) => {
    setRemovedItemIds((prev) => [...prev, productId]);
    setTimeout(() => {
      onRemoveItem(productId);
      setRemovedItemIds((prev) => prev.filter((id) => id !== productId));
    }, 200);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2">
      {/* Header & Store Context */}
      <div className="pt-2 pb-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] text-[#021b3d] font-extrabold tracking-tight">
              Mi Canasta
            </h1>
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#dfe8ff] text-[#3d4a41] text-[11px] font-bold">
              {totalCount} {totalCount === 1 ? 'producto' : 'productos'}
            </span>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-1 text-[#006d43] hover:opacity-80 transition-opacity text-[12px] font-bold py-1 px-1 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Seguir pidiendo</span>
          </button>
        </div>

        {/* Store Active Banner */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#f1f3ff] text-[#021b3d] border border-[#e8eeff]">
          <div className="w-7 h-7 rounded-full bg-[#adf0a6] flex items-center justify-center flex-shrink-0 text-[#326f34]">
            <span className="material-symbols-outlined text-[16px]">store</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#3d4a41] leading-none">Comprando en:</span>
            <span className="text-[14px] text-[#021b3d] truncate font-bold leading-tight mt-0.5">
              Tienda La Esperanza (Valledupar)
            </span>
          </div>
        </div>
      </div>

      {/* Cart Items List */}
      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center my-6 border border-[#dfe8ff] shadow-xs flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#6d7a70] mb-3">
            <span className="material-symbols-outlined text-[32px]">remove_shopping_cart</span>
          </div>
          <h2 className="text-[18px] font-bold text-[#021b3d]">Tu canasta está vacía</h2>
          <p className="text-[13px] text-[#3d4a41] mt-1 mb-4 max-w-[240px]">
            Agrega los víveres frescos de la tienda de Don Luis para continuar.
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-6 py-2.5 rounded-full bg-[#006d43] text-white text-[14px] font-bold shadow-sm active:scale-95 transition-transform"
          >
            Ir al Catálogo
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-1" id="cart-items-container">
          {cart.map((item) => {
            const isRemoving = removedItemIds.includes(item.product.id);
            const lineSubtotal = item.product.price * item.quantity;

            return (
              <div
                key={item.product.id}
                className={`p-3.5 rounded-2xl bg-white shadow-[0_2px_8px_-2px_rgba(18,40,74,0.06),0_1px_4px_-1px_rgba(18,40,74,0.03)] border border-[#e8eeff] flex flex-col gap-2 relative overflow-hidden transition-all duration-200 ${
                  isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="flex gap-3 items-start">
                  <div className="w-20 h-20 rounded-xl bg-[#f1f3ff] p-1.5 flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#e8eeff]">
                    <img
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                      src={item.product.image}
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <h2 className="text-[15px] text-[#021b3d] font-bold leading-snug truncate">
                          {item.product.name}
                        </h2>
                        <span className="text-[12px] text-[#6d7a70]">{item.product.unit}</span>
                      </div>
                      <button
                        aria-label="Eliminar producto"
                        className="w-8 h-8 rounded-full bg-[#e8eeff] flex items-center justify-center text-[#3d4a41] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors flex-shrink-0 cursor-pointer"
                        onClick={() => handleRemoveAnimated(item.product.id)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <div className="mt-1 flex items-baseline gap-1 text-[#3d4a41] text-[12px]">
                      <span>Unitario:</span>
                      <span className="font-semibold text-[#021b3d]">
                        {formatCOP(item.product.price)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#f1f3ff]">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-[#f1f3ff] px-2 py-1 rounded-full border border-[#dfe8ff]">
                    <button
                      aria-label="Disminuir cantidad"
                      className="w-7 h-7 rounded-full bg-white text-[#021b3d] flex items-center justify-center font-bold shadow-xs active:scale-90 transition-transform cursor-pointer"
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="w-6 text-center text-[15px] text-[#021b3d] font-bold">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="Aumentar cantidad"
                      className="w-7 h-7 rounded-full bg-[#0fa76b] text-white flex items-center justify-center font-bold shadow-xs active:scale-90 transition-transform cursor-pointer"
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#6d7a70] uppercase font-semibold">Subtotal</span>
                    <span className="font-extrabold text-[17px] text-[#006d43]">
                      {formatCOP(lineSubtotal)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Instructions for Shopkeeper */}
      {cart.length > 0 && (
        <>
          <div className="mt-4">
            <div className="p-4 rounded-2xl bg-white shadow-[0_2px_8px_-2px_rgba(18,40,74,0.06)] border border-[#e8eeff] flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-[15px] text-[#021b3d] flex items-center gap-1.5 font-bold"
                  htmlFor="order-notes"
                >
                  <span className="material-symbols-outlined text-[#006d43] text-[20px]">
                    edit_note
                  </span>
                  <span>Instrucciones para el tendero</span>
                </label>
                <span className="text-[11px] text-[#6d7a70] font-semibold bg-[#e8eeff] px-2 py-0.5 rounded-full">
                  Opcional
                </span>
              </div>
              <div className="relative mt-1">
                <textarea
                  className="w-full bg-[#f1f3ff] text-[#021b3d] text-[13px] rounded-xl p-3 placeholder:text-[#6d7a70] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0fa76b]/20 border border-transparent focus:border-[#0fa76b] transition-all resize-none"
                  id="order-notes"
                  maxLength={140}
                  placeholder="Ej. Que la leche esté bien fría, plátanos pintones, aguacate listo para hoy..."
                  rows={2}
                  value={notes}
                  onChange={(e) => onUpdateNotes(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-1.5 text-[#3d4a41] text-[11px] mt-0.5">
                <span className="material-symbols-outlined text-[14px] text-[#006d43]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span>Don Luis lee tus notas antes de empacar en la tienda.</span>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mt-3">
            <div className="p-4 rounded-2xl bg-white shadow-[0_2px_8px_-2px_rgba(18,40,74,0.06)] border border-[#e8eeff] flex flex-col gap-2">
              <h3 className="text-[15px] text-[#021b3d] font-bold mb-0.5">Resumen de Canasta</h3>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#3d4a41]">Subtotal productos</span>
                <span className="text-[#021b3d] font-semibold">
                  {formatCOP(subtotalProducts)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-[14px]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#0fa76b]">sell</span>
                    <span className="text-[#006d43] font-medium">Ahorro aplicado</span>
                  </div>
                  <span className="text-[#006d43] font-bold">-{formatCOP(discount)}</span>
                </div>
              )}
              <div className="h-px bg-[#e8eeff] my-1"></div>
              <div className="flex items-baseline justify-between pt-0.5">
                <div className="flex flex-col">
                  <span className="text-[15px] text-[#021b3d] font-bold">Subtotal a continuar</span>
                  <span className="text-[11px] text-[#6d7a70]">No incluye costo de entrega</span>
                </div>
                <span className="font-extrabold text-[20px] text-[#021b3d]">
                  {formatCOP(subtotalAfterDiscount)}
                </span>
              </div>
            </div>
          </div>

          {/* Informational notice */}
          <div className="mt-3">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#e8eeff] text-[#3d4a41] border border-[#dfe8ff]">
              <span className="material-symbols-outlined text-[#006d43] text-[18px] flex-shrink-0 mt-0.5">
                info
              </span>
              <p className="text-[12px] leading-relaxed">
                El valor del domicilio o recogida y el método de pago se seleccionarán en los siguientes pasos.
              </p>
            </div>
          </div>

          {/* Continue button */}
          <div className="mt-4">
            <button
              onClick={() => onNavigate('delivery')}
              className="w-full h-14 rounded-full bg-[#0fa76b] hover:bg-[#006d43] text-white font-bold text-[16px] flex items-center justify-between px-5 shadow-[0_8px_20px_-4px_rgba(15,167,107,0.4)] active:scale-[0.98] transition-all cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                <span>Continuar a Entrega</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[17px] text-white">
                  {formatCOP(subtotalAfterDiscount)}
                </span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
