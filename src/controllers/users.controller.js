import { getUserData, searchUsers } from "../repositories/users.repository.js";

export async function getUser(req, res) {
  const { id } = req.params;

  try {
    const userPage = await getUserData(id)
    return res.send(userPage.rows).status(200);
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
