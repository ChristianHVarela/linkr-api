import { db } from "../config/database.connection.js";

export function getUserData(id) {
    return db.query(`SELECT id, name, image FROM users WHERE id = $1`, [id])
}

// break

export function getUserPosts(id) {
  return db.query(
    `SELECT p.*, u.name AS user_name, u.image AS image_profile, 
    pm.title AS title_metadata, pm.description AS description_metadata, pm.image_url AS image_metadata, u.id = $1 AS author_match
    FROM posts p 
    JOIN users u ON u.id = p.user_id 
    JOIN posts_metadata pm ON pm.post_id = p.id
    WHERE p.user_id = $1
    ORDER BY p.created_at DESC
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
