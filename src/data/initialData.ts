import { Product, CartItem, Order, FiadoAccount } from '../types';

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQMRNyWrO5XXXhKCV_rFlY-fo8JevC2T9yUPRQtskvFrsWySpCBTr-gJrupTAi06D6izofYxDcW1XvUQh2xp3YVqUrVLTmcEgvOoTAsG1n6xGigVTr0tDQHCjcg8ZcXCaV3xYvVmEEJiE58UBJIhL7O1aFm7DXu23MvDm-OmXQRqugCPIOO03vhnln0gml-Ya6GT0xFYSGCQcKc98WIfCpG7K4HtPa_oGX91dheaq5Lt7F2iwNV8mW';

export const DON_LUIS_PHOTO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAN7FVaFdI9oAj0eVQP583N3oWJA-cPgeAY2rR-DMvCPBEfL4ZF9Uw4TiAHyoyj5w0fMvK4Au_16V3CEhFoRGmVc655kcI6vM6i0jT8QRgKfLWzVrlMFk4Gnq9QdZLhpqzMeX9q0_fMlQKhVn_DM5V3W8Qvf7PBDKIzC3P3eM06ReNS86X8uYrmk19MhwoVbqQDG76fMOh5Rvgqt0Yy9y4CwqMQLocXSpxjIsKCCw_sABM2Te1uuCsF';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-arroz-diana',
    name: 'Arroz Diana con Vitamor',
    unit: '1000g',
    price: 4500,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZw-_Z8xKEns79micY1TVyH3JSzhU8PrgAU5UCLygkR0AMsDS0lcPbkdGjNSzu-k6fJxuQ6AIwf-JDqcb9iVs9bRGDcOj3nnsfrSPb8Nlg7ve5O4nI2gbTAvI2RnE1TYXfSc6uu7HjV5YlAZm_TLUvcI6Q0f4k9ZFVjCxb3cuqT-4uOJOJ_I-9KLV5s180zTIeXLhc1_ZWPZACw_sRAxBJmJtIWCWpxvj0eomGsztEZvoGItec5o9L',
    category: 'Abarrotes',
    inStock: true,
    badge: 'En stock',
    badgeType: 'success',
  },
  {
    id: 'prod-aceite-premier',
    name: 'Aceite Premier Girasol',
    unit: '900ml',
    price: 9200,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCtHzh7ouKxl54u44PzPeOhiMS5mGt_yI3dSHQ5V9Nx53wPsG-Q1QHCgYgnZbFkV1uBprPsYA0r55ZWPS61AaaQnSBSt6MbsvigSOXK602Fi08OhzqxI8pSN98IKSb8H5TLJCxMi35HeeVCfO2y1aQvOVNfWnNzagm_TM9yc9KiW3chDgh3Y3U5freH90l9FaUmjPIabU0CBG2gR-66UNbX8vLJGW79m3pDxKN9K3q6kFLYOiMt_VJN',
    category: 'Abarrotes',
    inStock: true,
    badge: 'En stock',
    badgeType: 'success',
  },
  {
    id: 'prod-leche-alqueria',
    name: 'Leche Alquería Entera',
    unit: '1.1L Bolsa',
    price: 4800,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFyTqIvsiHxE-FJ2NzsTwwhH_cE3E-r1-MVjB3vI_idOL88-jh01fFU5ZlZ_DhGFF14SfoZdLR25k2P5HcQMOBjhq1GNfRc38b3Ltb15Kd8rOozH7JFW07NoqWjrTCMFy4HLyCMrkPUDill3htYyJpIf7U-qzUOsZrjpaGgk0U10LrdKmJXvAv10x12rzYNSivpVasUUJ8vXqsmGkFz1LJA8Teq5mBPoIsOqd2C-vIPCBrVL8JiZC1',
    category: 'Lácteos y Huevos',
    inStock: true,
    badge: '¡Últimas 4!',
    badgeType: 'warning',
  },
  {
    id: 'prod-pan-bimbo',
    name: 'Pan Bimbo Artesano',
    unit: '500g Tajado',
    price: 6500,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjbfQQpjjSllsJwXAdV7XFt2qRzYFqWKTxx1hXiMY31O68wfqrYHdnx51IruwYIfGu1RjAw04FadyB1oVEOKCAFWmJbCAVV9w58PZ7k5xRrcuCkjquAptOyU8H3DBls0jMGDQOO9rtn2D17pRVv9vshsNx-UumelVMBvhG03LV4tuQSDx0vOzNtUSXRd05lxkw3VnPvRCXvl0Z--AZh0lLPGLMsyf9iFWvx63Xm5Xt2-J1RjiuEM0',
    category: 'Panadería',
    inStock: true,
    badge: 'En stock',
    badgeType: 'success',
  },
  {
    id: 'prod-postobon-manzana',
    name: 'Postobón Manzana',
    unit: '1.5L Pet',
    price: 3800,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAVY1MbS8RO_8zGQufaWMjPNLQvYn0d1vAMu561WnMwB6_v2bONFz-c36_q0rTdmqPfiG9P-B01SeL51CNQws4XpWfyQB5e4Xh6xF3DnM9kRLN8q5NT2TDaJE6JMdnh-2Enj6T8uSvt7Y2ctvNizRXGX8Y9aAjL44-_51Dfv6JR5rQY2bvOWD6xd83ekPq7CiLyqk3HR0IzBPTPyjw75cRgflUBQQ6ChfxJjb2L990OpsK2vkF5Vc_2',
    category: 'Bebidas',
    inStock: true,
    badge: 'En stock',
    badgeType: 'success',
  },
  {
    id: 'prod-huevos-aa',
    name: 'Cubeta Huevos Rojos AA',
    unit: 'Panal x30',
    price: 18500,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCEpAa6gNoptTkxDqioa3I15xW6bY93UFlHCw7zSb0dXyKbStbRbhbLhixVk4WRihm6KuSta6MhRsM4nq_AW81Pa1W4r7jebmdAUI1_787vCUT0cTPK2tHGaWzAtKOAHjiHdnOhQVkt4wVdCzQW6Ld-Q3lbtlAfs2aRtPRFuVLKhsWOW0GVk5FaPkBe_HqTYw9QmddbB_fM3A3lLUp9RVIroA5l0PDkQ7nh4IQFXhPAEsKezRYWEbGA',
    category: 'Lácteos y Huevos',
    inStock: true,
    badge: 'En stock',
    badgeType: 'success',
  },
  {
    id: 'prod-harina-pan',
    name: 'Harina P.A.N. Blanca',
    unit: '1000g',
    price: 4900,
    image:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    category: 'Abarrotes',
    inStock: true,
    badge: 'En stock',
    badgeType: 'success',
  },
  {
    id: 'prod-cafe-sello-rojo',
    name: 'Café Sello Rojo Tradicional',
    unit: '250g',
    price: 8900,
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
    category: 'Abarrotes',
    inStock: true,
    badge: 'En stock',
    badgeType: 'success',
  },
  {
    id: 'prod-clorox',
    name: 'Límpido Clorox Tradicional',
    unit: '1000ml',
    price: 4200,
    image:
      'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&auto=format&fit=crop&q=80',
    category: 'Aseo y Hogar',
    inStock: true,
    badge: 'En stock',
    badgeType: 'success',
  },
  {
    id: 'prod-platanos',
    name: 'Plátano Verde Hartón',
    unit: 'Kilo (3-4 und)',
    price: 4000,
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
    category: 'Frutas y Verduras',
    inStock: true,
    badge: 'Fresco de hoy',
    badgeType: 'success',
  }
];

export const CATEGORIES = [
  { id: 'Abarrotes', name: 'Abarrotes', icon: 'inventory_2' },
  { id: 'Lácteos y Huevos', name: 'Lácteos y Huevos', icon: 'egg' },
  { id: 'Panadería', name: 'Panadería', icon: 'bakery_dining' },
  { id: 'Bebidas', name: 'Bebidas', icon: 'local_drink' },
  { id: 'Aseo y Hogar', name: 'Aseo y Hogar', icon: 'cleaning_services' },
  { id: 'Frutas y Verduras', name: 'Frutas y Verduras', icon: 'nutrition' },
];

export const INITIAL_CART: CartItem[] = [
  {
    product: PRODUCTS[0], // Arroz Diana
    quantity: 2,
  },
  {
    product: PRODUCTS[2], // Leche Alquería
    quantity: 1,
  },
  {
    product: PRODUCTS[4], // Postobón Manzana
    quantity: 1,
  },
];

export const INITIAL_ACTIVE_ORDER: Order = {
  id: 'CL12345',
  createdAt: '2026-09-24 10:42',
  timeStr: 'Hoy, 10:42 AM',
  storeName: 'Don Luis - Tienda La Esperanza',
  storeNeighborhood: 'Barrio Los Cortijos',
  shopkeeperName: 'Don Luis Pinedo',
  shopkeeperPhone: '+573012345678',
  items: [
    {
      name: 'Arroz Diana Vitamor',
      unit: '1kg',
      quantity: 2,
      price: 4200,
      subtotal: 8400,
    },
    {
      name: 'Leche Entera Alquería',
      unit: '1.1L',
      quantity: 1,
      price: 5200,
      subtotal: 5200,
    },
    {
      name: 'Gaseosa Postobón Manzana',
      unit: '1.5L',
      quantity: 1,
      price: 5000,
      subtotal: 5000,
    },
  ],
  subtotal: 18600,
  discount: 1000,
  deliveryCost: 2000,
  total: 18600,
  deliveryType: 'domicilio',
  address: 'Carrera 12 # 13B - 45, Los Cortijos',
  notes: 'Casa blanca con rejas negras frente al parque',
  paymentMethod: 'fiado',
  status: 'preparacion',
  statusText: 'Don Luis está empacando tus víveres',
  estimatedDeliveryTime: '~11:15 AM',
};

export const INITIAL_PAST_ORDERS: Order[] = [
  {
    id: 'CL11980',
    createdAt: '2026-09-23 16:15',
    timeStr: 'Ayer, 4:15 PM',
    storeName: 'Tienda La Esperanza',
    storeNeighborhood: 'Barrio Los Cortijos',
    shopkeeperName: 'Don Luis Pinedo',
    shopkeeperPhone: '+573012345678',
    items: [
      { name: 'Aceite Premier Girasol', unit: '900ml', quantity: 2, price: 9200, subtotal: 18400 },
      { name: 'Arroz Diana', unit: '1000g', quantity: 2, price: 4500, subtotal: 9000 },
      { name: 'Pan Bimbo Artesano', unit: '500g', quantity: 1, price: 6800, subtotal: 6800 },
    ],
    subtotal: 34200,
    discount: 0,
    deliveryCost: 0,
    total: 34200,
    deliveryType: 'domicilio',
    address: 'Carrera 12 # 13B - 45, Los Cortijos',
    paymentMethod: 'transferencia',
    status: 'entregado',
    statusText: 'Entregado en tu puerta',
    estimatedDeliveryTime: 'Entregado',
  },
  {
    id: 'CL11402',
    createdAt: '2026-09-12 09:20',
    timeStr: '12 Oct, 9:20 AM',
    storeName: 'Panadería y Víveres Don Migue',
    storeNeighborhood: 'Barrio Los Cortijos',
    shopkeeperName: 'Don Migue',
    shopkeeperPhone: '+573019876543',
    items: [
      { name: 'Pan Bimbo Artesano', unit: '500g', quantity: 1, price: 6500, subtotal: 6500 },
      { name: 'Leche Alquería Entera', unit: '1.1L', quantity: 1, price: 6000, subtotal: 6000 },
    ],
    subtotal: 12500,
    discount: 0,
    deliveryCost: 0,
    total: 12500,
    deliveryType: 'tienda',
    address: 'Calle 14 # 9-20, Los Cortijos',
    paymentMethod: 'efectivo',
    status: 'entregado',
    statusText: 'Retirado en tienda',
    estimatedDeliveryTime: 'Entregado',
  },
];

export const INITIAL_FIADO_ACCOUNT: FiadoAccount = {
  usedAmount: 30600,
  totalLimit: 80000,
  dueDate: 'Quincena (15 de Octubre)',
  storeName: 'Tienda La Esperanza',
  shopkeeper: 'Don Luis Pinedo',
  neighborhood: 'B. Los Cortijos',
  movements: [
    {
      id: 'tx-1',
      title: 'Víveres (#CL12345)',
      subtitle: 'Arroz, Leche, Gaseosa (3 art.)',
      dateStr: 'Hoy, 10:45 AM',
      amount: 18600,
      type: 'charge',
      badgeText: 'Cargado',
    },
    {
      id: 'tx-2',
      title: 'Abono en efectivo',
      subtitle: 'Caja de la tienda con Don Luis',
      dateStr: '05 Oct, 6:30 PM',
      amount: -20000,
      type: 'payment',
      badgeText: 'Abono aplicado',
    },
    {
      id: 'tx-3',
      title: 'Despensa (#CL10920)',
      subtitle: 'Aceite, Huevos, Pan tajado (5 art.)',
      dateStr: '28 Sep, 4:15 PM',
      amount: 32000,
      type: 'charge',
      badgeText: 'Cargado',
    },
    {
      id: 'tx-4',
      title: 'Abono por Nequi',
      subtitle: 'Comp. ref #NQ-988421',
      dateStr: '15 Sep, 11:00 AM',
      amount: -30000,
      type: 'payment',
      badgeText: 'Ver recibo',
    },
  ],
};
