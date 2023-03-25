import { db } from "../config/database.connection.js";

export const insertPost = (user_id, link, description) => {
	return db.query('INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3) RETURNING id', [user_id, link, description])
};

export const getPostsOrderByCreatedAtDesc = (id,page) => {
	const offset = (page - 1) * 10;
	return db.query(
		`
			SELECT p.*, u.name AS user_name, u.image AS image_profile, COALESCE(COUNT(DISTINCT pl.id)) AS num_likes, COALESCE(COUNT(DISTINCT c.id)) AS num_comments,
			pm.title AS title_metadata, pm.description AS description_metadata, pm.image_url AS image_metadata, u.id = $1 AS author_match
			FROM posts p
			JOIN followers f ON f.user_id = $1 AND f.following_id = p.user_id
			JOIN users u ON u.id = p.user_id
			JOIN posts_metadata pm ON pm.post_id = p.id
			LEFT JOIN posts_likes pl ON p.id = pl.post_id
			LEFT JOIN comments c ON p.id = c.post_id
			GROUP BY p.id, u.id, p.description, p.link, u.name, u.image, pm.title, pm.description, pm.image_url
			ORDER BY p.created_at DESC LIMIT 10 OFFSET $2
		`,
	[id,offset]);

};


export const findPostById = (id) => {
	return db.query("SELECT * FROM posts WHERE id = $1", [id]);
};

export const deletePostById = async (postId) => {
	try {
		await db.query("BEGIN");
		await db.query("DELETE FROM comments WHERE post_id = $1", [postId]);
		await db.query("DELETE FROM posts_likes WHERE post_id = $1", [postId]);
		await db.query("DELETE FROM posts_hashtags WHERE post_id = $1", [
			postId,
		]);
		await db.query("DELETE FROM posts_metadata WHERE post_id = $1", [
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
	await db.query(`INSERT INTO posts_likes (post_id, user_id) VALUES ($1, $2)`, [postId, userId]);
	return await db.query(
		`SELECT pl.post_id AS post_id,
		json_agg(json_build_object('id', u.id, 'name', u.name)) AS likes,
		EXISTS (
		  SELECT 1
		  FROM json_populate_recordset(null::users, json_agg(json_build_object('id', u.id, 'name', u.name))) AS user_obj
		  WHERE user_obj.id = $1
		) AS liked_by_me
		FROM posts_likes pl
		JOIN users u ON pl.user_id = u.id
		where pl.post_id = $2
		GROUP BY pl.post_id;`, [userId, postId]
	)
}

export const deleteLike = async (postId, userId) => {
	await db.query('DELETE FROM posts_likes WHERE post_id = $1 AND user_id = $2', [postId, userId]);
	return await db.query(
		`SELECT pl.post_id AS post_id,
		json_agg(json_build_object('id', u.id, 'name', u.name)) AS likes,
		EXISTS (
		  SELECT 1
		  FROM json_populate_recordset(null::users, json_agg(json_build_object('id', u.id, 'name', u.name))) AS user_obj
		  WHERE user_obj.id = $1
		) AS liked_by_me
		FROM posts_likes pl
		JOIN users u ON pl.user_id = u.id
		where pl.post_id = $2
		GROUP BY pl.post_id;`, [userId, postId]
	)
}
