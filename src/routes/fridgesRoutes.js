import {Router} from "express"
import {fridgesController} from "../controllers/fridgesController.js"


const router = Router();

/* Fridge  Commands */

//get all fridges
router.get('/', fridgesController.getAllFridges);

//get a single fridge
router.get('/:id', fridgesController.getFridgeById);

//create a new fridge
router.post('/', fridgesController.createFridge);

//edit a fridge
router.patch('/:id', fridgesController.editFridge);

//delete a fridge
router.delete('/:id', fridgesController.deleteFridge);

export default router;