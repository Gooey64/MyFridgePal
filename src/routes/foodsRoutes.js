import {Router} from "express"
import {foodsController} from "../controllers/foodsController.js"

const router = Router();

/* Food Routes */

//get all foods
router.get('/', foodsController.getAllFoods);

//get a single food item
router.get('/:id', foodsController.getFoodById);

//create a new food item
router.post('/', foodsController.createFood);

//edit a single food item
router.patch('/:id', foodsController.editFood);

//delete a single food item
router.delete('/:id', foodsController.deleteFood);

export default router;