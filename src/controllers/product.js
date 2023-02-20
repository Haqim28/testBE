const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

// find all
exports.findProduct = async (req, res, next) => {
  try {
    // page default (1)
    const currentPage = req.query.page || 1;
    // total data perpage. (default 5)
    const perPage = req.query.perPage || 5;
    let totalItems;
    Product.find()
      // count Total Data
      .countDocuments()
      .then((total) => {
        totalItems = total;
        return (
          Product.find()
            // untuk menskip data yg telah tampil ketika di nextpage nanti nya
            .skip((parseInt(currentPage) - 1) * parseInt(perPage))
            // limit data perpage
            .limit(parseInt(perPage))
        );
      })
      .then((result) => {
        res.status(200).json({
          status: "success",
          data: result,
          total_data: totalItems,
          per_page: parseInt(perPage),
          current_page: parseInt(currentPage),
        });
      });
  } catch (error) {
    console.log(error.message);
  }
};

// find by id
exports.findbyid = async (req, res, next) => {
  try {
    const idProduct = req.params.routeid;
    const data = await Product.findById(idProduct);
    if (!data) {
      res.status(404).json({
        status: "not found",
        message: `detail product ${idProduct} not found`,
      });
    }

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// create
exports.createProduct = async (req, res, next) => {
  // const field = ({ title, price, name } = req.body);
  try {
    const data = await Product.create({
      ...req.body,
      image: req.file.path,
    });

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// find and update
exports.findAndUpdate = async (req, res, next) => {
  const idUpdate = req.params.idUpdate;
  try {
    const dataUpdate = await Product.findByIdAndUpdate(
      { _id: idUpdate },
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: dataUpdate,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      message: error.message,
    });
  }
};

// delete
exports.deleteID = (req, res, next) => {
  const idDelete = req.params.idDelete;
  try {
    Product.findOne({ _id: idDelete })
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            name: "productNotFound",
            success: false,
            message: "Product not found",
          });
        }

        console.log("path image", result);
        if (result.image) {
          removeImg(result.image);
        }
        return Product.findByIdAndDelete({ _id: idDelete });
      })
      .then((result) => {
        res.status(200).json({
          status: "success",
          data: result,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// config remove IMG
const removeImg = (filepath) => {
  console.log("filepath", filepath);
  console.log("dirname", __dirname);
  filepath = path.join(__dirname, "../../", filepath);
  fs.unlink(filepath, (err) => console.log(err));
};
