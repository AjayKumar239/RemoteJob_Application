const express = require('express');
const EmailSubscription = require('../models/EmailSubscription');

const router = express.Router();

// @route   POST /api/subscribe
// @desc    Subscribe to email updates
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already subscribed
    const existingSubscription = await EmailSubscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscription = await EmailSubscription.create({ email });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to email updates',
      subscription
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/unsubscribe
// @desc    Unsubscribe from email updates
// @access  Public
router.delete('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    await EmailSubscription.findOneAndUpdate(
      { email },
      { active: false }
    );

    res.json({
      success: true,
      message: 'Successfully unsubscribed'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
