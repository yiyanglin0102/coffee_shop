// src/utils/seedMenu.js
// import { API } from 'aws-amplify';
import { createMenuItem } from '../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

const sampleMenuItems = [
  {
    id: '1',
    name: "Espresso",
    description: "Strong black coffee",
    price: 3.50,
    category: "coffee",
    isAvailable: true
  },
  {
    id: '2',
    name: "Cappuccino",
    description: "Espresso with steamed milk",
    price: 4.25,
    category: "coffee",
    isAvailable: true
  },
  {
    id: '3',
    name: "Croissant",
    description: "Buttery French pastry",
    price: 2.75,
    category: "pastry",
    isAvailable: true
  }
];

export const seedMenu = async () => {
  try {
    console.log('Seeding menu data...');
    
    for (const item of sampleMenuItems) {
      await client.graphql({
        query: createMenuItem,
        variables: { input: item },
        authMode: 'API_KEY'
      });
      console.log(`Added: ${item.name}`);
    }
    
    console.log('Menu seeding completed!');
    return true;
  } catch (error) {
    console.error('Error seeding menu:', error);
    return false;
  }
};