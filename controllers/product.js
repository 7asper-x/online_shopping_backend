const Product = require("../models/product");
const slugify = require("slugify");
// const Category = require("../models/category");

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.read = async (req, res) => {
    try {
        let product = await Product.find({});
        res.json(product);
    } catch (err) {
        res.status(400).send(err.message);
    }
};