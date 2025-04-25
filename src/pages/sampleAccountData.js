import { generateClient } from 'aws-amplify/api';
import { getAccount } from '../graphql/queries'; // Your GraphQL query

const client = generateClient();

// This will fetch the data when imported
const fetchAccountData = async () => {
  try {
    const { data } = await client.graphql({
      query: getAccount,
      variables: { id: 'adc965b1-9a47-4d0a-ad63-05a89b5bf7c3' }
    });
    return data.getAccount;
  } catch (error) {
    // console.error('Error fetching account:', error);
    // Fallback to default data if API fails
    return {
      id: 'adc965b1-9a47-4d0a-ad63-05a89b5bf7c3',
      name: 'Sunshine Cafe',
      foreignName: '陽光咖啡館',
      subtitle: 'Cozy & Delicious',
      marketingMessage: 'Your happy place for coffee & bites.',
      foreignMarketingMessage: '您享受咖啡與點心的快樂天地',
      phoneNumber: '(123) 456-7890',
      slogan: 'Brewed with love',
      language: 'English',
      description: 'A local favorite offering specialty drinks and fresh pastries.',
      foreignDescription: '提供特色飲品與新鮮糕點的當地人氣店',
      exclusive: true,
      grocery: false,
      newGroceryDesign: false,
      note: 'Open 7 days a week',
      priorityLevel: '1',
      pickupInstructionsEn: 'Please call when you arrive.',
      pickupInstructionsZh: '到達時請來電通知。',
      kioskButtonColor: '#FFD700',
      taxCode: 'TX-78945',
      remindCall: true,
      address: '123 Main St, Sunnyvale, CA 94086',
      orderRevealTime: '15',
      preorderRevealTime: '60',
      cutoffRevealTime: '30',
      pickupRevealTime: '10',
      spendingPerPoint: '5',
      stripePayoutAccount: 'acct_1XYZABCDEF',
      restaurantWifi: 'SunshineCafe_Guest',
      payoutMode: 'weekly',
      paymentChannel: 'Stripe',
      pixiuMerchantAccount: 'pixiu_merchant_456',
      ownerFirstName: 'Amy',
      ownerLastName: 'Wong',
      ownerEmail: 'amy.wong@sunshinecafe.com'
    };
  }
};

// Immediately Invoked Function Expression (IIFE) to fetch data
const sampleAccountData = await (async () => {
  const data = await fetchAccountData();
  return [data]; // Return as array to match your original structure
})();

export default sampleAccountData;