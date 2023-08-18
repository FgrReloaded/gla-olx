import connectDB from "@/middleware/connect";
import Wishlist from "@/models/Wishlist";

const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                let wishlist;
                if (req.query.productId) {
                    wishlist = await Wishlist.find({productId: req.query.productId });
                }else if(req.query.userId && req.query.productId){
                    wishlist = await Wishlist.find({userId: req.query.userId , productId: req.query.productId });
                }
                else{
                    wishlist = await Wishlist.find({ userId: req.query.userId });
                }
                if (wishlist.length === 0) {
                    return res.status(400).json({ success: false, message: "Wishlist not found" });
                }
                res.status(200).json({ success: true, data: wishlist });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const wishlist = await Wishlist.create(req.body);
                res.status(201).json({ success: true, data: wishlist });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "DELETE":
            try {
                let deletedItem = await Wishlist.findByIdAndDelete({ _id: req.query.id });
                res.status(200).json({ success: true, data: deletedItem });
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