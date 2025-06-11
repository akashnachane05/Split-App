const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET /people
router.get('/people', async (req, res) => {
  const expenses = await Expense.find();
  const people = new Set();
  expenses.forEach(e => {
    people.add(e.paid_by);
    e.participants.forEach(p => people.add(p));
  });
  res.json({ success: true, data: [...people] });
});

// GET /balances
router.get('/balances', async (req, res) => {
  const expenses = await Expense.find();
  const balances = {};

  expenses.forEach(({ amount, paid_by, participants }) => {
    const share = amount / participants.length;
    participants.forEach(p => {
      if (!(p in balances)) balances[p] = 0;
      balances[p] -= share;
    });
    if (!(paid_by in balances)) balances[paid_by] = 0;
    balances[paid_by] += amount;
  });

  res.json({ success: true, data: balances });
});

// GET /settlements
router.get('/settlements', async (req, res) => {
  const expenses = await Expense.find();
  const balances = {};

  expenses.forEach(({ amount, paid_by, participants }) => {
    const share = amount / participants.length;
    participants.forEach(p => {
      balances[p] = (balances[p] || 0) - share;
    });
    balances[paid_by] = (balances[paid_by] || 0) + amount;
  });

  const debtors = [];
  const creditors = [];
  for (const person in balances) {
    const amt = parseFloat(balances[person].toFixed(2));
    if (amt > 0) creditors.push([person, amt]);
    else if (amt < 0) debtors.push([person, -amt]);
  }

  const settlements = [];

  while (debtors.length && creditors.length) {
    const [debtor, debtAmt] = debtors.pop();
    const [creditor, credAmt] = creditors.pop();
    const paid = Math.min(debtAmt, credAmt);

    settlements.push({ from: debtor, to: creditor, amount: paid.toFixed(2) });

    if (debtAmt > paid) debtors.push([debtor, debtAmt - paid]);
    if (credAmt > paid) creditors.push([creditor, credAmt - paid]);
  }

  res.json({ success: true, data: settlements });
});

module.exports = router;
