import {foodsModel} from "../models/foodsModel.js"

export const foodsService = {
        async getAllFoods() {
                return foodsModel.getAllFoods();
        },

        async getFoodById(foodId) {
                const food = await foodsModel.getFoodById(foodId);
                if (!food) {
                        throw new Error('Food not found');
                }
                return food;
        },

        async createFood(newFood) { 
                const {foodName,
                        dateOfPurchase,
                        amount,
                        amount_unit,
                        location,
                        openOrNot,
                        openingDate,
                        notes} = newFood;
                
                const sanitizedFood = {
                        foodName: foodName?.trim(),
                        dateOfPurchase,
                        amount,
                        amount_unit: amount_unit?.trim(),
                        location,
                        openOrNot,
                        openingDate,
                        notes
                }

                const createdFood = foodsModel.createFood(sanitizedFood);
                return createdFood;
        },

        async editFood(foodId, newValues) { 
                
                return {};
        },

        async deleteFood(foodId) { 

                return { message: 'Food deleted successfully'};
        }
};