import { Router } from 'express';

import User from '../models/User';
import mysql from "mysql";

const router = Router();
// var connection = mysql.createConnection({
//     host: "195.85.205.148",
//     user: "kagan",
//     password: "pNqm5m[mu9nUu0Rf",
//     database: "qbtoesx"
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("MYSQL Bağlandı!")
// })

router.get('/users', async (req, res) => {
    const users = await User.context.find({
        serverId: req.session.user!.serverId
    });
    res.status(200).json(users.map(user => User.getSafeData(user)));
});

router.post("/setbalance", async (req,res) => {
    const {userId, newBalance} = req.body;
    const user = await User.context.findOne({id: userId})
    console.log(userId, newBalance, user)
    try {
        user.balance = parseInt(newBalance)
        await user.updateSelf();
        res.sendStatus(200)
    } catch(err) {
        res.sendStatus(400)
        console.log(err)
    }
    // const server = await Server.context.findOne({ id: user.serverId });

})

// router.post("/profile", async (req, res) => {
//     const {identifier} = req.body;
//     console.log(identifier, req.body)
//     await connection.query(`SELECT * FROM users WHERE identifier = ?`, [identifier], function(err, result) {
//         if (err) throw err;
//         res.status(200).json(result[0])
//     })
// })

export default router;
