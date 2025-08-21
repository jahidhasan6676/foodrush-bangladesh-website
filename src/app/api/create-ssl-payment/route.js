// /app/api/create-ssl-payment/route.js
import axios from "axios";
import { NextResponse } from "next/server";
import { Payment } from "../../../../models/payment";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        const payment = await req.json();

        // Transaction ID generate
        const trxId = new mongoose.Types.ObjectId().toString();
        payment.transactionId = trxId;

        // Initiate payment data
        const initiate = {
            store_id: "foodr68a5d1f3a54ec",
            store_passwd: "foodr68a5d1f3a54ec@ssl",
            total_amount: payment.price,
            currency: 'BDT',
            tran_id: trxId,
            success_url: 'http://localhost:3000/api/success-payment',
            fail_url: 'https://shopper-application-3cae2.web.app/fail',
            cancel_url: 'https://shopper-application-3cae2.web.app/cancel',
            ipn_url: 'http://localhost:3000/ipn-success-payment',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: `${payment?.name}`,
            cus_email: `${payment?.email}`,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: 1000,
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        // axios POST: URLSearchParams to ensure x-www-form-urlencoded
        const iniResponse = await axios({
            url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
            method: "POST",
            data: initiate,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })

        // Save payment info in MongoDB
        await Payment.create(payment);

        const gatewayUrl = iniResponse?.data?.GatewayPageURL;

        if (!gatewayUrl) {
            console.error("Gateway URL missing:", iniResponse.data);
            return NextResponse.json({ success: false, message: "Gateway URL not found" }, { status: 500 });
        }

        return NextResponse.json({ gatewayUrl });
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}



