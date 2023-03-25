import { db } from "../config/database.connection.js";

export function getUserData(id, user_id) {
    return db.query(`SELECT id, name, image, EXISTS(SELECT 1 FROM followers f WHERE f.user_id = $2 AND f.following_id = $1) AS follow FROM users WHERE id = $1`, [id, user_id])
}

// break

export function getUserPosts(id) {
  return db.query(
    `
    SELECT p.*, u.name AS user_name, u.image AS image_profile, COALESCE(COUNT(pl.post_id),0) AS num_likes,
    pm.title AS title_metadata, pm.description AS description_metadata, pm.image_url AS image_metadata, u.id = $1 AS author_match
    FROM posts p
    JOIN users u ON u.id = p.user_id
    JOIN posts_metadata pm ON pm.post_id = p.id
    LEFT JOIN posts_likes pl ON p.id = pl.post_id
    WHERE p.user_id = $1
    GROUP BY p.id, u.id, p.description, p.link, u.name, u.image, pm.title, pm.description, pm.image_url
    ORDER BY p.created_at DESC LIMIT 20
    `,
    [id]
  );
}

export function searchUsers(searchQuery) {
  return db.query(
    `
    SELECT id, name, image 
    FROM users 
    WHERE name ILIKE $1||'%'
    `,
    [searchQuery]
  );
}

export function newSearchUsers(searchQuery) {
  return db.query(
    `
      SELECT u.id, u.name, u.image,
        (SELECT COUNT(*) FROM followers fo WHERE fo.user_id = $1 AND fo.following_id = u.id) AS follows_me
      FROM users u
      LEFT JOIN followers f ON f.user_id = $1 AND f.following_id = u.id
      WHERE TRANSLATE(CONCAT('%', LOWER(u.name), '%'), 'áàâãéèêíïóôõöúçñ', 'aaaaeeeiiooooucn') LIKE TRANSLATE(concat('%', LOWER($2), '%'), 'áàâãéèêíïóôõöúçñ', 'aaaaeeeiiooooucn') || '%'
      ORDER BY f.following_id DESC NULLS LAST, u.name
    `,
    searchQuery
  );
}

