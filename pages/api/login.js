// Login router for user
import User from "@/models/User";
import connectDB from "@/middleware/connect";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const handler = async (req, res) => {
    if (req.method == "POST") {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ error: "User not found" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            res.status(404).json({ error: "Password is incorrect" })
        }
        const data = {
            user: {
                email: user.email
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET)
        res.status(200).json({ success: true, authToken })
    }
}
export default connectDB(handler)