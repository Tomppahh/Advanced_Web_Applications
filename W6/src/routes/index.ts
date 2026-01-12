import { Router, Request, Response } from "express";
import Offer from "../models/Offer";
import Image from "../models/Image";
import upload from "../middleware/multer-config";

const router = Router();

// Your routes go here
router.get("/", (req, res) => {
    res.send("Test route!");
});

router.post("/upload", upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body;
        let imageId = "";
        let savedImage = null;
        if (req.file) {
            const newImage = new Image({
                filename: req.file.filename,
                path: `images/${req.file.filename}`
            });
            await newImage.save();
            imageId = newImage._id.toString();
        }

        const newOffer =  new Offer({
            title,
            description,
            price: Number(price),
            imageId: imageId
        });
        
        await newOffer.save();
        res.status(201).json({ message: "Offer created succesfully", offer: newOffer, image: savedImage});
    } catch (error) {
        res.status(500).json({ error: "Failed to create offer" });
    }
});

router.get("/offers", async (req: Request, res: Response) => {
    try {
        const offers = await Offer.find();
        const offersWithImages = [];
        
        for (const offer of offers) {
            let imagePath = null;
            
            if (offer.imageId) {
                const image = await Image.findById(offer.imageId);
                if (image) {
                    imagePath = image.path;
                }
            }
            
            offersWithImages.push({
                title: offer.title,
                description: offer.description,
                price: offer.price,
                imagePath: imagePath
            });
        }
        
        res.status(200).json(offersWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch offers" });
    }
});

export default router;