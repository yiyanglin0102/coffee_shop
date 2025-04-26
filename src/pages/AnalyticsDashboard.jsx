import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Divider, CircularProgress
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { generateClient } from 'aws-amplify/api';
import { listTransactions } from '../graphql/queries';

const client = generateClient();

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [processedData, setProcessedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const { data } = await client.graphql({
          query: listTransactions
        });
        processData(data.listTransactions.items);
      } catch (err) {
        setError(err);
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const processData = (transactions) => {
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

    transactions.forEach(transaction => {
      if (!transaction) return;
      
      // Parse date and time from createdAt
      const transactionDate = new Date(transaction.createdAt);
      const dateKey = transactionDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      const hour = transactionDate.getHours();
      
      const amount = parseFloat(transaction.amount) || 0;
      const tips = parseFloat(transaction.tips) || 0;
      
      // Daily sales
      data.dailySales[dateKey] = (data.dailySales[dateKey] || 0) + amount;
      
      // Payment methods (convert to lowercase for consistency)
      const paymentMethod = transaction.paymentMethod?.toLowerCase() || 'unknown';
      data.paymentMethods[paymentMethod] = 
        (data.paymentMethods[paymentMethod] || 0) + amount;
      
      // Hourly sales
      data.hourlySales[hour].sales += amount;
      
      // Tips
      data.tipsData.total += tips;
      data.tipsData.byMethod[paymentMethod] = 
        (data.tipsData.byMethod[paymentMethod] || 0) + tips;
      
      // Refunds
      if (transaction.refundStatus && transaction.refundStatus !== 'none') {
        data.refunds += amount;
      }
      
      // Tax calculation (assuming 8% tax rate)
      const taxRate = 0.08;
      const preTaxAmount = amount / (1 + taxRate);
      data.taxes.included += amount - preTaxAmount;
      data.taxes.excluded += preTaxAmount;
      
      // Net/Gross sales
      data.grossSales += amount;
      data.netSales += preTaxAmount;
      
      // Top items - check if items exist and is an array
      if (Array.isArray(transaction.items)) {
        transaction.items.forEach(item => {
          if (!item?.name) return;
          
          const itemName = item.name;
          const itemQuantity = parseInt(item.quantity) || 0;
          const itemPrice = parseFloat(item.price) || 0;
          
          data.topItems[itemName] = {
            quantity: (data.topItems[itemName]?.quantity || 0) + itemQuantity,
            revenue: (data.topItems[itemName]?.revenue || 0) + (itemPrice * itemQuantity)
          };
        });
      }
    });

    setProcessedData(data);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Convert objects to arrays for charts
  const paymentMethodsData = Object.entries(processedData.paymentMethods || {})
    .map(([name, value]) => ({ 
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
      value 
    }));

  const topItemsByRevenue = Object.entries(processedData.topItems || {})
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5)
    .map(([name, data]) => ({ name, value: data.revenue }));

  const topItemsByQuantity = Object.entries(processedData.topItems || {})
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .slice(0, 5)
    .map(([name, data]) => ({ name, value: data.quantity }));

  const dailySalesData = Object.entries(processedData.dailySales || {})
    .map(([name, value]) => ({ 
      name: new Date(name).toLocaleDateString(), // Format date nicely
      sales: value 
    }))
    .sort((a, b) => new Date(a.name) - new Date(b.name)); // Sort by date

  const tipsByMethodData = Object.entries(processedData.tipsData?.byMethod || {})
    .map(([name, value]) => ({ 
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
      value 
    }));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">Error loading analytics data: {error.message}</Typography>
      </Box>
    );
  }

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
                
                {Object.keys(processedData.topItems || {}).length > 0 && (
                  <>
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
                  </>
                )}
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

export default AnalyticsDashboard;