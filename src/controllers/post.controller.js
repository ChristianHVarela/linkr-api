import { db } from "../config/database.connection.js";
import { insertPost } from "../repositories/post.repository.js";

export async function createPost(req, res) {
  const { link, description } = req.body;
  try {

    const ok = await insertPost(25, link, description);
    return res.status(203).send(ok.rows);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
