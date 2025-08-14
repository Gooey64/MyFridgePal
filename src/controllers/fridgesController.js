export const fridgesController = {
        async getAllFridges(req, res) {
                res.send('Get all fridges');
        },

        async getFridgeById(req, res) {
                const fridgeId = parseInt(req.params.id)
                res.send(`Get fridge by ID: ${fridgeId}`);
        },

        async createFridge(req, res) {
                res.send('Create fridge');
        },

        async editFridge(req, res) {
                res.send('Edit fridge')
        },

        async deleteFridge(req, res) {
                res.send('Delete fridge');
        }
}