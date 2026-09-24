/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Screen,
  UserRole,
  Product,
  CartItem,
  Order,
  OrderStep,
  FiadoAccount,
} from './types';
import {
  PRODUCTS,
  INITIAL_CART,
  INITIAL_ACTIVE_ORDER,
  INITIAL_PAST_ORDERS,
  INITIAL_FIADO_ACCOUNT,
} from './data/initialData';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { CartScreen } from './components/CartScreen';
import { DeliveryScreen } from './components/DeliveryScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { FiadosScreen } from './components/FiadosScreen';
import { TenderoDashboard } from './components/TenderoDashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userRole, setUserRole] = useState<UserRole>('vecino');

  // Cart & Order State
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [cartNotes, setCartNotes] = useState<string>(
    'Que la leche esté bien fría, plátanos pintones, aguacate listo para hoy...'
  );
  const [deliveryType, setDeliveryType] = useState<'domicilio' | 'tienda'>('domicilio');
  const [address, setAddress] = useState<string>('Carrera 12 # 13B - 45');
  const [deliveryNotes, setDeliveryNotes] = useState<string>(
    'Casa blanca con rejas negras frente al parque'
  );
  const [paymentMethod, setPaymentMethod] = useState<'fiado' | 'efectivo' | 'transferencia'>(
    'fiado'
  );
  const [cashChangeAmount, setCashChangeAmount] = useState<string>('Exacto');

  // Orders State
  const [activeOrder, setActiveOrder] = useState<Order>(INITIAL_ACTIVE_ORDER);
  const [pastOrders, setPastOrders] = useState<Order[]>(INITIAL_PAST_ORDERS);

  // Fiados Ledger State
  const [fiadoAccount, setFiadoAccount] = useState<FiadoAccount>(INITIAL_FIADO_ACCOUNT);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Checkout Handlers
  const handleConfirmOrder = () => {
    const subtotalProducts = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const discount = subtotalProducts >= 15000 ? 1000 : 0;
    const deliveryCost = deliveryType === 'domicilio' ? 2000 : 0;
    const finalTotal = Math.max(0, subtotalProducts - discount) + deliveryCost;

    const newOrderNumber = Math.floor(10000 + Math.random() * 90000);
    const orderItemsSummary = cart.map((item) => ({
      name: item.product.name,
      unit: item.product.unit,
      quantity: item.quantity,
      price: item.product.price,
      subtotal: item.product.price * item.quantity,
    }));

    const newOrder: Order = {
      id: `CL${newOrderNumber}`,
      createdAt: new Date().toISOString(),
      timeStr: 'Hoy, ' + new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      storeName: 'Don Luis - Tienda La Esperanza',
      storeNeighborhood: 'Barrio Los Cortijos',
      shopkeeperName: 'Don Luis Pinedo',
      shopkeeperPhone: '+573012345678',
      items: orderItemsSummary.length > 0 ? orderItemsSummary : activeOrder.items,
      subtotal: subtotalProducts > 0 ? subtotalProducts : 17600,
      discount: discount > 0 ? discount : 1000,
      deliveryCost,
      total: finalTotal > 0 ? finalTotal : 18600,
      deliveryType,
      address,
      notes: deliveryNotes || cartNotes,
      paymentMethod,
      cashChangeAmount: paymentMethod === 'efectivo' ? cashChangeAmount : undefined,
      status: 'preparacion',
      statusText: 'Don Luis está empacando tus víveres',
      estimatedDeliveryTime: '~11:15 AM',
    };

    setActiveOrder(newOrder);

    // If fiado, register movement in ledger
    if (paymentMethod === 'fiado') {
      setFiadoAccount((prev) => ({
        ...prev,
        usedAmount: prev.usedAmount + newOrder.total,
        movements: [
          {
            id: `tx-${Date.now()}`,
            title: `Víveres (#${newOrder.id})`,
            subtitle: `${orderItemsSummary.slice(0, 2).map((i) => i.name).join(', ')} (${orderItemsSummary.length} art.)`,
            dateStr: 'Hoy, ' + new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
            amount: newOrder.total,
            type: 'charge',
            badgeText: 'Cargado',
          },
          ...prev.movements,
        ],
      }));
    }

    setCurrentScreen('confirmation');
  };

  // Reorder
  const handleReorder = (order: Order) => {
    // Add items from order to cart
    const newItems: CartItem[] = [];
    order.items.forEach((oi) => {
      const match = PRODUCTS.find((p) => p.name.includes(oi.name) || oi.name.includes(p.name)) || PRODUCTS[0];
      newItems.push({
        product: match,
        quantity: oi.quantity,
      });
    });
    setCart(newItems);
  };

  // Make Abono
  const handleMakeAbono = (amount: number, method: string) => {
    setFiadoAccount((prev) => ({
      ...prev,
      usedAmount: Math.max(0, prev.usedAmount - amount),
      movements: [
        {
          id: `tx-abono-${Date.now()}`,
          title: `Abono por ${method}`,
          subtitle: method === 'Nequi' ? `Comp. ref #NQ-${Math.floor(100000 + Math.random() * 900000)}` : 'Caja con Don Luis',
          dateStr: 'Hoy, ' + new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          amount: -amount,
          type: 'payment',
          badgeText: 'Abono aplicado',
        },
        ...prev.movements,
      ],
    }));
  };

  // Status Advance (Simulation)
  const handleAdvanceOrderStep = () => {
    const seq: OrderStep[] = ['recibido', 'confirmado', 'preparacion', 'en_camino', 'entregado'];
    const curIdx = seq.indexOf(activeOrder.status);
    const nextStep = seq[(curIdx + 1) % seq.length];
    const statusDescMap: Record<OrderStep, string> = {
      recibido: 'Tu pedido fue registrado en el sistema',
      confirmado: 'Don Luis confirmó y aceptó el pedido',
      preparacion: 'Don Luis está empacando tus víveres',
      en_camino: 'Domiciliario de confianza en ruta hacia tu casa',
      entregado: 'Entregado en tu puerta con éxito',
    };
    setActiveOrder((prev) => ({
      ...prev,
      status: nextStep,
      statusText: statusDescMap[nextStep],
    }));
  };

  // Role toggle
  const handleToggleRole = () => {
    if (userRole === 'vecino') {
      setUserRole('tendero');
      setCurrentScreen('tendero');
    } else {
      setUserRole('vecino');
      setCurrentScreen('catalog');
    }
  };

  const getHeaderSubtitle = (screen: Screen) => {
    switch (screen) {
      case 'catalog':
        return 'Catalogo De Productos';
      case 'cart':
        return 'Canasta De Compras';
      case 'delivery':
        return 'Tipo de Entrega';
      case 'payment':
        return 'Método de Pago';
      case 'confirmation':
        return 'Pedido Confirmado';
      case 'orders':
        return 'Mis Pedidos';
      case 'fiados':
        return 'Mis Fiados';
      case 'tendero':
        return 'Gestión Tendero';
      default:
        return 'Valledupar';
    }
  };

  const showTopHeader =
    currentScreen !== 'welcome' && currentScreen !== 'login';
  const showBottomNav =
    currentScreen !== 'welcome' &&
    currentScreen !== 'login' &&
    currentScreen !== 'tendero';

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#021b3d] flex flex-col justify-between selection:bg-[#adf0a6] selection:text-[#00331d]">
      {/* Interactive Screen Switcher for reviewing all 10 mockups */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          if (screen === 'tendero') setUserRole('tendero');
          else if (userRole === 'tendero') setUserRole('vecino');
          setCurrentScreen(screen);
        }}
      />

      {/* Top Header */}
      {showTopHeader && (
        <TopHeader
          subtitle={getHeaderSubtitle(currentScreen)}
          onNavigate={(s) => setCurrentScreen(s)}
          userRole={userRole}
          onToggleRole={handleToggleRole}
        />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${showTopHeader ? 'pt-16' : ''}`}>
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onSelectRole={(role, targetScreen) => {
              setUserRole(role);
              setCurrentScreen(targetScreen);
            }}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onNavigate={(s) => setCurrentScreen(s)}
            onLoginSuccess={() => {
              setUserRole('vecino');
            }}
          />
        )}

        {currentScreen === 'catalog' && (
          <CatalogScreen
            cart={cart}
            onAddToCart={handleAddToCart}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        )}

        {currentScreen === 'cart' && (
          <CartScreen
            cart={cart}
            notes={cartNotes}
            onUpdateNotes={setCartNotes}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        )}

        {currentScreen === 'delivery' && (
          <DeliveryScreen
            cart={cart}
            deliveryType={deliveryType}
            address={address}
            deliveryNotes={deliveryNotes}
            onUpdateDeliveryType={setDeliveryType}
            onUpdateAddress={setAddress}
            onUpdateDeliveryNotes={setDeliveryNotes}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        )}

        {currentScreen === 'payment' && (
          <PaymentScreen
            cart={cart}
            deliveryType={deliveryType}
            address={address}
            paymentMethod={paymentMethod}
            cashChangeAmount={cashChangeAmount}
            onUpdatePaymentMethod={setPaymentMethod}
            onUpdateCashChange={setCashChangeAmount}
            onConfirmOrder={handleConfirmOrder}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        )}

        {currentScreen === 'confirmation' && (
          <ConfirmationScreen
            order={activeOrder}
            onNavigate={(s) => setCurrentScreen(s)}
          />
        )}

        {currentScreen === 'orders' && (
          <OrdersScreen
            activeOrder={activeOrder}
            pastOrders={pastOrders}
            onReorder={handleReorder}
            onAdvanceStep={handleAdvanceOrderStep}
          />
        )}

        {currentScreen === 'fiados' && (
          <FiadosScreen
            fiadoAccount={fiadoAccount}
            onMakeAbono={handleMakeAbono}
          />
        )}

        {currentScreen === 'tendero' && (
          <TenderoDashboard
            activeOrder={activeOrder}
            onUpdateOrderStatus={(st) => {
              setActiveOrder((prev) => ({
                ...prev,
                status: st,
                statusText:
                  st === 'recibido'
                    ? 'Pedido recibido'
                    : st === 'confirmado'
                    ? 'Pedido confirmado'
                    : st === 'preparacion'
                    ? 'Don Luis está empacando tus víveres'
                    : st === 'en_camino'
                    ? 'En camino con domiciliario de confianza'
                    : 'Entregado en tu puerta',
              }));
            }}
            onNavigate={(s) => setCurrentScreen(s)}
            onSelectRole={(r) => setUserRole(r)}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation Bar */}
      {showBottomNav && (
        <BottomNavBar
          currentScreen={currentScreen}
          cartCount={cartTotalCount}
          onNavigate={(s) => setCurrentScreen(s)}
        />
      )}
    </div>
  );
}
