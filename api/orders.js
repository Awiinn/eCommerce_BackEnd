const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET /orders - get all orders */
router.get("/", async (req, res, next) => {
  try {
    const orders = await prisma.orders.findMany();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await prisma.orders.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!order) {
      return res.status(404).send("Order was not found");
    }
    res.send(order);
  } catch (error) {
    next(error);
  }
});

/* GET /orders - get all order details */
router.get("/", async (req, res, next) => {
  try {
    const orderDetails = await prisma.orderdetails.findMany();
    res.send(orderDetails);
  } catch (error) {
    next(error);
  }
});

router.get("/details/:id", async (req, res, next) => {
  try {
    const orderDetails = await prisma.orderdetails.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!orderDetails) {
      return res.status(404).send("Order details were not found");
    }
    res.send(orderDetails);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
