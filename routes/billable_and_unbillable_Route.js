import express from 'express';
import { billableAndUnbillable_create, billableAndUnbillable_delete, billableAndUnbillable_update, getAllBillableAndUnbillable, getBillableAndUnbillableById } from '../controllers/billableAndUnbillable_Controller.js';

const router = express.Router();

router.post('/billableAndUnbillable_create', billableAndUnbillable_create);
router.put('/billableAndUnbillable_update/:id', billableAndUnbillable_update);
router.delete('/billableAndUnbillable_delete/:id', billableAndUnbillable_delete);
router.get('/all_billableAndUnbillable_list', getAllBillableAndUnbillable);
router.get('/billableAndUnbillable_data_by_id/:id', getBillableAndUnbillableById);

export default router;