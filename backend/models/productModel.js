import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        product_price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Products", ProductSchema);