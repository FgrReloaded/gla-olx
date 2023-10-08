import connectDB from "@/middleware/connect";
import Product from "@/models/Item";

const handler = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.body.item }, { $inc: { views: 1 } }, { new: true });
        res.status(200).json({ success: true, data: product }); 
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

export default connectDB(handler);
