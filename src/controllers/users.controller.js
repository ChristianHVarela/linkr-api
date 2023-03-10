import { getUserData, getUserPosts, searchUsers } from "../repositories/users.repository.js";

export async function getUser(req, res) {
  const { id } = req.params;

  try {
    const userData = await getUserData(id)
    const userPosts = await getUserPosts(id)

    const userPage = [[...userData.rows], [...userPosts.rows]]

    console.log(userPage)

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
