import {Router} from "express"
import {usersController} from "../controllers/usersController.js"

const router = Router();

//TODO: Build your first full-stack app with react native & node.js 1:54:34

/* User Routes */

//get all users
router.get('/', usersController.getAllUsers);

//get a single user
router.get('/:id', usersController.getUserById);

//create a new user
router.post('/', usersController.createUser);

//edit a user
router.patch('/:id', usersController.editUser);

//delete a user
router.delete('/:id', usersController.deleteUser);

export default router;