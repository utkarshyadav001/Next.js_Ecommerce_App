// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes = {
    "209861" : ["Unnao", "Uttar Pradesh"],
    "208001" : ["Kanpur", "Uttar Pradesh"],
    "123456" : ["Paloura", "Jammu"],
    "209862" : ["Delhi", "Delhi"]
  }
    res.status(200).json( pincodes )
  }
  