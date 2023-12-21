const express = require("express");
const { Order } = require("./orders");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");

router.post(`/`, async (req, res) => {
    try {
        let orders = new Order({
            user: new mongoose.Types.ObjectId(req.body.user),
            address: req.body.address,
        });

        orders = await orders.save();
        if (!orders) {
            return res.status(500).send("The order cannot be created");
        }
        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get(`/`, async (req, res) => {
    try {
        const ordersList = await Order.find();
        if (!ordersList) {
            return res.status(500).json({ success: false });
        }
        res.json(ordersList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal error" });
    }
});

router.get(`/userdetails`, async (req, res) => {
    try {
         const orders = await Order.find();
         const orderDetailsPromises = orders.map(async (order) => {
            const userResponse = await axios.get("http://localhost:3000/api/v1/users/" + order.user);
            return {
                order: order,
                userDetails: userResponse.data,
            };
        });
 
         const orderDetails = await Promise.all(orderDetailsPromises);

        res.json(orderDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal error" });
    }
});

module.exports = router;
