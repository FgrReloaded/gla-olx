import connectDB from "@/middleware/connect";
import ChattingWith from "@/models/ChattingWith";

const handler = async (req, res) => {
    const { method } = req;
    const id = req.query.id;
    if (method === "GET") {
        let chattingWith = await ChattingWith.findOne({ userId: id });
        if (!chattingWith) {
            res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, chattingWith });
    }
    if (method === "POST") {
        let { id, receiver, item } = req.body;
        let filter = { userToken: receiver, itemName: item }
        let chattingWith = await ChattingWith.findOne({ userId: id });
        if (chattingWith) {
            let data = chattingWith.chattingWith.filter(function (item) {
                for (var key in filter) {
                    if (item[key] === undefined || item[key] != filter[key])
                        return true;
                }
                return false;
            });
            chattingWith.chattingWith = data;
            let getData = await chattingWith.save();
            res.status(200).json({ success: true, data: getData });
        }

    }

}
export default connectDB(handler);
