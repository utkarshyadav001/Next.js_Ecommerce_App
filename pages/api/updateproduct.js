// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/connectDB.js";
import Product from "../../models/product.js";


const handler = async (req, res) => {
    try {
        if (req.method == "POST") {
            for (let i = 0; i < req.body.length; i++) {
                let cProduct = req.body[i];
                const p = await Product.findByIdAndUpdate(cProduct._id, cProduct)
            }
            res.send('Product updated sucessfully');
        }
        else {
            return res.status(400).json({ error: "This method is not allowed" })
        }
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB(handler)