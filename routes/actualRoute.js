import express from 'express';
import { actual_create, actual_update, actualsDeleteById, getActualsById, getAllActuals } from '../controllers/actualController.js';


const router = express.Router();

router.post('/actual_create', actual_create);
router.put('/actual_update/:id', actual_update);
router.get('/get_all_actuals', getAllActuals);
router.get('get_actuals_byid/:id', getActualsById);
router.delete('/actual_delete/:id', actualsDeleteById);

export default router;