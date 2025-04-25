import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Button,
  Divider
} from '@mui/material';
import sampleAccountData from './sampleAccountData';

const AccountForm = () => {
  const [formData, setFormData] = useState(sampleAccountData[0] || {
    name: '',
    foreignName: '',
    subtitle: '',
    marketingMessage: '',
    foreignMarketingMessage: '',
    phoneNumber: '',
    slogan: '',
    language: '',
    description: '',
    foreignDescription: '',
    exclusive: false,
    grocery: false,
    newGroceryDesign: false,
    note: '',
    priorityLevel: '',
    pickupInstructionsEn: '',
    pickupInstructionsZh: '',
    kioskButtonColor: '',
    taxCode: '',
    remindCall: false,
    address: '',
    orderRevealTime: '',
    preorderRevealTime: '',
    cutoffRevealTime: '',
    pickupRevealTime: '',
    spendingPerPoint: '',
    stripePayoutAccount: '',
    restaurantWifi: '',
    payoutMode: '',
    paymentChannel: '',
    pixiuMerchantAccount: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
  });

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting:', formData);
    // Add form submission logic here
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxHeight: '80vh', overflowY: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Account Settings
      </Typography>
      <Grid container spacing={2}>
        {/* Text Fields */}
        {[
          ['Name', 'name'],
          ['Foreign Name', 'foreignName'],
          ['Subtitle', 'subtitle'],
          ['Marketing Message', 'marketingMessage'],
          ['Foreign Marketing Message', 'foreignMarketingMessage'],
          ['Phone Number', 'phoneNumber'],
          ['Slogan', 'slogan'],
          ['Language', 'language'],
          ['Description', 'description'],
          ['Foreign Description', 'foreignDescription'],
          ['Note', 'note'],
          ['Priority Level', 'priorityLevel'],
          ['Pickup Instructions - English', 'pickupInstructionsEn'],
          ['Pickup Instructions - Chinese', 'pickupInstructionsZh'],
          ['Kiosk button circle color', 'kioskButtonColor'],
          ['Tax Code', 'taxCode'],
          ['Address', 'address'],
          ['Order Reveal Time Duration', 'orderRevealTime'],
          ['Preorder Order Reveal Time Duration', 'preorderRevealTime'],
          ['Cutoff Order Reveal Time Duration', 'cutoffRevealTime'],
          ['Pickup Order Reveal Time Duration', 'pickupRevealTime'],
          ['Spending Per Point', 'spendingPerPoint'],
          ['Stripe Payout Account', 'stripePayoutAccount'],
          ['Restaurant WiFi', 'restaurantWifi'],
          ['Payout Mode', 'payoutMode'],
          ['Payment Channel', 'paymentChannel'],
          ['Pixiu Merchant Account', 'pixiuMerchantAccount'],
          ['Owner First Name', 'ownerFirstName'],
          ['Owner Last Name', 'ownerLastName'],
          ['Owner Email', 'ownerEmail']
        ].map(([label, key]) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              fullWidth
              label={label}
              value={formData[key]}
              onChange={handleChange(key)}
            />
          </Grid>
        ))}

        {/* Boolean Checkboxes */}
        {[
          ['Exclusive', 'exclusive'],
          ['Grocery', 'grocery'],
          ['Use new grocery design', 'newGroceryDesign'],
          ['Remind Call', 'remindCall']
        ].map(([label, key]) => (
          <Grid item xs={12} sm={6} key={key}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData[key]}
                  onChange={handleChange(key)}
                />
              }
              label={label}
            />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Button type="submit" variant="contained">
        Save Changes
      </Button>
    </Box>
  );
};

export default AccountForm;
