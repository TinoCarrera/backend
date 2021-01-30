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
        if (itemExist) {
          try {
            const newQuantity = req.body.cartItems.quantity;
            const addQuantity = await Cart.findOneAndUpdate(
              { user: req.user._id, "cartItems.product": item },
              {
                $set: {
                  cartItems: {
                    ...req.body.cartItems,
                    quantity: itemExist.quantity + newQuantity,
                  },
                },
              }
            );
            res
              .status(200)
              .json({ data: addQuantity, message: "Cantidad actualizada" });
          } catch (error) {
            console.log("Error: " + error);
            res.status(500).json({ message: error.message });
          }
        } else {
          const addProduct = await Cart.findOneAndUpdate(
            { user: req.user._id },
            {
              $push: {
                cartItems: req.body.cartItems,
              },
            }
          );
          res
            .status(200)
            .json({ data: addProduct, message: "Producto agregado al carrito" });
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
