import { db } from "../config/database.connection.js";

export function getUserData(id) {
    return db.query(`SELECT id, name, image FROM users WHERE id = $1`, [id])
}

export function getUserPosts(id) {
  return db.query(
    `SELECT 
    posts.user_id,
    users.name,
    users.image,
    posts.id AS post_id,
    posts.link,
    posts.description,
    posts.created_at,
    (
        SELECT json_agg(
            json_build_object(
                'hashtag_id', hashtags.id,
                'name', hashtags.name
            )
        ) 
        FROM posts_hashtags 
        JOIN hashtags ON posts_hashtags.hashtag_id = hashtags.id 
        WHERE posts_hashtags.post_id = posts.id
    ) AS hashtags,
    (
        SELECT json_agg(
            json_build_object(
                'user_id', posts_likes.user_id,
                'name', users.name
            )
        ) 
        FROM posts_likes 
        JOIN users ON posts_likes.user_id = users.id 
        WHERE posts_likes.post_id = posts.id
    ) AS likes
FROM users 
JOIN posts ON users.id = posts.user_id 
WHERE users.id = $1
ORDER BY posts.id
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
