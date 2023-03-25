import { db } from "../config/database.connection.js";

function getLikesByHashtag(hashtag, userId) {
	return db.query(
		`
    SELECT pl.post_id AS post_id,
       json_agg(json_build_object('id', u.id, 'name', u.name)) AS likes,
       EXISTS (
           SELECT 1
           FROM json_populate_recordset(null::users, json_agg(json_build_object('id', u.id, 'name', u.name))) AS user_obj
           WHERE user_obj.id = $1
       ) AS liked_by_me
    FROM posts_likes pl
    JOIN users u ON pl.user_id = u.id
    JOIN posts_hashtags ph ON pl.post_id = ph.post_id
    JOIN hashtags h ON h.id = ph.hashtag_id
    WHERE h.name = $2
    GROUP BY pl.post_id;
    `,
		[userId, hashtag]
	);
}

function getLikesByUser(userId, mineId, page) {
  const offset = (page - 1) * 10;
	return db.query(
		`
    SELECT pl.post_id AS post_id,
       json_agg(json_build_object('id', u.id, 'name', u.name)) AS likes,
       EXISTS (
           SELECT 1
           FROM json_populate_recordset(null::users, json_agg(json_build_object('id', u.id, 'name', u.name))) AS user_obj
           WHERE user_obj.id = $1
       ) AS liked_by_me
    FROM posts_likes pl
    JOIN users u ON pl.user_id = u.id
    JOIN posts p ON pl.post_id = p.id
    WHERE p.user_id = $2
    GROUP BY pl.post_id
    LIMIT 10 OFFSET $3;
    `,
		[mineId, userId, offset]
	);
}

function getLikes(userId) {
	return db.query(
		`
    SELECT pl.post_id AS post_id,
       json_agg(json_build_object('id', u.id, 'name', u.name)) AS likes,
       EXISTS (
           SELECT 1
           FROM json_populate_recordset(null::users, json_agg(json_build_object('id', u.id, 'name', u.name))) AS user_obj
           WHERE user_obj.id = $1
       ) AS liked_by_me
    FROM posts_likes pl
    JOIN users u ON pl.user_id = u.id
    JOIN posts p ON pl.post_id = p.id
    GROUP BY pl.post_id, p.created_at
    ORDER BY p.created_at DESC LIMIT 20;
    `,
		[userId]
	);
}

export { getLikesByHashtag, getLikesByUser, getLikes };
