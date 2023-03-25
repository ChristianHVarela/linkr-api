import { db } from "../config/database.connection.js";

export async function postCommentQuery(userId, postId, comment) {
    return await db.query('INSERT INTO comments (user_id, post_id, comment) VALUES ($1, $2, $3);', [userId, postId, comment]);
}

export async function getCommentsByPost(userId, postId) {
    return await db.query(`
    SELECT c.user_id, u.name AS name, u.image AS image, c.comment, p.user_id = c.user_id AS post_author, f.id IS NOT NULL AS following
        FROM comments c
        JOIN users u ON c.user_id = u.id
        JOIN posts p ON c.post_id = p.id
        LEFT JOIN followers f ON f.user_id = $1 and f.following_id = c.user_id
    WHERE c.post_id = $2
    ORDER BY c.id ASC;`, [userId, postId]);
}