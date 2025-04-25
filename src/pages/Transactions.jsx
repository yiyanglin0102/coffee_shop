import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listTransactions } from '../graphql/queries.js';
import {
  Tab, Tabs, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, Button,
  Paper, Table, TableHead, TableBody, TableRow, TableCell, Collapse, Box, CircularProgress
} from '@mui/material';
import { Search, DateRange } from '@mui/icons-material';

const client = generateClient();

const TransactionBar = () => {
  const [activeTab, setActiveTab] = useState('creditCard');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paidStatus, setPaidStatus] = useState('all');
  const [refundStatus, setRefundStatus] = useState('all');
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await client.graphql({
        query: listTransactions
      });
      setTransactions(data.listTransactions.items);
    } catch (err) {
      setError(err);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id) => {
    setExpandedTransactionId(prev => (prev === id ? null : id));
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (!transaction) return false;
    if (activeTab !== 'all' && transaction.paymentMethod !== activeTab) return false;

    const searchLower = searchTerm.toLowerCase();
    if (
      searchTerm &&
      !transaction.orderId?.toLowerCase().includes(searchLower) &&
      !transaction.lastFour?.toLowerCase().includes(searchLower)
    ) {
      return false;
    }

    if (startDate && new Date(transaction.createdAt) < new Date(startDate)) return false;
    if (endDate && new Date(transaction.createdAt) > new Date(endDate)) return false;
    if (paidStatus !== 'all' && transaction.status !== paidStatus) return false;
    if (refundStatus !== 'all' && transaction.refundStatus !== refundStatus) return false;

    return true;
  });

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
        <p>Error loading transactions: {error.message}</p>
      </Box>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Credit Card" value="creditCard" />
        <Tab label="Cash" value="cash" />
        <Tab label="All" value="all" />
      </Tabs>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px 0' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          placeholder="Order #, Last 4"
        />

        <TextField
          label="From"
          type="datetime-local"
          variant="outlined"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRange />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="To"
          type="datetime-local"
          variant="outlined"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRange />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl variant="outlined" size="small" style={{ minWidth: '120px' }}>
          <InputLabel>Paid Status</InputLabel>
          <Select
            value={paidStatus}
            onChange={(e) => setPaidStatus(e.target.value)}
            label="Paid Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ minWidth: '120px' }}>
          <InputLabel>Refund Status</InputLabel>
          <Select
            value={refundStatus}
            onChange={(e) => setRefundStatus(e.target.value)}
            label="Refund Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="partial">Partial</MenuItem>
            <MenuItem value="full">Full</MenuItem>
          </Select>
        </FormControl>

        <Button 
          variant="outlined" 
          onClick={() => {
            setSearchTerm('');
            setStartDate('');
            setEndDate('');
            setPaidStatus('all');
            setRefundStatus('all');
          }}
        >
          Clear Filters
        </Button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Created Time</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Last 4 Digits</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Tips</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Refund Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <React.Fragment key={transaction.id}>
                <TableRow
                  hover
                  onClick={() => toggleExpanded(transaction.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{transaction.orderId}</TableCell>
                  <TableCell>{transaction.lastFour}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>${transaction.tips?.toFixed(2) || '0.00'}</TableCell>
                  <TableCell>${transaction.amount?.toFixed(2)}</TableCell>
                  <TableCell style={{
                    fontWeight: 'bold',
                    color: transaction.status === 'completed' ? 'green' : 'red'
                  }}>
                    {transaction.status}
                  </TableCell>
                  <TableCell style={{
                    fontWeight: 'bold',
                    color: transaction.refundStatus === 'none' ? 'green' :
                      transaction.refundStatus === 'partial' ? 'orange' : 'red'
                  }}>
                    {transaction.refundStatus || 'none'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={expandedTransactionId === transaction.id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <h4>Transaction Details</h4>
                        <p><strong>Transaction ID:</strong> {transaction.transactionNumber}</p>
                        <p><strong>Processor:</strong> {transaction.processor}</p>
                        <p><strong>Amount:</strong> ${transaction.amount?.toFixed(2)}</p>
                        <p><strong>Tips:</strong> ${transaction.tips?.toFixed(2) || '0.00'}</p>

                        {transaction.items && (
                          <>
                            <h4>Items</h4>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Item Name</TableCell>
                                  <TableCell>Price</TableCell>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>Total</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {transaction.items.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

export default TransactionBar;
