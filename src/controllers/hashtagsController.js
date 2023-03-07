import { db } from "../config/database.connection.js";

async function getTrending(_, res) {
	try {
		const { rows } = await db.query(
			`SELECT h.id, h.name, COUNT(*) AS num_posts 
            FROM hashtags h 
            JOIN posts_hashtags ph ON h.id = ph.hashtag_id
            GROUP BY h.id, h.name
            ORDER BY num_posts DESC
            LIMIT 10;`
		);
		res.send(rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

async function getHashtag(req, res) {
	try {
		const { hashtag } = req.params;
		const { rows } = await db.query(
			`SELECT p.id, p.text, p.link, u.name, u.image, COUNT(*) AS num_likes
            FROM posts p 
            JOIN posts_hashtags ph ON p.id = ph.post_id
            JOIN hashtags h ON h.id = ph.hashtag_id
            JOIN users u ON u.id = p.user_id
            JOIN posts_likes pl ON p.id = pl.post_id
            WHERE h.name = $1
            GROUP BY p.id, p.text, p.link, u.name, u.image
            ORDER BY p.id DESC;`,
			[hashtag]
		);
		if (rows.length === 0) {
			res.sendStatus(404);
			return;
		}
		res.send(rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export { getTrending, getHashtag };
