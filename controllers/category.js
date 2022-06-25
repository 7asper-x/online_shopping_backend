const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name: name,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.read = async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name).toLowerCase() },
      { new: true } // send the updated item in the db otherwise it will send the old one
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
