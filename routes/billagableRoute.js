import express from 'express';
import { billagable_update, billageble_create } from '../controllers/billagebleController.js';

const router = express.Router();

router.post('/billagable_create', billageble_create);
router.put('/billagable_update/:id', billagable_update);
router.delete('/billagable_delete/:id', budgetDeleteById);
router.get('/all_billagable_list', getAllBudget);
router.get('/billagable_data_by_id/:id', getBudgetById);

export default router;