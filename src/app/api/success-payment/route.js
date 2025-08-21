import axios from "axios";
import { NextResponse } from "next/server";
import { Payment } from "../../../../models/payment";
import { Cart } from "../../../../models/addCart";
import connectionToDatabase from "../../../../lib/db";
import mongoose from "mongoose";

export async function POST(req) {
  console.log("url", req.url)
  await connectionToDatabase();

  const bodyText = await req.text();
  const params = new URLSearchParams(bodyText);
  const successPayment = Object.fromEntries(params.entries());

  //console.log("✅ Success Payment Payload:", successPayment);

  // payment validation
  const { data } = await axios.get(`https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${successPayment.val_id}&store_id=foodr68a5d1f3a54ec&store_passwd=foodr68a5d1f3a54ec@ssl&format=json`);
  console.log("data", data)

  if (data.status !== "VALID") {
    return NextResponse.json({ message: "Invalid Payment" })
  }

  // Update payment in MongoDB
  await Payment.updateOne({ transactionId: data.tran_id }, { payment: "success" });

  const payment = await Payment.findOne({ transactionId: data.tran_id });
  //console.log("payment", payment)

  // cartIds থেকে ObjectId বানিয়ে query
  const query = {
    _id: { $in: payment.cartIds.map((id) => new mongoose.Types.ObjectId(id)) },
  };

  // Cart delete
  await Cart.deleteMany(query);

  // ✅ redirect to myOrders page
  return NextResponse.redirect("http://localhost:3000/myOrders", {
    status: 303, // 303 See Other = safe redirect after POST
  });


}


