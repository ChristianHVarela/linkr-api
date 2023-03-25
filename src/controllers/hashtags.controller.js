import {
	getHashtagRepository,
	trendingRepository,
} from "../repositories/hashtags.repository.js";
import { getLikesByHashtag } from "../repositories/likes.repository.js";
import { buildBody } from "./post.controller.js";

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
	const query = req.query;
	try {
		console.log(req.query);
		const page = query.page || 1;
		const { hashtag } = req.params;
		const { rows:posts } = await getHashtagRepository(hashtag, userId, page);
		const { rows:likes } = await getLikesByHashtag(hashtag,userId);
		const body = buildBody(posts, likes)
		console.log(posts);
		console.log(likes);
		if (posts.length === 0) {
			res.sendStatus(404);
			return;
		}
		res.send(body);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export { getTrending, getHashtag };
