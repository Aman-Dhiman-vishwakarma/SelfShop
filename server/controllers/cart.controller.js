import { Cart } from "../modles/cart.modle.js";

export const addToCart = async (req, res) => {
  try {
    const { quantity, productSizeOrConfigretion } = req.body;
    
    const cart = new Cart({
      userId: req.user.id,
      productId: req.params.productId,
      quantity,
      productSizeOrConfigretion,
    });

    const add = await cart.save();
    const addCart = await add.populate("productId");
    res.status(200).json({
      success: true,
      addCart,
      message: "Product added in the cart",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchUserCartProducts = async (req, res) => {
  try {
    const cartProducts = await Cart.find({ userId: req.user.id }).populate(
      "productId"
    );
    if (!cartProducts) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }
    res.status(200).json({
      success: true,
      cartProducts,
      message: "Cart products successfuly get",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const deletedCartProduct = await Cart.findByIdAndDelete(
      req.params.productId
    );

    res.status(200).json({
      success: true,
      deletedCartProduct,
      message: "Product deleted successfuly",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserCartItem = async (req, res) => {
  try {
    const deletedUserCartProduct = await Cart.deleteMany({userId:req.user.id});

    res.status(200).json({
      success: true,
      deletedUserCartProduct,
      message: "Cart deleted successfuly",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
