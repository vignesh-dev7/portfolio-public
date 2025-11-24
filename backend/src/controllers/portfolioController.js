import Portfolio from '../models/Portfolio.js';

// Get portfolio data
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne(); // single portfolio
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio data not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio data' });
  }
};

// (Optional) Add portfolio data once manually
export const createPortfolio = async (req, res) => {
  try {
    const newPortfolio = new Portfolio(req.body);
    const saved = await newPortfolio.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating portfolio data' });
  }
};
