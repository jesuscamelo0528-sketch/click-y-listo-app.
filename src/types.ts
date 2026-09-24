export type Screen =
  | 'welcome'
  | 'login'
  | 'catalog'
  | 'cart'
  | 'delivery'
  | 'payment'
  | 'confirmation'
  | 'orders'
  | 'fiados'
  | 'tendero';

export type UserRole = 'vecino' | 'tendero';

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'info';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStep = 'recibido' | 'confirmado' | 'preparacion' | 'en_camino' | 'entregado';

export interface OrderItemSummary {
  name: string;
  unit: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  createdAt: string;
  timeStr: string;
  storeName: string;
  storeNeighborhood: string;
  shopkeeperName: string;
  shopkeeperPhone: string;
  items: OrderItemSummary[];
  subtotal: number;
  discount: number;
  deliveryCost: number;
  total: number;
  deliveryType: 'domicilio' | 'tienda';
  address: string;
  notes?: string;
  paymentMethod: 'fiado' | 'efectivo' | 'transferencia';
  cashChangeAmount?: string;
  status: OrderStep;
  statusText: string;
  estimatedDeliveryTime: string;
}

export interface FiadoMovement {
  id: string;
  title: string;
  subtitle: string;
  dateStr: string;
  amount: number;
  type: 'charge' | 'payment';
  badgeText: string;
}

export interface FiadoAccount {
  usedAmount: number;
  totalLimit: number;
  dueDate: string;
  storeName: string;
  shopkeeper: string;
  neighborhood: string;
  movements: FiadoMovement[];
}
