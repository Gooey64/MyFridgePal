export const usersController = {
        async getAllUsers(req, res) {
                res.send('Get all users');
        },

        async getUserById(req, res) {
                res.send('Get user by ID');
        },

        async createUser(req, res) {
                res.send('Create user');
        },

        async editUser(req, res) {
                res.send('Edit user');
        },

        async deleteUser(req, res) {
                res.send('Delete user');
        }
}