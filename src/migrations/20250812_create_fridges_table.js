import db from '../config/db.js';

export async function up() {
        try {
                await db.query(`
                        CREATE TABLE IF NOT EXISTS fridges (
                        id SERIAL PRIMARY KEY,
                        fridgeName VARCHAR(100) UNIQUE NOT NULL,
                        fridgeType VARCHAR(100),
                        notes TEXT,
                        user_id INT REFERENCES users(id) ON DELETE CASCADE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        )
                `);
        }
        catch (error) {
                console.log(error)
        }
}

export async function down() {
        try {
                await db.query('DROP TABLE IF EXISTS fridges');
        }
        catch (error) {
                console.log(error)
        }
}

up()