import { db } from "../config/database.connection.js";

export function findHavingFollower(searchQuery){
    return db.query(
      `
        SELECT * FROM followers WHERE user_id = $1 AND following_id = $2
      `, searchQuery
    );
  }

  export function insertFollower(searchQuery){
    return db.query(
      `
        INSERT INTO followers(user_id, following_id) VALUES ($1, $2)
      `, searchQuery
    );
  }

  export function deleteFollower(searchQuery){
    return db.query(
      `
        DELETE FROM followers WHERE user_id = $1 AND following_id = $2
      `, searchQuery
    );
  }

  export function countFollowers(searchQuery){
    return db.query(
      `
        SELECT COUNT(*) FROM followers WHERE user_id = $1
      `, searchQuery
    );
  }