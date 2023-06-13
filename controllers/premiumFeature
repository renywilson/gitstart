const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');
const e= require('express');

const getUserLeaderBoard = async (req, res) => {
    try{
        const leaderboardofusers = await User.findAll({
           
            order:[['totalExpences', 'DESC']]

        })
       
        res.status(200).json({ succes: true, data: leaderboardofusers})
        
    console.log(leaderboardofusers)
} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}

module.exports = {
    getUserLeaderBoard
}