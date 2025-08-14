import db from '../config/db.js'

export const foodsModel = {
        async getAllFoods() {
                const result = await db.query(
                        'SELECT *\
                        FROM\
                                foods\
                        ORDER BY\
                                created_at DESC'
                );
                console.log(result.rows);
                return result.rows;
        },

        async getFoodById(foodId) {
                const result = await db.query(
                        'SELECT foodName,\
                                dateOfPurchase,\
                                amount,\
                                amount_unit,\
                                location,\
                                openOrNot,\
                                openingDate,\
                                notes\
                        FROM\
                                foods\
                        WHERE\
                                id = $1', [foodId]
                );
                console.log(result.rows[0]);
                return result.rows[0];
        },

        async createFood(sanFood) {
                console.log("Creating new food");
                const result = await db.query(
                        'INSERT INTO\
                                foods\
                                        (foodName,\
                                        dateOfPurchase,\
                                        amount,\
                                        amount_unit,\
                                        location,\
                                        openOrNot,\
                                        openingDate,\
                                        notes)\
                                VALUES\
                                        ($1,\
                                        $2,\
                                        $3,\
                                        $4,\
                                        $5,\
                                        $6,\
                                        $7,\
                                        $8)\
                        RETURNING *',
                        [sanFood.foodName, 
                        sanFood.dateOfPurchase,
                        sanFood.amount,
                        sanFood.amount_unit,
                        sanFood.location,
                        sanFood.openOrNot,
                        sanFood.openingDate,
                        sanFood.notes]
                )
                console.log("Created food");
                return result.rows[0];
                
        },

        async editFood(foodId) {

        },

        async delete(foodId) {
                const result = await db.query(
                        'DELETE\
                         FROM \
                                foods \
                        WHERE \
                                id = $1', [foodId]
                )
                return result.rowCount;
        }


}