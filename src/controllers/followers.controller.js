import { deleteFollower, findHavingFollower, insertFollower } from "../repositories/followers.repository.js";


export const toogleFollow = async (req, res) => {
    const { follower_id } = req.body
    const { id } = res.locals.user

    try {
        const searchQuery = [id, follower_id]
        const existsFollower = await findHavingFollower(searchQuery)
        if (existsFollower.rowCount > 0){
            await deleteFollower(searchQuery)
            return res.send(false)
        } else {
            await insertFollower(searchQuery)
            return res.status(201).send(true)
        }
    } catch (error) {
        console.log(error);        
    }
}