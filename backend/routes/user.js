var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = "My_Key";

var Schema = require("mongoose").Schema;

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
}, {
    collection: 'users'
});

let User
try {
    User = mongoose.model('users');
} catch (error) {
    User = mongoose.model('users', userSchema);
}

// function makeHash
const makeHash = async (plainText) => {
    const result = await bcrypt.hash(plainText, 9);
    return result;
}

// function insertUser
const inserUser = (dataUser) => {
    return new Promise((resolve, reject) => {
        var new_user = new User({
            name: dataUser.name,
            email: dataUser.email,
            password: dataUser.password,
        });
        new_user.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert user to DB!'))
            } else {
                resolve({ message: 'Singn up successfully' })
            }
        });
    });
}

// function compareHash
const compareHash = async (plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) => {
            if (err) {
                reject(new Error('Error bcrypt compare'));
            } else {
                resolve({ status: data });
            }
        });
    });
};

// function findUser
const findUser = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }, (err, data) => {
            if (err) {
                reject(new Error('Cannot find username!'));
            } else {
                if (data) {
                    resolve({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        password: data.password,
                    });
                } else {
                    reject(new Error('Cannot find email!'));
                }
            }
        })
    })
}

// Sign up
router.route('/signup')
    .post((req, res) => {
        makeHash(req.body.password)
            .then(hashText => {
                const playload = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashText,
                }
                console.log(playload);
                inserUser(playload)
                    .then(result => {
                        console.log(result);
                        res.status(200).json(result)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ err });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ err });
            })
    });

// Sign in 
router.route('/signin')
    .post(async (req, res) => {
        const playload = {
            email: req.body.email,
            password: req.body.password,
        };

        console.log(playload);

        try {
            const result = await findUser(playload.email);
            const loginStatus = await compareHash(playload.password, result.password);
            const status = loginStatus.status;

            if (status) {
                const token = jwt.sign(result, key, { expiresIn: 60 * 5 });
                res.status(200).json({ result, token, status });
            } else {
                res.status(200).json({ status });
            }
        } catch (err) {
            res.status(404).send(error);
        }
    })



module.exports = router