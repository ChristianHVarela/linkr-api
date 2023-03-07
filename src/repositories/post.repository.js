import { db } from '../config/database.connection.js'

export const insertPost = (user_id, link, description) => {
    return db.query('INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3)', [user_id, link, description])
}