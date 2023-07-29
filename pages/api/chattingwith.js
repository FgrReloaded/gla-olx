import connectDB from "@/middleware/connect";
import ChattingWith from "@/models/ChattingWith";

const handler = async (req, res) => {
    const { method } = req;
    const id = req.query.id;
    if (method === "GET") {
        let chattingWith = await ChattingWith.findOne({ userId: id });
        res.status(200).json({ success: true, chattingWith });
    }

}
export default connectDB(handler);
