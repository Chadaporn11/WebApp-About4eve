var expressFunction = require('express');
const router = expressFunction.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user_model = require('../models/user');
const authorization = require('../config/authorize');
const profileuser_model = require('../models/profileuser');
const upload = require('../config/imageconfig');
const mongoose = require('mongoose');

const key = "My_Key";

// function makeHash
const makeHash = async (plainText) => {
    const result = await bcrypt.hash(plainText, 9);
    return result;
}

// function formatsize profile
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

// function insertUser
const insertUser = (dataUser) => {
    return new Promise((resolve, reject) => {
        var new_user = new user_model({
            username: dataUser.username,
            email: dataUser.email,
            password: dataUser.password,
            profile: dataUser.profile,
        });
        console.log(new_user);
        new_user.save((err, data) => {
            if (err) {
                console.log(err);
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
        user_model.findOne({ email: email }, (err, data) => {
            if (err) {
                reject(new Error('Cannot find username!'));
            } else {
                if (data) {
                    resolve({
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        profile: data.profile,
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
    .post(upload.uploadprofile.single('profile'), (req, res) => {
        makeHash(req.body.password)
            .then(hashText => {
                const file = new profileuser_model({
                    fileName: req.file.originalname,
                    filePath: req.file.path,
                    fileType: req.file.mimetype,
                    fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
                });
                const payload = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashText,
                    profile: file,
                }
                insertUser(payload)
                    .then(result => {
                        console.log(result);
                        res.status(200).json(result);
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
        const payload = {
            email: req.body.email,
            password: req.body.password,
        };
        console.log(payload);
        try {
            const result = await findUser(payload.email);
            const loginStatus = await compareHash(payload.password, result.password);
            const status = loginStatus.status;

            if (status) {
                const token = jwt.sign(result, key, { expiresIn: '1h' });
                res.status(200).json({ result, token, status });
            } else {
                res.status(200).json({ status });
            }
        } catch (err) {
            res.status(404).send(error);
        }
    })





module.exports = router