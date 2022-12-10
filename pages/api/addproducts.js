// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/connectDB.js";
import Product from "../../models/product.js";


const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            let data = req.body;

            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                let p = new Product({
                    title: element.title,
                    slug: element.slug,
                    desc: element.desc,
                    img: data.img,
                    category: data.category,
                    size: element.size,
                    color: element.color,
                    price: element.price,
                    availableQty: element.availableQty
                })
                console.log(element,"before saving")
                await p.save()
                console.log("after saving", p._id)
                // await Product.insertMany(p)
            }
            return res.status(200).send("Success")
        } catch (error) {
            console.log("########################### Error catched sucessfully ###########################")
            console.log(error);
            res.status(400).send("Bad request")
        }

    }
    else {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDB(handler)