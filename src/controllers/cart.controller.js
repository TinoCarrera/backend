const Cart = require("../models/cart.model");

exports.addItemToCart = async (req, res) => {
  try {
    const cartExist = await Cart.findOne({ user: req.user._id }).exec();
    if (cartExist) {
      try {
        const item = req.body.cartItems.product;
        const itemExist = await cartExist.cartItems.find(
          (cart) => cart.product == item
        );
        let condition, update;
        if (itemExist) {
          condition = { user: req.user._id, "cartItems.product": item };
          update = {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: itemExist.quantity + req.body.cartItems.quantity,
              },
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: req.body.cartItems,
            },
          };
        }
        try {
          const updateCart = await Cart.findOneAndUpdate(condition, update);
          res
            .status(200)
            .json({ data: updateCart, message: "Carrito actualizado" });
        } catch (error) {
          console.log("Error: " + error);
          res.status(500).json({ message: error.message });
        }
      } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: error.message });
      }
    } else {
      try {
        const newCart = new Cart({
          user: req.user._id,
          cartItems: [req.body.cartItems],
        });
        const saveCart = await newCart.save();
        res
          .status(200)
          .json({ data: saveCart, message: "Carrito creado correctamente" });
      } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: error.message });
      }
    }
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: error.message });
  }
};
