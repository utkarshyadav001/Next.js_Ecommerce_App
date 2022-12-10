// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/connectDB.js";
import product from "../../models/product.js";


const  handler = async (req, res)=>{
    let products = await product.find();
    res.status(200).json({ products })
}

export default connectDB(handler)