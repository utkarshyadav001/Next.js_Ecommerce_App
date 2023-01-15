// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pincode from "../../pincodes.json"

export default function handler(req, res) {
    let pincodes = pincode
    res.status(200).json( pincodes )
  }
  