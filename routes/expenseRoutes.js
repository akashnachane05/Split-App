const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// POST /expenses
router.post('/', async (req, res) => {
  try {
    const { amount, description, paid_by, participants } = req.body;
    // check for duplicate expense if the same amount, description, paid_by, and participants exist then do not create a new expense
    const existingExpense = await Expense.findOne({ amount, description, paid_by, participants });      
   
    if (existingExpense) {
      return res.status(400).json({ success: false, message: 'Expense already exists' });
    }
    // Validate input
    if (!amount || amount <= 0 || !description || !paid_by || !participants || participants.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    const expense = new Expense({ amount, description, paid_by, participants });
    await expense.save();
    res.status(201).json({ success: true, data: expense, message: 'Expense added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /expenses
router.get('/', async (req, res) => {
  const expenses = await Expense.find().sort({ createdAt: -1 });
  res.json({ success: true, data: expenses });
});

// PUT /expenses/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid ID or request' });
  }
});

// DELETE /expenses/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, message: 'Expense deleted' });
  } catch {
    res.status(400).json({ success: false, message: 'Invalid ID' });
  }
});

module.exports = router;
