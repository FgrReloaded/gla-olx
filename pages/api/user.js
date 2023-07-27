// Create a new user
import User from "@/models/User";
import connectDB from "@/middleware/connect";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const auth = req.headers.auth
                const decoded = jwt.verify(auth, process.env.JWT_SECRET);
                const user = await User.findOne({ email: decoded.user.email }).select('-password');
                res.status(200).json({ success: true, user })
            } catch (error) {
                res.status(400).json({
                    success: false, msg: error.message
                });
            }
            break;

        case 'POST':
            try {
                let user = await User.findOne({ email: req.body.email });
                if (user) {
                    return res.status(400).json({ success: false, message: "User already exists" });
                }
                const { password } = req.body;
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                req.body.password = hashedPassword;

                user = await User.create(req.body);

                const data = {
                    user: {
                        email: user.email
                    }
                }
                const authToken = jwt.sign(data, process.env.JWT_SECRET)

                res.status(200).json({ success: true, authToken })
            } catch (error) {
                res.status(400).json({
                    success: false, msg: error.message
                });
            }

            break;

        default:
            res.status(400).json({
                success: false, msg: error.message
            });
            break;
    }
}

export default connectDB(handler)

