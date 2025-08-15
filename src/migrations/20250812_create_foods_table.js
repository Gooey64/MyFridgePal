import db from '../config/db.js';

export async function up() {
        try {
                await db.query(`
                        CREATE TABLE IF NOT EXISTS foods (
                        id SERIAL PRIMARY KEY,
                        foodName VARCHAR(255) UNIQUE NOT NULL,
                        dateOfPurchase DATE NOT NULL DEFAULT CURRENT_DATE,
                        amount DECIMAL,
                        amount_unit VARCHAR(100),
                        location INT REFERENCES fridges(id) ON DELETE CASCADE,
                        openOrNot BOOLEAN,
                        openingDate DATE,
                        expirationDate DATE,
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