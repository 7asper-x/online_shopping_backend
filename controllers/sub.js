const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = await new Sub({
      name: name,
      parent: parent,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(sub);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.read = async (req, res) => {
  try {
    let sub = await Sub.findOne({ slug: req.params.slug });
    res.json(sub);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name).toLowerCase(), parent: parent },
      { new: true } // send the updated item in the db otherwise it will send the old one
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
