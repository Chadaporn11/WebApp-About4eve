var expressFunction = require('express');
const router = expressFunction.Router();
const product_model = require('../models/product');
const upload = require('../config/imageconfig');
const fs = require('fs');
const authorization = require('../config/authorize');
const mongoose = require('mongoose');

// function formatsize
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

// function insertProduct
const insertProduct = (dataProduct) => {
    return new Promise((resolve, reject) => {
        var new_product = new product_model(dataProduct);
        new_product.save((err, data) => {
            if (err) {
                console.log(err);
                reject(new Error('Cannot insert product to DB!'))
            } else {
                resolve({ message: 'Insert Product successfully' })
            }
        });
    });
}

// Post: Product
router.route('/addproduct')
    .post(authorization, upload.uploadproduct.array('imageproduct', 3), async (req, res) => {
        console.log(req.body);
        console.log(req.files);
        try {
            let filesArray = [];
            for (var i = 0; i < req.files.length; i++) {
                const file = {
                    fileName: req.files[i].originalname,
                    filePath: req.files[i].path,
                    fileType: req.files[i].mimetype,
                    fileSize: fileSizeFormatter(req.files[i].size, 2),
                }
                filesArray.push(file);
            }
            console.log(filesArray)
            const payload = {
                productname: req.body.productname,
                detail: req.body.detail,
                type: req.body.type,
                price: req.body.price,
                statusproduct: req.body.statusproduct,
                contact: req.body.contact,
                owner: req.body.owner,
                imageproduct: filesArray,
            }
            console.log(payload);
            insertProduct(payload)
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ err });
                })
        } catch (err) {
            console.log(err);
            res.status(500).json({ err });
        }
    });

// Put: Updateproduct
router.route('/updateproduct/:id')
    .put(authorization, (req, res) => {
        product_model.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                console.log(error)
                res.status(500).json(error)
            } else {
                res.status(200).json(data)
                console.log('Data updated successfully')
            }
        })
    });


// Delete: Product
router.route('/deleteproduct/:id')
    .delete(authorization, async (req, res) => {
        const data = await product_model.findById(req.params.id) //find by id
        const dataimg = data.imageproduct;
        //let filesArray = [];
        const directoryPath = "WebApp-About4eve/backend/imageproduct/"
        for (var i = 0; i < dataimg.length; i++) {
            const file = dataimg[i].fileName;
            fs.unlink('imageproduct/' + dataimg[i].fileName, (err) => { // delete file in Path imageproduct
                if (err) {
                    console.log(err);
                } else {
                    console.log('Deleted imageproduct/' + file + ' successfully');
                }
            });
        }
        const product = await product_model.findByIdAndDelete(req.params.id) //delete product by id
        return res.send(product)
    });

//Get: One Product
router.route('/:id')
    .get((req, res) => {
        product_model.find({ _id: req.params.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.status(404).json(error);
            } else {
                console.log(data);
                res.status(200).json(data);
            }
        });
    })

//Get: All Product
router.route('/')
    .get(async (req, res) => {
        const products = await product_model.find();
        res.status(200).json(products)
    })

//Get: Owner Products
router.route('/fix/:ofInfoID')
    .get((req, res) => {
        product_model.aggregate([{
            $match: {
                owner: mongoose.Types.ObjectId(req.params.ofInfoID)
            }
        }])
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    })

module.exports = router;

