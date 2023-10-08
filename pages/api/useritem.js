import Item from "@/models/Item";
import connectDB from "@/middleware/connect";

const handler = async (req, res) => {
    const { method } = req;
    switch (method) {
        case "POST":
            try {
                const { id } = req.body
                const items = await Item.find({ seller: id });
                res.status(200).json({ success: true, data: items });
            }
            catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
export default connectDB(handler);