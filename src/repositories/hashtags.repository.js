import { db } from "../config/database.connection.js";

function trendingRepository() {
	return db.query(`
        SELECT h.id, h.name, COUNT(*) AS num_posts 
        FROM hashtags h 
        JOIN posts_hashtags ph ON h.id = ph.hashtag_id
        GROUP BY h.id, h.name
        ORDER BY num_posts DESC
        LIMIT 10;
        `);
}

function getHashtagRepository(hashtag, userId, page) {
	const offset = (page - 1) * 10;
	return db.query(`
        SELECT p.*, u.name as user_name, u.image as image_profile, 
		COALESCE(COUNT(pl.post_id),0) AS num_likes, u.id = $2 AS author_match, p.created_at,
		pm.title AS title_metadata, pm.description AS description_metadata, pm.image_url AS image_metadata
        FROM posts p 
        JOIN posts_hashtags ph ON p.id = ph.post_id
        JOIN hashtags h ON h.id = ph.hashtag_id
        JOIN users u ON u.id = p.user_id
		JOIN posts_metadata pm ON pm.post_id = p.id
        LEFT JOIN posts_likes pl ON p.id = pl.post_id
        WHERE h.name = $1
        GROUP BY p.id, u.id, p.description, p.link, u.name, u.image, pm.title, pm.description, pm.image_url
        ORDER BY p.created_at DESC LIMIT 10 OFFSET $3;
        `,
		[hashtag, userId, offset]
	);
}

async function addHashtag(hashtagName, postId) {
	try {
		await db.query("BEGIN");
		const { rows: hashtag } = await db.query(
			`
        INSERT INTO hashtags (name)
        VALUES ($1)
        ON CONFLICT (name) DO UPDATE SET name = excluded.name
        RETURNING *;
        `,
			[hashtagName]
		);
		await db.query(
			`
		INSERT INTO posts_hashtags (post_id, hashtag_id)
		VALUES ($1, $2);
		`,
			[postId, hashtag[0].id]
		);
		await db.query("COMMIT");
	} catch (e) {
		await db.query("ROLLBACK");
		throw new Error(`Erro ao adicionar hashtag: ${e.message}`);
	}
}

function deleteHashtags(postId) {
	return db.query(
		`
        DELETE FROM posts_hashtags
        WHERE post_id = $1;
        `,
		[postId]
	);
}

export { trendingRepository, getHashtagRepository, addHashtag, deleteHashtags };
