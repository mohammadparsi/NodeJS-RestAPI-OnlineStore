const Order = require('../models/order');
const Product = require('../models/product');
const OrderLine = require('../models/orderLine');
const mongoose = require('mongoose');

exports.createOrder = async (req, res, next) => {
    const orderId = mongoose.Types.ObjectId();
    const order = new Order({
        _id: orderId,
        paymentMethod: 'CreditCard',
        orderLines: []
    });

    try {
        for (const orderLine of req.body.orderLines) {
            const productId = orderLine.productId;
            const quantity = orderLine.quantity;
            const amount = orderLine.amount;
            const ordLine = new OrderLine({
                order: orderId,
                product: productId,
                quantity: quantity,
                amount: amount
            });
            const savedOrderLine = await ordLine.save();
            order.orderLines.push(savedOrderLine);
            const product = await Product.findById(productId);
            product.orderLines.push(savedOrderLine);
            await product.save()
        }

        const result = await order.save();
        res.status(201).json({
            message: "order created successfully.",
            order: order
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
    }
}

// {
//     "orderDate": "2013-10-21T13:28:06.419Z",
//         "orderLines": [{ "productId": '6336c39e8b72246bd93b3b57', "quantity": 1, "amount": 1400 },
//         { "productId": '6336c3e08b72246bd93b3b60', "quantity": 3, "amount": 3 }
//         ]
// }