import { db } from "../config/database.connection.js";

export const insertPost = (user_id, link, description) => {
	return db.query('INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3) RETURNING id', [user_id, link, description])
};

export const getPostsOrderByCreatedAtDesc = (id) => {
	return db.query(`
    SELECT p.*, u.name AS user_name, u.image AS image_profile, COALESCE(COUNT(pl.post_id),0) AS num_likes,
    pm.title AS title_metadata, pm.description AS description_metadata, pm.image_url AS image_metadata, u.id = $1 AS author_match
    FROM posts p
    JOIN users u ON u.id = p.user_id
    JOIN posts_metadata pm ON pm.post_id = p.id
	LEFT JOIN posts_likes pl ON p.id = pl.post_id
	GROUP BY p.id, u.id, p.description, p.link, u.name, u.image, pm.title, pm.description, pm.image_url
    ORDER BY p.created_at DESC LIMIT 20
    `,[id]);
};


export const findPostById = (id) => {
	return db.query("SELECT * FROM posts WHERE id = $1", [id]);
};

export const deletePostById = async (postId) => {
	try {
		await db.query("BEGIN");
		await db.query("DELETE FROM posts_likes WHERE post_id = $1", [postId]);
		await db.query("DELETE FROM posts_hashtags WHERE post_id = $1", [
			postId,
		]);
		await db.query("DELETE FROM posts WHERE id = $1", [postId]);
		await db.query("COMMIT");
		console.log(`Post com ID ${postId} excluído com sucesso!`);
	} catch (e) {
		await db.query("ROLLBACK");
		throw new Error(`Erro ao excluir post com ID ${postId}: ${e.message}`);
	}
};

export const updatePostById = (postId, description) => {
    return db.query("UPDATE posts SET description = $1 WHERE id = $2", [
        description,
        postId,
    ]);
}

export const insertLike = async (postId, userId) => {
    return db.query(`INSERT INTO posts_likes (post_id, user_id) VALUES ($1, $2)`, [postId, userId]);
}

export const deleteLike = async (postId, userId) => {
    return db.query('DELETE FROM posts_likes WHERE post_id = $1 AND user_id = $2', [postId, userId]);
}
