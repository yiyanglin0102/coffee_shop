import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Divider
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { sampleTransactionsData } from './sampleTransactionsData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const RestaurantAnalytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState('week');
  const [processedData, setProcessedData] = useState({});

  useEffect(() => {
    // Process transaction data
    const processData = () => {
      const data = {
        dailySales: {},
        paymentMethods: {},
        topItems: {},
        hourlySales: Array(24).fill(0).map((_, i) => ({ hour: i, sales: 0 })),
        tipsData: { total: 0, byMethod: {} },
        refunds: 0,
        taxes: { included: 0, excluded: 0 },
        netSales: 0,
        grossSales: 0
      };

      sampleTransactionsData.forEach(transaction => {
        const date = transaction.createdTime.split(' ')[0];
        const hour = parseInt(transaction.createdTime.split(' ')[1].split(':')[0]);
        
        // Daily sales
        data.dailySales[date] = (data.dailySales[date] || 0) + transaction.total;
        
        // Payment methods
        data.paymentMethods[transaction.paymentMethod] = 
          (data.paymentMethods[transaction.paymentMethod] || 0) + transaction.total;
        
        // Hourly sales
        data.hourlySales[hour].sales += transaction.total;
        
        // Tips
        data.tipsData.total += transaction.tips;
        data.tipsData.byMethod[transaction.paymentMethod] = 
          (data.tipsData.byMethod[transaction.paymentMethod] || 0) + transaction.tips;
        
        // Refunds
        if (transaction.refundStatus !== 'none') {
          data.refunds += transaction.total;
        }
        
        // Items (assuming 8% tax rate for example)
        const taxRate = 0.08;
        const preTaxAmount = transaction.total / (1 + taxRate);
        data.taxes.included += transaction.total - preTaxAmount;
        data.taxes.excluded += preTaxAmount;
        
        // Net/Gross
        data.grossSales += transaction.total;
        data.netSales += preTaxAmount;
        
        // Top items
        transaction.items.forEach(item => {
          data.topItems[item.name] = {
            quantity: (data.topItems[item.name]?.quantity || 0) + item.quantity,
            revenue: (data.topItems[item.name]?.revenue || 0) + (item.price * item.quantity)
          };
        });
      });

      setProcessedData(data);
    };

    processData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDateRangeChange = (event, newRange) => {
    setDateRange(newRange);
  };

  // Convert objects to arrays for charts
  const paymentMethodsData = Object.entries(processedData.paymentMethods || {}).map(([name, value]) => ({ name, value }));
  const topItemsByRevenue = Object.entries(processedData.topItems || {})
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5)
    .map(([name, data]) => ({ name, value: data.revenue }));
  const topItemsByQuantity = Object.entries(processedData.topItems || {})
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .slice(0, 5)
    .map(([name, data]) => ({ name, value: data.quantity }));
  const dailySalesData = Object.entries(processedData.dailySales || {}).map(([name, value]) => ({ name, sales: value }));
  const tipsByMethodData = Object.entries(processedData.tipsData?.byMethod || {}).map(([name, value]) => ({ name, value }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Restaurant Analytics Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Gross Sales</Typography>
            <Typography variant="h4">${(processedData.grossSales || 0).toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Net Sales</Typography>
            <Typography variant="h4">${(processedData.netSales || 0).toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Tips</Typography>
            <Typography variant="h4">${(processedData.tipsData?.total || 0).toFixed(2)}</Typography>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Sales Overview" />
              <Tab label="Payment Analysis" />
              <Tab label="Menu Performance" />
              <Tab label="Hourly Trends" />
            </Tabs>
            
            <Divider sx={{ my: 2 }} />
            
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>Daily Sales</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" name="Daily Sales" />
                  </BarChart>
                </ResponsiveContainer>
                
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Tax Breakdown</Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Tax Included</TableCell>
                            <TableCell align="right">${(processedData.taxes?.included || 0).toFixed(2)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Pre-Tax Amount</TableCell>
                            <TableCell align="right">${(processedData.taxes?.excluded || 0).toFixed(2)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Refunds</Typography>
                    <Typography variant="h4" color="error">
                      ${(processedData.refunds || 0).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {tabValue === 1 && (
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Payment Methods</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={paymentMethodsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {paymentMethodsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Tips by Payment Method</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={tipsByMethodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" name="Tips" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {tabValue === 2 && (
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Top Items by Revenue</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topItemsByRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#ffc658" name="Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Top Items by Quantity</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topItemsByQuantity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#ff8042" name="Quantity Sold" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Grid>
                </Grid>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Full Item Breakdown</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">Avg. Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(processedData.topItems || {})
                        .sort((a, b) => b[1].revenue - a[1].revenue)
                        .map(([name, data]) => (
                          <TableRow key={name}>
                            <TableCell>{name}</TableCell>
                            <TableCell align="right">{data.quantity}</TableCell>
                            <TableCell align="right">${data.revenue.toFixed(2)}</TableCell>
                            <TableCell align="right">${(data.revenue / data.quantity).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            
            {tabValue === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>Hourly Sales Trends</Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={processedData.hourlySales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RestaurantAnalytics;