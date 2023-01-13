// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/connectDB.js";
import order from "../../models/order.js";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let { token } = req.body;
      console.log(token, process.env.NEXT_PUBLIC_JWT_SECRETKEY)
      if (!token) {
        return res.status(400).json({ error: "Please login" });
      }

      let userInfo = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRETKEY);
      console.log(userInfo)

      let products = await order.find({email: userInfo.email});

      return res.status(200).json({ products });
    } catch (error) {
        console.log(error)
      return res
        .status(400)
        .json({ error: "some error occured please try again letter" });
    }
  } else {
    return res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
