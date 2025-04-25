// sampleTransactionsData.js
export const sampleTransactionsData = [
  {
    id: 'trans-001',
    createdTime: '04-01-2025 08:15',
    orderNumber: 'ORD-1001',
    lastFour: '4242',
    paymentMethod: 'creditCard',
    tips: 2.5,
    total: 14.75,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Classic Milk Tea', price: 4.5, quantity: 2 },
      { name: 'Boba Toppings', price: 0.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-002',
    createdTime: '04-01-2025 09:30',
    orderNumber: 'ORD-1002',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 8.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Thai Tea', price: 5.0, quantity: 1 },
      { name: 'Herbal Jelly', price: 0.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-003',
    createdTime: '04-01-2025 10:45',
    orderNumber: 'ORD-1003',
    lastFour: '1357',
    paymentMethod: 'creditCard',
    tips: 1.0,
    total: 11.25,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'partial',
    items: [
      { name: 'Matcha Latte', price: 5.5, quantity: 1 },
      { name: 'Red Bean', price: 0.75, quantity: 1 }
    ]
  },
  // Continued with 97 more transactions...
  {
    id: 'trans-004',
    createdTime: '04-01-2025 11:20',
    orderNumber: 'ORD-1004',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.5,
    total: 9.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Wintermelon Tea', price: 4.0, quantity: 2 }
    ]
  },
  {
    id: 'trans-005',
    createdTime: '04-01-2025 12:05',
    orderNumber: 'ORD-1005',
    lastFour: '9876',
    paymentMethod: 'creditCard',
    tips: 3.0,
    total: 18.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Brown Sugar Boba', price: 5.75, quantity: 2 },
      { name: 'Pudding', price: 0.75, quantity: 2 }
    ]
  },
  {
    id: 'trans-006',
    createdTime: '04-01-2025 12:30',
    orderNumber: 'ORD-1006',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 6.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Honey Lemon Tea', price: 4.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-007',
    createdTime: '04-01-2025 13:15',
    orderNumber: 'ORD-1007',
    lastFour: '2468',
    paymentMethod: 'creditCard',
    tips: 2.0,
    total: 14.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Taro Milk Tea', price: 5.25, quantity: 2 },
      { name: 'Boba', price: 0.5, quantity: 2 }
    ]
  },
  {
    id: 'trans-008',
    createdTime: '04-01-2025 14:00',
    orderNumber: 'ORD-1008',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.0,
    total: 7.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Jasmine Green Tea', price: 3.5, quantity: 2 }
    ]
  },
  {
    id: 'trans-009',
    createdTime: '04-01-2025 14:45',
    orderNumber: 'ORD-1009',
    lastFour: '3579',
    paymentMethod: 'creditCard',
    tips: 0.0,
    total: 12.75,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'full',
    items: [
      { name: 'Strawberry Smoothie', price: 6.0, quantity: 1 },
      { name: 'Rainbow Jelly', price: 0.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-010',
    createdTime: '04-01-2025 15:30',
    orderNumber: 'ORD-1010',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 2.0,
    total: 10.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Mango Green Tea', price: 5.0, quantity: 2 }
    ]
  },
  // Additional transactions with more varied data...
  {
    id: 'trans-011',
    createdTime: '04-01-2025 16:15',
    orderNumber: 'ORD-1011',
    lastFour: '8642',
    paymentMethod: 'creditCard',
    tips: 1.5,
    total: 9.25,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Oolong Milk Tea', price: 4.75, quantity: 1 },
      { name: 'Coffee Jelly', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-012',
    createdTime: '04-02-2025 09:00',
    orderNumber: 'ORD-1012',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 15.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Classic Milk Tea', price: 4.5, quantity: 3 }
    ]
  },
  {
    id: 'trans-013',
    createdTime: '04-02-2025 10:30',
    orderNumber: 'ORD-1013',
    lastFour: '1593',
    paymentMethod: 'creditCard',
    tips: 3.0,
    total: 21.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Thai Tea', price: 5.0, quantity: 2 },
      { name: 'Boba', price: 0.5, quantity: 2 },
      { name: 'Pudding', price: 0.75, quantity: 2 }
    ]
  },
  {
    id: 'trans-014',
    createdTime: '04-02-2025 11:45',
    orderNumber: 'ORD-1014',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.0,
    total: 6.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Matcha Latte', price: 5.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-015',
    createdTime: '04-02-2025 12:30',
    orderNumber: 'ORD-1015',
    lastFour: '7531',
    paymentMethod: 'creditCard',
    tips: 2.5,
    total: 14.25,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Wintermelon Tea', price: 4.0, quantity: 2 },
      { name: 'Aloe Vera', price: 0.75, quantity: 1 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-016',
    createdTime: '04-02-2025 13:20',
    orderNumber: 'ORD-1016',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 5.75,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Brown Sugar Boba', price: 5.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-017',
    createdTime: '04-02-2025 14:10',
    orderNumber: 'ORD-1017',
    lastFour: '2460',
    paymentMethod: 'creditCard',
    tips: 1.0,
    total: 7.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Honey Lemon Tea', price: 4.5, quantity: 1 },
      { name: 'Lychee Jelly', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-018',
    createdTime: '04-02-2025 15:00',
    orderNumber: 'ORD-1018',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 2.0,
    total: 12.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Taro Milk Tea', price: 5.25, quantity: 2 },
      { name: 'Red Bean', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-019',
    createdTime: '04-02-2025 16:15',
    orderNumber: 'ORD-1019',
    lastFour: '8888',
    paymentMethod: 'creditCard',
    tips: 0.0,
    total: 10.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'partial',
    items: [
      { name: 'Jasmine Green Tea', price: 3.5, quantity: 2 },
      { name: 'Herbal Jelly', price: 0.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-020',
    createdTime: '04-02-2025 17:30',
    orderNumber: 'ORD-1020',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.5,
    total: 8.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Strawberry Smoothie', price: 6.0, quantity: 1 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-021',
    createdTime: '04-03-2025 08:45',
    orderNumber: 'ORD-1021',
    lastFour: '4321',
    paymentMethod: 'creditCard',
    tips: 2.0,
    total: 12.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Mango Green Tea', price: 5.0, quantity: 2 },
      { name: 'Coconut Jelly', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-022',
    createdTime: '04-03-2025 09:30',
    orderNumber: 'ORD-1022',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 9.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Oolong Milk Tea', price: 4.75, quantity: 2 }
    ]
  },
  {
    id: 'trans-023',
    createdTime: '04-03-2025 10:45',
    orderNumber: 'ORD-1023',
    lastFour: '6789',
    paymentMethod: 'creditCard',
    tips: 3.0,
    total: 18.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Classic Milk Tea', price: 4.5, quantity: 3 },
      { name: 'Boba', price: 0.5, quantity: 3 }
    ]
  },
  {
    id: 'trans-024',
    createdTime: '04-03-2025 11:20',
    orderNumber: 'ORD-1024',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.0,
    total: 6.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Thai Tea', price: 5.0, quantity: 1 }
    ]
  },
  {
    id: 'trans-025',
    createdTime: '04-03-2025 12:15',
    orderNumber: 'ORD-1025',
    lastFour: '1350',
    paymentMethod: 'creditCard',
    tips: 2.5,
    total: 14.75,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Matcha Latte', price: 5.5, quantity: 2 },
      { name: 'Red Bean', price: 0.75, quantity: 1 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-026',
    createdTime: '04-03-2025 13:30',
    orderNumber: 'ORD-1026',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 8.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Wintermelon Tea', price: 4.0, quantity: 2 }
    ]
  },
  {
    id: 'trans-027',
    createdTime: '04-03-2025 14:45',
    orderNumber: 'ORD-1027',
    lastFour: '2468',
    paymentMethod: 'creditCard',
    tips: 1.5,
    total: 9.25,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Brown Sugar Boba', price: 5.75, quantity: 1 },
      { name: 'Pudding', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-028',
    createdTime: '04-03-2025 15:30',
    orderNumber: 'ORD-1028',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 2.0,
    total: 10.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Honey Lemon Tea', price: 4.5, quantity: 2 }
    ]
  },
  {
    id: 'trans-029',
    createdTime: '04-03-2025 16:15',
    orderNumber: 'ORD-1029',
    lastFour: '9870',
    paymentMethod: 'creditCard',
    tips: 0.0,
    total: 11.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'full',
    items: [
      { name: 'Taro Milk Tea', price: 5.25, quantity: 2 }
    ]
  },
  {
    id: 'trans-030',
    createdTime: '04-03-2025 17:00',
    orderNumber: 'ORD-1030',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.0,
    total: 7.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Jasmine Green Tea', price: 3.5, quantity: 2 },
      { name: 'Herbal Jelly', price: 0.5, quantity: 1 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-031',
    createdTime: '04-04-2025 08:30',
    orderNumber: 'ORD-1031',
    lastFour: '3579',
    paymentMethod: 'creditCard',
    tips: 2.0,
    total: 14.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Strawberry Smoothie', price: 6.0, quantity: 2 }
    ]
  },
  {
    id: 'trans-032',
    createdTime: '04-04-2025 09:45',
    orderNumber: 'ORD-1032',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 5.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Mango Green Tea', price: 5.0, quantity: 1 }
    ]
  },
  {
    id: 'trans-033',
    createdTime: '04-04-2025 10:30',
    orderNumber: 'ORD-1033',
    lastFour: '8640',
    paymentMethod: 'creditCard',
    tips: 1.5,
    total: 10.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Oolong Milk Tea', price: 4.75, quantity: 2 }
    ]
  },
  {
    id: 'trans-034',
    createdTime: '04-04-2025 11:15',
    orderNumber: 'ORD-1034',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 13.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Classic Milk Tea', price: 4.5, quantity: 3 }
    ]
  },
  {
    id: 'trans-035',
    createdTime: '04-04-2025 12:00',
    orderNumber: 'ORD-1035',
    lastFour: '1590',
    paymentMethod: 'creditCard',
    tips: 3.0,
    total: 21.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Thai Tea', price: 5.0, quantity: 2 },
      { name: 'Boba', price: 0.5, quantity: 2 },
      { name: 'Pudding', price: 0.75, quantity: 2 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-036',
    createdTime: '04-04-2025 13:30',
    orderNumber: 'ORD-1036',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.0,
    total: 6.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Matcha Latte', price: 5.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-037',
    createdTime: '04-04-2025 14:15',
    orderNumber: 'ORD-1037',
    lastFour: '7530',
    paymentMethod: 'creditCard',
    tips: 2.5,
    total: 14.25,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Wintermelon Tea', price: 4.0, quantity: 2 },
      { name: 'Aloe Vera', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-038',
    createdTime: '04-04-2025 15:00',
    orderNumber: 'ORD-1038',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 5.75,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Brown Sugar Boba', price: 5.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-039',
    createdTime: '04-04-2025 16:15',
    orderNumber: 'ORD-1039',
    lastFour: '2460',
    paymentMethod: 'creditCard',
    tips: 1.0,
    total: 7.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Honey Lemon Tea', price: 4.5, quantity: 1 },
      { name: 'Lychee Jelly', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-040',
    createdTime: '04-04-2025 17:30',
    orderNumber: 'ORD-1040',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 2.0,
    total: 12.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Taro Milk Tea', price: 5.25, quantity: 2 },
      { name: 'Red Bean', price: 0.75, quantity: 1 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-041',
    createdTime: '04-05-2025 08:45',
    orderNumber: 'ORD-1041',
    lastFour: '8880',
    paymentMethod: 'creditCard',
    tips: 0.0,
    total: 10.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'partial',
    items: [
      { name: 'Jasmine Green Tea', price: 3.5, quantity: 2 },
      { name: 'Herbal Jelly', price: 0.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-042',
    createdTime: '04-05-2025 09:30',
    orderNumber: 'ORD-1042',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.5,
    total: 8.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Strawberry Smoothie', price: 6.0, quantity: 1 }
    ]
  },
  {
    id: 'trans-043',
    createdTime: '04-05-2025 10:45',
    orderNumber: 'ORD-1043',
    lastFour: '4320',
    paymentMethod: 'creditCard',
    tips: 2.0,
    total: 12.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Mango Green Tea', price: 5.0, quantity: 2 },
      { name: 'Coconut Jelly', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-044',
    createdTime: '04-05-2025 11:30',
    orderNumber: 'ORD-1044',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 9.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Oolong Milk Tea', price: 4.75, quantity: 2 }
    ]
  },
  {
    id: 'trans-045',
    createdTime: '04-05-2025 12:15',
    orderNumber: 'ORD-1045',
    lastFour: '6780',
    paymentMethod: 'creditCard',
    tips: 3.0,
    total: 18.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Classic Milk Tea', price: 4.5, quantity: 3 },
      { name: 'Boba', price: 0.5, quantity: 3 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-046',
    createdTime: '04-05-2025 13:30',
    orderNumber: 'ORD-1046',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.0,
    total: 6.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Thai Tea', price: 5.0, quantity: 1 }
    ]
  },
  {
    id: 'trans-047',
    createdTime: '04-05-2025 14:15',
    orderNumber: 'ORD-1047',
    lastFour: '1350',
    paymentMethod: 'creditCard',
    tips: 2.5,
    total: 14.75,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Matcha Latte', price: 5.5, quantity: 2 },
      { name: 'Red Bean', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-048',
    createdTime: '04-05-2025 15:00',
    orderNumber: 'ORD-1048',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 8.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Wintermelon Tea', price: 4.0, quantity: 2 }
    ]
  },
  {
    id: 'trans-049',
    createdTime: '04-05-2025 16:15',
    orderNumber: 'ORD-1049',
    lastFour: '2460',
    paymentMethod: 'creditCard',
    tips: 1.5,
    total: 9.25,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Brown Sugar Boba', price: 5.75, quantity: 1 },
      { name: 'Pudding', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-050',
    createdTime: '04-05-2025 17:30',
    orderNumber: 'ORD-1050',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 2.0,
    total: 10.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Honey Lemon Tea', price: 4.5, quantity: 2 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-051',
    createdTime: '04-06-2025 08:45',
    orderNumber: 'ORD-1051',
    lastFour: '9870',
    paymentMethod: 'creditCard',
    tips: 0.0,
    total: 11.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'full',
    items: [
      { name: 'Taro Milk Tea', price: 5.25, quantity: 2 }
    ]
  },
  {
    id: 'trans-052',
    createdTime: '04-06-2025 09:30',
    orderNumber: 'ORD-1052',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.0,
    total: 7.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Jasmine Green Tea', price: 3.5, quantity: 2 },
      { name: 'Herbal Jelly', price: 0.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-053',
    createdTime: '04-06-2025 10:45',
    orderNumber: 'ORD-1053',
    lastFour: '3570',
    paymentMethod: 'creditCard',
    tips: 2.0,
    total: 14.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Strawberry Smoothie', price: 6.0, quantity: 2 }
    ]
  },
  {
    id: 'trans-054',
    createdTime: '04-06-2025 11:30',
    orderNumber: 'ORD-1054',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 5.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Mango Green Tea', price: 5.0, quantity: 1 }
    ]
  },
  {
    id: 'trans-055',
    createdTime: '04-06-2025 12:15',
    orderNumber: 'ORD-1055',
    lastFour: '8640',
    paymentMethod: 'creditCard',
    tips: 1.5,
    total: 10.0,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Oolong Milk Tea', price: 4.75, quantity: 2 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-056',
    createdTime: '04-06-2025 13:30',
    orderNumber: 'ORD-1056',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 13.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Classic Milk Tea', price: 4.5, quantity: 3 }
    ]
  },
  {
    id: 'trans-057',
    createdTime: '04-06-2025 14:15',
    orderNumber: 'ORD-1057',
    lastFour: '1590',
    paymentMethod: 'creditCard',
    tips: 3.0,
    total: 21.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Thai Tea', price: 5.0, quantity: 2 },
      { name: 'Boba', price: 0.5, quantity: 2 },
      { name: 'Pudding', price: 0.75, quantity: 2 }
    ]
  },
  {
    id: 'trans-058',
    createdTime: '04-06-2025 15:00',
    orderNumber: 'ORD-1058',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 1.0,
    total: 6.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Matcha Latte', price: 5.5, quantity: 1 }
    ]
  },
  {
    id: 'trans-059',
    createdTime: '04-06-2025 16:15',
    orderNumber: 'ORD-1059',
    lastFour: '7530',
    paymentMethod: 'creditCard',
    tips: 2.5,
    total: 14.25,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Wintermelon Tea', price: 4.0, quantity: 2 },
      { name: 'Aloe Vera', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-060',
    createdTime: '04-06-2025 17:30',
    orderNumber: 'ORD-1060',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 0.0,
    total: 5.75,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Brown Sugar Boba', price: 5.75, quantity: 1 }
    ]
  },
  // Continuing with more transactions...
  {
    id: 'trans-061',
    createdTime: '04-07-2025 08:45',
    orderNumber: 'ORD-1061',
    lastFour: '2460',
    paymentMethod: 'creditCard',
    tips: 1.0,
    total: 7.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Honey Lemon Tea', price: 4.5, quantity: 1 },
      { name: 'Lychee Jelly', price: 0.75, quantity: 1 }
    ]
  },
  {
    id: 'trans-062',
    createdTime: '04-07-2025 09:30',
    orderNumber: 'ORD-1062',
    lastFour: 'cash',
    paymentMethod: 'cash',
    tips: 2.0,
    total: 12.5,
    paidStatus: 'paid',
    checkoutStatus: 'completed',
    refundStatus: 'none',
    items: [
      { name: 'Taro Milk Tea', price: 5.25, quantity: 2 },
      { name: 'Red Bean', price: 0.75, quantity: 1 }
    ]
  }]