const express = require("express");
const { route } = require("./contact");
const { Router } = express;
const router = Router();
const {mpesaAccessToken} = require("../helpers/mpesaAccessToken");

router.post("/stk", async (req, res) => {
  try {
    const token = await mpesaAccessToken();
    const url =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const body = {
      BusinessShortCode: "174379",
      Password:
        "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
      Timestamp: "20160216165627",
      TransactionType: "CustomerPayBillOnline",
      Amount: "1",
      PartyA: "254701665262",
      PartyB: "174379",
      PhoneNumber: "254701665262",
      CallBackURL: "https://dialup.onrender.com/api/mpesa/stk",
      AccountReference: "Test",
      TransactionDesc: "Test",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url,options);
    const data = await response.json();
    
    console.log(req.body)
    return res.status(200).json(req.body)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
});

module.exports = router;
