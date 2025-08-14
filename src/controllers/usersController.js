import {usersService} from "../services/usersService.js"

export const usersController = {
        async getAllUsers(req, res) {
                try {
                        const users = usersService.getAllUsers();
                        res.status(200).json(users);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
                
        },

        async getUserById(req, res) {
                try {
                        const userId = parseInt(req.params.id);
                        const user = usersService.getUserById(userId);
                        res.status(200).json(user);

                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        },

        async createUser(req, res) {
                try {
                        const user = usersService.createUser(req.body);
                        res.status(200).json(user);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        },

        async editUser(req, res) {
                try {
                        const userId = parseInt(req.params.id);
                        const user = usersService.editUser(userId, req.body);
                        res.status(200).json(user);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        },

        async deleteUser(req, res) {
                try {
                        const userId = parseInt(req.params.id);
                        const user = usersService.deleteUser(userId);
                        res.status(200).json(user);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        }
}