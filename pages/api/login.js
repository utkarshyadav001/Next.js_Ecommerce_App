// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/connectDB.js";
import User from "../../models/user.js";
var CryptoJS =  require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            let {email , password} = req.body;

            let findUser = await User.findOne({"email" : email});
            console.log(findUser)

            if(findUser){
                let bytes  = CryptoJS.AES.decrypt(findUser.password, 'secretkey123');
                let decryptedPass = bytes.toString(CryptoJS.enc.Utf8); 

                if( decryptedPass == password ){
                    let data = { name: findUser.name, email:  findUser.email, password: findUser.password }
                    let token = jwt.sign(data, 'secretkey123', { expiresIn: '1h' });
                    return res.status(200).json({success: true, msg: "Login successfully", token})
                }
                else{
                    return res.status(400).json({success: false, error: "Please enter a valid email or password"})
                }
            }
            else{
                return res.status(400).json({success: false, error: "No user exits with this email, Please create new account"});
            }

        } catch (error) {
            console.log("########################### Error catched sucessfully ###########################")
            console.log(error);
            res.status(400).json({success: false, error: "Bad request"})
        }

    }
    else {
        return res.status(400).json({ success: false, error: "This method is not allowed" })
    }
}

export default connectDB(handler)