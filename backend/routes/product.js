const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/aggregate", async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalQuantity: { $sum: "$quantity" },
                    totalPrice: { $sum: "$price" },
                    count: { $count: {} }
                }
            }
        ]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Агрегат қатесі" });
    }
});

module.exports = router;
