export const foodsController = {
        async getAllFoods(req, res) {
                res.send('Get all foods');
        },

        async getFoodById(req, res) {
                res.send('Get food by ID');
        },

        async createFood(req, res) {
                res.send('Create food');
        },

        async editFood(req, res) {
                res.send('Edit food');
        },

        async deleteFood(req, res) {
                res.send('Delete food');
        }
}