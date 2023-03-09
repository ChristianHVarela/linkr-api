import { db } from '../config/database.connection.js'

export const insertPost = (user_id, link, description) => {
    return db.query('INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3)', [user_id, link, description])
}

export const getPostsOrderByCreatedAtDesc = () => {
    return db.query('SELECT p.*, u.name AS user_name, u.image AS image_profile FROM posts p JOIN users u ON u.id = p.user_id ORDER BY p.created_at DESC LIMIT 20')
}