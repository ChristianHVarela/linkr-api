import {
	getHashtagRepository,
	trendingRepository,
} from "../repositories/hashtags.repository.js";

async function getTrending(_, res) {
	try {
		const { rows } = await trendingRepository();
		res.send(rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

async function getHashtag(req, res) {
	const userId = res.locals.user.id;
	try {
		const { hashtag } = req.params;
		const { rows } = await getHashtagRepository(hashtag, userId);
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
