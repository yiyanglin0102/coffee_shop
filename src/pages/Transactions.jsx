import React, { useState } from 'react';
import { sampleTransactionsData } from './sampleTransactionsData.js';
import {
  Tab, Tabs, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, Button,
  Paper, Table, TableHead, TableBody, TableRow, TableCell, Collapse, Box
} from '@mui/material';
import { Search, DateRange } from '@mui/icons-material';

const TransactionBar = () => {
  const [activeTab, setActiveTab] = useState('creditCard');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paidStatus, setPaidStatus] = useState('all');
  const [refundStatus, setRefundStatus] = useState('all');
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedTransactionId(prev => (prev === id ? null : id));
  };

  const filteredTransactions = sampleTransactionsData.filter(transaction => {
    if (activeTab !== 'all' && transaction.paymentMethod !== activeTab) return false;
    const searchLower = searchTerm.toLowerCase();
    if (
      searchTerm &&
      !transaction.orderNumber.toLowerCase().includes(searchLower) &&
      !transaction.lastFour.toLowerCase().includes(searchLower)
    ) {
      return false;
    }
    if (startDate && new Date(transaction.createdTime) < new Date(startDate)) return false;
    if (endDate && new Date(transaction.createdTime) > new Date(endDate)) return false;
    if (paidStatus !== 'all' && transaction.paidStatus !== paidStatus) return false;
    if (refundStatus !== 'all' && transaction.refundStatus !== refundStatus) return false;
    return true;
  });

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
        <Tab label="Other" value="other" />
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
          placeholder="Order #, Receipt #, Table #, Last 4"
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
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
        />

        <FormControl variant="outlined" size="small" style={{ minWidth: '120px' }}>
          <InputLabel>Paid Status</InputLabel>
          <Select
            value={paidStatus}
            onChange={(e) => setPaidStatus(e.target.value)}
            label="Paid Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="unpaid">Unpaid</MenuItem>
            <MenuItem value="partial">Partial</MenuItem>
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
              <TableCell>Order Number</TableCell>
              <TableCell>Last 4 Digits</TableCell>
              <TableCell>Tips</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Paid Status</TableCell>
              <TableCell>Checkout Status</TableCell>
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
                  <TableCell>{transaction.createdTime}</TableCell>
                  <TableCell>{transaction.orderNumber}</TableCell>
                  <TableCell>{transaction.lastFour}</TableCell>
                  <TableCell>${transaction.tips.toFixed(2)}</TableCell>
                  <TableCell>${transaction.total.toFixed(2)}</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: transaction.paidStatus === 'paid' ? 'green' : transaction.paidStatus === 'partial' ? 'orange' : 'red' }}>
                    {transaction.paidStatus}
                  </TableCell>
                  <TableCell>{transaction.checkoutStatus}</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: transaction.refundStatus === 'none' ? 'green' : transaction.refundStatus === 'partial' ? 'orange' : 'red' }}>
                    {transaction.refundStatus}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={expandedTransactionId === transaction.id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
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
                            {transaction.items.map((item, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
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
