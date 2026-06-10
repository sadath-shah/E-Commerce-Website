import Products from "../models/productModel.js"

const getProduct = async (productId) => {
    return await Products.findOne({ _id: productId })
}

const getProducts = async () => {
    return await Products.find();
};

const createProduct = async (productData) => {
    return await Products.create(productData);
};

const updateProduct = async (productId, productData) => {
    return await Products.findByIdAndUpdate(productId, productData, { new: true })
}

const deleteProduct = async (productId) => {
    return await Products.findByIdAndDelete(productId)
}

export { getProduct, getProducts, createProduct, updateProduct, deleteProduct };
