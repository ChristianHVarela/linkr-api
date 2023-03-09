import { db } from "../config/database.connection.js";

export async function authRepository(email) {
    return await db.query(`SELECT id, email, name, image FROM users WHERE email = $1`, [email]);
}