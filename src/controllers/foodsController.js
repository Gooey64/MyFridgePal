import {foodsService} from "../services/foodsService.js"

export const foodsController = {
        async getAllFoods(req, res) {
                try {
                        const foods = await foodsService.getAllFoods();
                        res.status(200).json(foods);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
                
        },

        async getFoodById(req, res) {
                try {
                        const foodId = parseInt(req.params.id);
                        const food = await foodsService.getFoodById(foodId);
                        res.status(200).json(food);

                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        },

        async createFood(req, res) {
                try {
                        const food = await foodsService.createFood(req.body);
                        res.status(200).json(food);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        },

        async editFood(req, res) {
                try {
                        const foodId = parseInt(req.params.id);
                        const food = await foodsService.editFood(foodId, req.body);
                        res.status(200).json(food);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        },

        async deleteFood(req, res) {
                try {
                        const foodId = parseInt(req.params.id);
                        const food = await foodsService.deleteFood(foodId);
                        res.status(200).json(food);
                }
                catch (error) {
                        res.status(500).send({message: 'Internal Server Error'});
                }
        }
}