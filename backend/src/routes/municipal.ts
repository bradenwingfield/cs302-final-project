import express, { Request, Response } from 'express';
import { Municipal } from '../models/Municipal';

const router = express.Router();

// Get all municipal records
router.get('/', async (req: Request, res: Response) => {
  try {
    const municipals = await Municipal.find();
    res.json(municipals);
  } catch (error) {
    console.error('Error fetching municipals:', error);
    res.status(500).json({ message: 'An error occurred while fetching municipal records' });
  }
});

// Get municipal by section
router.get('/section/:section', async (req: Request, res: Response) => {
  try {
    const municipal = await Municipal.find({ section: req.params.section });
    res.json(municipal);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching municipal section' });
  }
});

export default router; 