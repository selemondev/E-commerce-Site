const productModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// create a product

const createProduct = asyncHandler(async (req, res) => {
    const { title, desc, price, image, inStock, categories, color } = req.body;

    if (!title || !desc || !price || !image || !inStock || !color || !categories) {
        res.status(400);
        throw new Error("Please provide all the required fields")
    };


    const product = await productModel.create({
        title,
        desc,
        price,
        image,
        color,
        categories,
        inStock,
        user: req.user.id
    });

    if (product) {
        res.status(201);
        res.json({
            _id: product.id,
            title: product.title,
            description: product.desc,
            price: product.price,
            color: product.color,
            image: product.image,
            categories: product.categories,
            inStock: product.inStock,
        })
    } else {
        res.status(400);
        throw new Error(" An error occurred");
    }
});

// update a product

const updateProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found")
    };

    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct)
});

// delete a product

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found")
    };

    await product.remove();
    res.json(200).json({ id: req.params.id });
});


// get a single product

const getProduct = asyncHandler(async (req, res) => {

    try {
        const product = await productModel.findById(req.params.id);
        res.status(200).json(product)
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});


// get all products

const getProducts = asyncHandler(async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let products;

        if (qNew) {
            products = await productModel.find().sort({ createdAt: -1 }).limit(1);
            res.status(200).json(products)
        } else if (qCategory) {
            products = await productModel.find({
                categories: {
                    $in: [qCategory]
                }
            });
            res.status(200).json(products)
        } else {
            products = await productModel.find();
            res.status(200).json(products)
        }
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProducts
}