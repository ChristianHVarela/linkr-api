import { db } from '../config/database.connection.js'

export async function signupRepository(email, password, name, image) {
    await connection.query(`INSERT INTO users (email, password, name, image) VALUES ($1, $2, $3, $4) RETURNING id`, [email, password, name, image]);
}
