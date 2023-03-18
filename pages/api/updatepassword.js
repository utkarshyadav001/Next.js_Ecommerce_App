// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken";
import user from "../../models/user";
import CryptoJS from 'crypto-js';

export default async function handler(req, res) {
    if(req.method == 'POST'){
        try {
            const body = req.body
            const {token} = body;
            const {password, cpassword} = body.newPassword;
            const secrectkey = process.env.NEXT_PUBLIC_JWT_SECRETKEY

            if(!token && !password && !cpassword){
                return res.status(400).json({success: false, error: "Some things wates worng1"})
            }
            if(password != cpassword){
                return res.status(400).json({success: false, error: "Some things wates worng21"})
            }

            const tokenData = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRETKEY)
            const temail = tokenData.email

            let encryptedPass = CryptoJS.AES.encrypt(password, secrectkey).toString();
            console.log(password)
            console.log(encryptedPass)

            const datedUser = await user.findOneAndUpdate({ "email" : temail }, {"password": encryptedPass})
            console.log(datedUser)


            return res.status(200).json({success: true, datedUser: datedUser, msg: "Your details updated successfully "})

        } catch (error) {
            console.log(error)
            return res.status(400).json({success: false, error: "Some things wates worng2"})
        }
    }  else {
        return res.status(400).json({success: false, error: "Some things wates worng3"})
    }

}
  