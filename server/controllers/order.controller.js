import { Order } from "../modles/order.modle.js";
import { Product } from "../modles/product.modle.js";
import { User } from "../modles/user.modle.js";
import { orderReceiverdT, sendmail } from "../utils/sendMail.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    // here we have to update stocks;
    for (let item of newOrder.products) {
      let product = await Product.findOne({ _id: item.productId._id });
      product.stock = product.stock - 1 * item.quantity;

      //Hear we have to update a perticuler size stock
      if (product.availableSizes.length !== 0) {
        const newSizeStock = product.availableSizes.map((elm) => {
          if (elm.name == item.productSizeOrConfigretion) {
            return {
              name: elm.name,
              stockAvailable: elm.stockAvailable - 1 * item.quantity,
            };
          }
          return elm;
        });

        product.availableSizes = newSizeStock;
      }

      // for optimum performance we should make inventory outside of product.
      await product.save();
    }

    const order = await newOrder.save({validateModifiedOnly:true});
    const user = await User.findById(newOrder.user);

    const mailOptions = {
      to: user.email,
      subject: "Order Received",
      html:orderReceiverdT(order, user.fullname)
    };

    const responce = await sendmail(mailOptions);

    res
      .status(200)
      .json({ success: true, order, message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    if (!orders) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, orders, message: "Order fetch successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const orderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, order, message: "Order fetch successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({
      ...(req.query.status && { status: req.query.status }),
      ...(req.query.city && { city: req.query.city }),
    })
      .skip(0)
      .limit(10)
      .sort({ createdAt: -1 });
    if (!allOrders) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, allOrders, message: "Order fetch successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrders = async (req, res) => {
  if (!req.user.isAdmin) {
    return res
    .status(401)
    .json({ success: false, message: "You are not able to update orders status" });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      updatedOrder,
      message: "Order updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
