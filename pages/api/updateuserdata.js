// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken"
import user from "../../models/user"

export default async function handler(req, res) {
    if(req.method == 'POST'){
        try {
            let datedUser;
            const {token} = req.body;
            console.log(req.body)

            if(!token){
                return res.status(400).json({success: false, error: "Some things wates worng1"})
            }

            const tokenData = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRETKEY)
            const temail = tokenData.email
            const {name, email, phone, pincode, address, password , cpassword} = req.body.updatedata

            if(!password){
                console.log("iamrunning1")
                datedUser = await user.findOneAndUpdate({ email : temail }, {name, phone, pincode, address})
            }
            else{
                if(password == cpassword){
                console.log("iamrunning2")

                    const secrectkey = process.env.NEXT_PUBLIC_JWT_SECRETKEY
                    const encryptedPass = CryptoJS.AES.encrypt(password, secrectkey).toString();
                    datedUser = await user.findOneAndUpdate({ email : temail }, {encryptedPass})
                }
                else{
                console.log("iamrunning3")

                    return res.status(400).json({success: false, error: "Some things wates worng2"});
                }
            }
            console.log("iamrunning88")

            return res.status(200).json({success: true, "datedUser" : datedUser, msg: "Your details updated successfully "})

        } catch (error) {
            console.log(error)
            return res.status(400).json({success: false, error: "Some things wates worng3"})
        }
    }  else {
        return res.status(400).json({success: false, error: "Some things wates worng4"})
    }

}
  