import express from 'express';
import { budgetCreate, budgetDeleteById, budgetUpdate, getAllBudget, getBudgetById } from '../controllers/budgetController.js';

const router = express.Router();

router.post('/budget', budgetCreate);
router.post('/budget_update/:id', budgetUpdate);
router.delete('/budget_delete/:id', budgetDeleteById);
router.get('/all_budget_list', getAllBudget);
router.get('/budget_data_by_id/:id', getBudgetById);


export default router;