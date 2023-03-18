// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/connectDB.js";
import Order from "../../models/order.js";
import Product from "../../models/product.js";
import pincodes from "../../pincodes.json"

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let { subTotal, cart, name, email, address, phone, pincode } = req.body;
      console.log(req.body)


      
      // #################### Check user details vaild or not ####################

      
      if(!subTotal || !cart || !name || !email || !address || !phone || !pincode || subTotal == 0 || Object.keys(cart).length <=0 ){
        return res.status(400).json({ success: false, error: "Please Enter all valid details", clearCart : false });
      }

      if(Object.keys(cart).length <=0 ){
        return res.status(400).json({ success: false, error: "Please add product in your cart", clearCart : false });
      }
      

      if(phone.length !=10 || Number.isInteger(phone)){
        return res.status(400).json({ success: false, error: "Please Enter 10 digit Phone Number", clearCart : false });
      }
      if(pincode.length !=6 || Number.isInteger(pincode)){
        return res.status(400).json({ success: false, error: "Please Enter 6 digit Pincode", clearCart : false });
      }

      if (!Object.keys(pincodes).includes(pincode)) {
        return res.status(400).json({ success: false, error: "Sorry, your pincode is not serviceable", clearCart : false });
      }
      


      // #################### Checking Product qty availavble or not  #################### 
      
      for (let item in cart) {
        let product = await  Product.findOne({ slug: item });        
        if ( product.availableQty == 0 || product.availableQty < cart[item].qty ) {
          return res.status(400).json({ success: false, error: "Sorry ! Some items are not available or out of stock, Please try latter", clearCart : false } );
        }
      }

      

      // #################### Check Price SCAM #################### 
      let checkSubTotal;
      let scam;


      for (let item in cart) {
        let product = await  Product.findOne({ slug: item });
        if ((cart[item].price * cart[item].qty) != (product.price * cart[item].qty)) {
          scam = true;
        }
        checkSubTotal += cart[item].qty * product.price;
      }

      if (scam) {
        return res.status(400).json({ success: false, error: "Sorry, Some things waste, Wrong Please try again letter", clearCart : true });
      }



      const orderID = (Math.random() * Date.now()).toFixed();
      // console.log(orderID);

        let order = new Order({
          email: email,
          orderId: orderID,
          products: cart,
          address: address,
          amount: subTotal,
          status: "paid",
        });
        await order.save();

        let oid = order._id;


        
      // #################### Updating Product available qty ####################
      
      for (let item in cart) {
        await  Product.findOneAndUpdate({ slug: item }, {$inc : {"availableQty":  - cart[item].qty}});
      }

      //   res.redirect('/order', 200)
      return res.status(200).json({success: true, oid, clearCart : false, msg: "Your order has been placed."})
    } catch (error) {
      console.log(
        "########################### Error catched sucessfully ###########################"
      );
      console.log(error);
      return res.status(400).json({ success: false, error: "Sorry, Some things waste, Wrong Please try again letter", clearCart : false });
    }
  } else {
    return res.status(400).json({ success: false, error: "Sorry, This method is not allowed", clearCart : false });
  }
};

export default connectDB(handler);
