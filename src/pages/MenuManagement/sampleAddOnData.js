// sampleAddOnData.js
export const sampleAddOnData = [
  {
    id: '1',
    name: 'Boba Toppings',
    connectedDishIds: ['1', '3'], // Connected to Classic Milk Tea and Taro Milk Tea
    items: [
      { id: '1-1', name: 'Pearl', chineseName: '珍珠', price: 0.5 },
      { id: '1-2', name: 'Pudding', chineseName: '布丁', price: 0.75 }
    ]
  },
  {
    id: '2',
    name: 'Tea Base',
    connectedDishIds: ['2'], // Connected to Thai Tea
    items: [
      { id: '2-1', name: 'Oolong Tea', chineseName: '烏龍茶', price: 1.0 }
    ]
  }
];

export const sampleDishes = [
  { id: '1', name: 'Classic Milk Tea' },
  { id: '2', name: 'Thai Tea' },
  { id: '3', name: 'Taro Milk Tea' }
];