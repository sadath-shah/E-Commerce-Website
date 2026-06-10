import * as productService from "../services/productService.js"

const updateproduct = async (req, res) => {
    try {
        const { productId } = req.params
        const productData = { ...req.body }
        if (req.file) productData.image = req.file.filename
        const product = await productService.updateProduct(productId, productData)
        res.status(200).json({
            success: true,
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getproduct = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await productService.getProduct(productId)
        res.status(200).json({
            success: true,
            product: product
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.status(200).json({
            success: true,
            products: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteproduct = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await productService.deleteProduct(productId)
        res.status(200).json({
            success: true,
            product: product
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const createproduct = async (req, res) => {
    try {
        const productData = { ...req.body }
        if (req.file) productData.image = req.file.filename
        const product = await productService.createProduct(productData);
        res.status(201).json({
            success: true,
            product: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { getProducts, createproduct, deleteproduct, getproduct, updateproduct }
