import connectDB from "@/middleware/connect";
import Item from "@/models/Item";


const handler = async (req, res) => {
    const { method } = req;
    const limit = parseInt(req.query.limit);
    const search = req.query.search;
    switch (method) {
        case "GET":
            try {
                const items = await Item.find({ title: { $regex: search, $options: 'i' } }).limit(limit);
                const count = await Item.countDocuments({ title: { $regex: search, $options: 'i' } });
                if (limit >= count) {
                    res.status(200).json({ success: true, data: items, loadMore: false });
                } else {
                    res.status(200).json({ success: true, data: items });
                }

            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
export default connectDB(handler);