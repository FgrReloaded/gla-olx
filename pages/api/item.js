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
    switch (method) {
        case "GET":
            try {
                const items = await Item.find();
                res.status(200).json({ success: true, data: items });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                var form = new formidable.IncomingForm();
                const data = await form.parse(req);
                const { title, desc, price, category, seller, sellerPic, sellerName } = JSON.parse(data[0].metaData)

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
                    seller,
                    sellerName,
                    sellerPic,
                    images: images,
                });
                // })
                // const uploadedImage = await cloudinary.uploader.upload(image);

                // let images = [];
                // for (let i = 0; i < req.files.length; i++) {
                //     let image = await cloudinary.uploader.upload(req.files[i].path);
                //     images.push(image.secure_url);
                // }
                // const item = await Item.create({
                //     title: req.body.title,
                //     desc: req.body.desc,
                //     price: req.body.price,
                //     category: req.body.category,
                //     seller: req.body.seller,
                //     images: images,
                // });
                res.status(201).json({ success: true, data: item});
            } catch (error) {
                console.log(error.message)
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

export default connectDB(handler);