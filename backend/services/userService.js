import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const getUser = async (userId) => {
    return await User.findOne({ _id: userId })
}

const updateUser = async (userId, userData) => {
    const { _id, __v, createdAt, updatedAt, ...updateData } = userData
    return await User.findByIdAndUpdate(userId, updateData, { new: true })
}

const getUsers = async () => {
    return await User.find();
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId)
}

const authUser = async (userData) => {
    const found = await User.findOne({ email: userData.email })
    if (found) {
        const chkPassword = await bcrypt.compare(userData.password, found.password)
        if (chkPassword) {
            const user = {
                id: found._id,
                name: found.name,
                email: found.email,
                role: found.role
            }
            const token = await jwt.sign(user, process.env.SECRET, { expiresIn: "1hr" })
            return { ...user, token }
        }

    }
};
const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    userData.password = hashedPassword
    return await User.create(userData);
};
export { getUsers, createUser, authUser, deleteUser,getUser,updateUser };