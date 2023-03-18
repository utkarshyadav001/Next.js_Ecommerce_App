// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken"
import User from "../../models/user"

export default async function handler(req, res) {
    if(req.method == 'POST'){
        try {
            const {token} = req.body;

            if(!token){
                return res.status(400).json({success: false, error: "Some things wates worng1"})
            }

            const tokenData = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRETKEY);
            let temail = tokenData.email;
            const dbUser = await User.findOne({"email" : temail});

            console.log(dbUser)
            const  {name, email, phone, pincode, address} = dbUser
            let data = {name, email, phone, pincode, address}

            return res.status(200).json({success: true, data: data})

        } catch (error) {
            console.log(error)
            return res.status(400).json({success: false, error: "Some things wates worng2"})
        }
    }  else {
        return res.status(400).json({success: false, error: "Some things wates worng3"})
    }

}
  