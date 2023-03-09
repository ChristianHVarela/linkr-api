import { db } from "../config/database.connection.js";

export default async function signinRepository(email) {
    return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}