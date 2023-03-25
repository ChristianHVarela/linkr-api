import { getLikesByUser } from "../repositories/likes.repository.js";
import { getUserData, getUserPosts, searchUsers } from "../repositories/users.repository.js";
import { buildBody } from "./post.controller.js";

export async function getUser(req, res) {
  const { id } = req.params;
  const query = req.query;
  const user_id = res.locals.user.id

  try {
    const page = query.page || 1;
    const itsYou = user_id === Number(id)
    const userData = await getUserData(id, user_id)
    const userPosts = await getUserPosts(id)
    const { rows:likes } = await getLikesByUser(id, user_id, page)
    const body = buildBody(userPosts.rows, likes)

    const userPage = [[{...userData.rows[0], itsYou}], [...body]]

    return res.send(userPage).status(200);
  } catch (error) {
    console.log(error);
  }
}

export async function searchUser(req, res) {
  const { searchQuery } = req.body

  try {
    const users = await searchUsers(searchQuery)
    res.send(users.rows).status(200)
  } catch (error) {
    
  }
}
