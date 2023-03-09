import { db } from "../config/database.connection.js";

export function getUserData(id) {
  return db.query(
    `SELECT 
        users.id AS user_id, 
        users.name, 
        users.image, 
        json_agg(
            json_build_object(
                'post_id', posts.id,
                'user_id', posts.user_id,
                'link', posts.link,
                'description', posts.description,
                'created_at', posts.created_at,
                'hashtags', (
                    SELECT json_agg(
                        json_build_object(
                            'hashtag_id', hashtags.id,
                            'name', hashtags.name
                        )
                    ) 
                    FROM posts_hashtags 
                    JOIN hashtags ON posts_hashtags.hashtag_id = hashtags.id 
                    WHERE posts_hashtags.post_id = posts.id
                ),
                'likes', (
                    SELECT json_agg(
                        json_build_object(
                            'user_id', posts_likes.user_id,
                            'name', users.name
                        )
                    ) 
                    FROM posts_likes 
                    JOIN users ON posts_likes.user_id = users.id 
                    WHERE posts_likes.post_id = posts.id
                )
            )
        ) AS posts
    FROM users 
    JOIN posts ON users.id = posts.user_id 
    WHERE users.id = $1
    GROUP BY users.id
    `,
    [id]
  );
}


export function searchUsers(searchQuery) {
    return db.query(`
    SELECT id, name, image 
    FROM users 
    WHERE name ILIKE $1||'%'
    `, [searchQuery])
}