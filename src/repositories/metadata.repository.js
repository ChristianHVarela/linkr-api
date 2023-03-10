import { db } from "../config/database.connection.js"

export const insertMetada = (title, description, image, post_id) => {
    return db.query('INSERT INTO posts_metadata (title, description, image_url, post_id) VALUES ($1, $2, $3, $4)', [title, description, image, post_id])
}