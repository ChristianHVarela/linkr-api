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

export { getTrending };
