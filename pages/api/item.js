// Routes for creating and getting items
import Item from "@/models/Item";
import connectDB from "@/middleware/connect";
const formidable = require('formidable');
import cloudinary from "@/middleware/cloudinary";
export const config = {
    api: {
        bodyParser: false,
    },
};
const handler = async (req, res) => {

    const { method } = req;
    console.log(method)
    const limit = parseInt(req.query.limit);
    switch (method) {
        case "GET":
            try {
                const items = await Item.find().limit(limit);
                const count = await Item.countDocuments();
                if (limit >= count) {
                    res.status(200).json({ success: true, data: items, loadMore: false });
                } else {
                    res.status(200).json({ success: true, data: items });
                }
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                var form = new formidable.IncomingForm();
                const data = await form.parse(req);
                const { title, desc, price, category, subCategory, seller, sellerPic, sellerName } = JSON.parse(data[0].metaData)

                // Upload all images
                const images = await Promise.all(data[1].media.map(async (file) => {
                    const image = await cloudinary.uploader.upload(file.filepath);
                    return image.secure_url
                }))
                // Create Item
                const item = await Item.create({
                    title,
                    desc,
                    price,
                    category,
                    subCategory,
                    seller,
                    sellerName,
                    sellerPic,
                    images: images,
                });
                res.status(201).json({ success: true, data: item });
            } catch (error) {
                console.log(error.message)
                res.status(400).json({ success: false });
            }
            break;
        case "DELETE":
            try {
                const { id } = req.query;
                const deleteItem = await Item.findByIdAndDelete(id);
                res.status(200).json({ success: true });

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