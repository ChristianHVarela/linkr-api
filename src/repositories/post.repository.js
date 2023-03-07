import connection from '../config/database.js'

export const insertPost = (user_id, link, description) => {
    return connection.query('INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3)', [user_id, link, description])
}