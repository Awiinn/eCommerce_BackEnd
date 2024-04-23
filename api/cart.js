const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const moment = require("moment");
router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});
// GET ||  http://localhost:3000/cart (PATH)
//TEST APPROVED
router.get("/", async (req, res, next) => {
  try {
    const cart = await prisma.cart.findMany({
      where: {
        userid: req.user.id,
      },
    });
    let result = [];
    for (let item of cart) {
      result.push({
        ...item,
        products: await prisma.products.findFirst({
          where: {
            id: item.productid,
          },
        }),
      });
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});
// POST ||  http://localhost:3000/cart (PATH)
//TEST APPROVED
router.post("/", async (req, res, next) => {
  //add to cart
  try {
    const add = await prisma.cart.create({
      data: {
        userid: req.user.id,
        productid: req.body.productid,
      },
    });
    const cart = await prisma.cart.findMany({
      where: {
        userid: req.user.id,
      },
      include: {
        products: true,
      },
    });
    console.log(cart);
    return res.send(cart);
  } catch (error) {
    next(error);
  }
});
// DELETE ||  http://localhost:3000/cart (PATH) || (Add :id number in the body ex "id": 1)
//TEST APPROVED
router.delete("/", async (req, res, next) => {
  //delete one item in cart
  try {
    const findCheckoutId = await prisma.cart.findFirst({
      where: {
        productid: Number(req.body.productid),
        AND: { userid: req.user.id },
      },
    });
    const checkout = await prisma.cart.delete({
      where: {
        id: findCheckoutId.id,
      },
    });
    // return res.send(checkout);
    const cart = await prisma.cart.findMany({
      where: {
        userid: req.user.id,
      },
    });
    let result = [];
    for (let item of cart) {
      result.push({
        ...item,
        products: await prisma.products.findFirst({
          where: {
            id: item.productid,
          },
        }),
      });
    }
    return res.send(result);
  } catch (error) {
    next(error);
  }
});
//Test
router.post("/sessionCart", async (req, res, next) => {
  try {
    const session = await prisma.cart.createMany({
      data: req.body.cart,
    });
    const cart = await prisma.cart.findMany({
      where: {
        userid: req.user.id,
      },
    });
    return res.send({ cart });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
