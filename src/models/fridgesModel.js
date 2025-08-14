import db from '../config/db.js'

export const fridgesModel = {
        async getAllFridges() {
                const result = await db.query(
                        'SELECT *\
                        FROM\
                                fridges\
                        ORDER BY\
                                created_at DESC'
                );
                console.log(result.rows);
                return result.rows;
        },

        async getFridgeById(fridgeId) {
                const result = await db.query(
                        'SELECT fridgeName,\
                                fridgeType,\
                                notes,\
                                user_id\
                        FROM\
                                fridges\
                        WHERE\
                                id = $1', [fridgeId]
                );
                console.log(result.rows[0]);
                return result.rows[0];
        },

        async createFridge(sanFridge) {
                console.log("Creating new fridge");
                const result = await db.query(
                        'INSERT INTO\
                                fridges\
                                        (fridgeName,\
                                        fridgeType,\
                                        notes)\
                                VALUES\
                                        ($1,\
                                        $2,\
                                        $3)\
                        RETURNING *',
                        [sanFridge.fridgeName, sanFridge.fridgeType, sanFridge.notes]
                )
                console.log("Created fridge");
                return result.rows[0];
                
        },

        async editFridge(fridgeId) {

        },

        async delete(fridgeId) {
                const result = await db.query(
                        'DELETE\
                         FROM \
                                fridges \
                        WHERE \
                                id = $1', [fridgeId]
                )
                return result.rowCount;
        }


}