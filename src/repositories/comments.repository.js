import { db } from "../config/database.connection.js";

export async function postCommentQuery(userId, postId, comment) {
    return await db.query('INSERT INTO comments (user_id, post_id, comment) VALUES ($1, $2, $3);', [userId, postId, comment]);
}