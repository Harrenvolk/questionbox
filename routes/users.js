const express = require("express");
const User = require("../services/users.services");
const check_auth = require("../middleware/check_auth");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/:name",(req,res) => {
    User.get_user(req.params.name)
    .then(user => {
        if(user.length == 0)
            return res.status(404).json({
                message: "No such user"
            });
            
        user = user[0];
        ['id','user_password'].forEach(e => delete user[e]);
        res.json(user);
    })
    .catch(err => res.status(401).json({message : err}));
});

router.patch("/update",check_auth,(req,res) => {
    let user = {id : req.user.id,
        user_name : req.body.name,
        bio : req.body.bio}

    User.update_user(user)
    .then(
        res.status(202).json({message : "User updated"})
    )
    .catch(err => res.status(401).json({message : err}));
});

router.patch("/resetpassword", check_auth, async (req,res) => {
    let password = await bcrypt.hash(req.body.password, 10);

    User.update_user_password(password,req.user.id)
    .then(
        res.status(202).json({message : "Password updated"})
    )
    .catch(err => res.status(401).json({message : err}));
});

router.delete("/delete", check_auth, (req, res, next) => {
    User.delete_user(req.user.id)
    .then(
        res.status(200).json({
            message: "User deleted"
        })
    )
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;