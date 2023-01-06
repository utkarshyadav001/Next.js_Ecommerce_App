// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/connectDB.js";
import User from "../../models/user.js";
var CryptoJS = require("crypto-js")
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const secrectkey = process.env.NEXT_PUBLIC_JWT_SECRETKEY
            let { name, email, password } = req.body
            let encryptedPass = CryptoJS.AES.encrypt(password, secrectkey).toString();
            let data = {
                name: name,
                email: email,
                password: encryptedPass,
            }
            
            let user = new User(data)
            await user.save();

            let token = jwt.sign(data, secrectkey, { expiresIn: '1h' });

            return res.status(200).json({ success: true, msg: `Hey ${user.name} your account created successfully.`, token })
        } catch (error) {
            console.log("########################### Error catched sucessfully ###########################")
            console.log(error);
            res.status(400).json({ error: "Bad request" })
        }

    }
    else {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDB(handler)