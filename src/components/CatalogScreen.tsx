import React, { useState, useMemo } from 'react';
import { Product, Screen, CartItem } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/initialData';
import { formatCOP } from '../utils/formatters';

interface CatalogScreenProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onNavigate: (screen: Screen) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  cart,
  onAddToCart,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Abarrotes');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [animatingProductId, setAnimatingProductId] = useState<string | null>(null);

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.unit.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Todos' || p.category === selectedCategory;

      const matchesStock = !onlyInStock || p.inStock;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchQuery, selectedCategory, onlyInStock]);

  const handleAddWithFeedback = (product: Product) => {
    setAnimatingProductId(product.id);
    onAddToCart(product);
    setTimeout(() => {
      setAnimatingProductId(null);
    }, 250);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2">
      {/* Info Tienda Activa */}
      <div className="pt-2 pb-1">
        <div className="bg-white p-3.5 rounded-2xl shadow-xs flex flex-col gap-1 border border-[#e8eeff]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#adf0a6] flex items-center justify-center flex-shrink-0 text-[#326f34]">
                <span className="material-symbols-outlined text-[18px]">store</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="font-bold text-[16px] text-[#021b3d] truncate">Tienda La Esperanza</h2>
                <p className="text-[12px] text-[#3d4a41] truncate">Barrio Los Cortijos, Valledupar</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#adf0a6] text-[#326f34] text-[11px] font-bold flex items-center gap-1 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006d43] animate-pulse"></span>
              Abierto ahora
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1 text-[#3d4a41] text-[12px]">
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#006d43]">moped</span>
              15-25 min
            </span>
            <span className="text-[#bccabe]">•</span>
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#8f4e00]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              4.9 (120+ pedidos)
            </span>
          </div>
        </div>
      </div>

      {/* Buscador y Filtro */}
      <div className="pt-2 pb-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a70] text-[20px]">
              search
            </span>
            <input
              className="w-full h-11 pl-10 pr-4 bg-white rounded-full text-[14px] text-[#021b3d] placeholder:text-[#6d7a70] focus:outline-none focus:ring-2 focus:ring-[#0fa76b]/20 border border-[#dfe8ff] shadow-xs transition-all"
              placeholder="Buscar arroz, aceite, leche, gaseosa..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7a70] hover:text-[#021b3d]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
          <button
            aria-label="Filtrar catálogo"
            onClick={() => setShowFilterModal(true)}
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#3d4a41] hover:text-[#006d43] shadow-xs flex-shrink-0 active:scale-95 transition-transform border border-[#dfe8ff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </div>

      {/* Banner Promocional */}
      <div className="pb-3">
        <div className="bg-gradient-to-r from-[#006d43] to-[#0fa76b] p-4 rounded-2xl shadow-sm text-white flex items-center justify-between relative overflow-hidden">
          <div className="flex flex-col z-10 pr-2">
            <span className="text-[11px] font-bold text-[#aff3a9] uppercase tracking-wider">
              ¡EL VECINO TE CONSIENTE!
            </span>
            <p className="text-[18px] font-extrabold leading-tight mt-0.5">Domicilio GRATIS</p>
            <p className="text-[12px] text-white/90 mt-0.5">Por compras mayores a $25.000 en el barrio</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 z-10 backdrop-blur-xs">
            <span className="material-symbols-outlined text-[28px] text-[#aff3a9]" style={{ fontVariationSettings: "'FILL' 1" }}>
              shopping_bag
            </span>
          </div>
          <div className="absolute -right-4 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none"></div>
        </div>
      </div>

      {/* Carrusel de Categorías */}
      <div className="w-full pb-3 -mx-4 px-4 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 py-0.5 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold flex-shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#0fa76b] text-white border-[#0fa76b]'
                    : 'bg-white text-[#3d4a41] border-[#dfe8ff] hover:bg-[#f1f3ff]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isActive ? 'text-white' : 'text-[#6d7a70]'
                  }`}
                >
                  {cat.icon}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cuadrícula de 2 columnas de Productos */}
      <div className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[16px] text-[#021b3d] font-bold">
            {selectedCategory} Populares
          </span>
          <span className="text-[12px] text-[#006d43] font-semibold">
            {filteredProducts.length} productos
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#dfe8ff] flex flex-col items-center">
            <span className="material-symbols-outlined text-[40px] text-[#6d7a70] mb-2">search_off</span>
            <p className="text-[14px] font-bold text-[#021b3d]">No encontramos productos</p>
            <p className="text-[12px] text-[#3d4a41] mt-1">Prueba buscando otro nombre o cambia de categoría.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Abarrotes');
              }}
              className="mt-3 px-4 py-1.5 bg-[#006d43] text-white text-[12px] font-bold rounded-full"
            >
              Ver todos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredProducts.map((product) => {
              const isAnimating = animatingProductId === product.id;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-2.5 flex flex-col justify-between shadow-xs relative group border border-[#e8eeff] hover:border-[#adf0a6] transition-all"
                >
                  <div>
                    <div className="w-full aspect-square bg-[#f1f3ff] rounded-xl relative overflow-hidden flex items-center justify-center mb-1.5">
                      {product.badge && (
                        <span
                          className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold z-10 ${
                            product.badgeType === 'warning'
                              ? 'bg-[#ffdcc2] text-[#6d3a00] flex items-center gap-0.5'
                              : 'bg-[#adf0a6] text-[#326f34]'
                          }`}
                        >
                          {product.badgeType === 'warning' && (
                            <span className="material-symbols-outlined text-[12px]">priority_high</span>
                          )}
                          {product.badge}
                        </span>
                      )}
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        src={product.image}
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[12px] text-[#6d7a70] font-medium">{product.unit}</span>
                    <h3 className="text-[14px] font-semibold text-[#021b3d] line-clamp-2 leading-tight mt-0.5 min-h-[36px]">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f1f3ff]">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#6d7a70] uppercase font-semibold">COP</span>
                      <span className="font-extrabold text-[18px] text-[#021b3d] leading-none">
                        {formatCOP(product.price)}
                      </span>
                    </div>
                    <button
                      aria-label={`Agregar ${product.name}`}
                      onClick={() => handleAddWithFeedback(product)}
                      className={`w-9 h-9 rounded-full bg-[#0fa76b] text-white flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer ${
                        isAnimating ? 'scale-75 bg-[#006d43]' : 'hover:bg-[#006d43]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Botón Flotante Resumen Canasta (Encima del nav fijo) */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-20 inset-x-0 z-40 px-4 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button
              onClick={() => onNavigate('cart')}
              className="w-full h-14 bg-[#1b3053] hover:bg-[#12284a] rounded-full shadow-xl flex items-center justify-between px-4 text-white active:scale-[0.98] transition-transform group cursor-pointer border border-white/15"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#0fa76b] flex items-center justify-center text-[12px] font-bold text-white shadow-sm">
                  {totalItemsCount}
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[12px] text-[#e8eeff] font-semibold">Ver Canasta</span>
                  <span className="text-[11px] text-[#d7e3ff] font-normal">
                    {totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[16px] font-extrabold tracking-tight">
                  {formatCOP(cartTotal)}
                </span>
                <span className="material-symbols-outlined text-[20px] text-[#7bfbb6] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-xl border border-[#dfe8ff] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[16px] text-[#021b3d]">Filtros del Catálogo</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-8 h-8 rounded-full bg-[#e8eeff] flex items-center justify-center text-[#021b3d]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[12px] font-bold text-[#021b3d] block mb-2">
                  Solo productos disponibles
                </label>
                <button
                  onClick={() => setOnlyInStock(!onlyInStock)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[13px] font-semibold w-full ${
                    onlyInStock
                      ? 'bg-[#adf0a6]/50 border-[#0fa76b] text-[#006d43]'
                      : 'bg-white border-[#dfe8ff] text-[#3d4a41]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {onlyInStock ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span>Mostrar solo en stock de Don Luis</span>
                </button>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setOnlyInStock(false);
                    setSelectedCategory('Todos');
                    setShowFilterModal(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-[#e8eeff] text-[#021b3d] text-[13px] font-bold"
                >
                  Limpiar
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 py-2.5 rounded-full bg-[#006d43] text-white text-[13px] font-bold"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
