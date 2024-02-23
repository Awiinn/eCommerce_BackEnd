const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();




router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("Please log in to continue");
  }
  next();
});


// /* GET / Get Oderdetails
router.get ("/", async (req, res, next) => {
  try{
    const orderDetails = await prisma.orderdetails.findMany({
      where: {
        id: req.user.id
      }
    });
    let result = [];
    for (let o of orderDetails) {
      result.push({
        ...o,
        description: await prisma.products.findFirst({
          where: {
            id: o.productId,
          }
        })
      })
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});


// /* POST / add to order
router.post("/", async (req, res, next) => {
  
  try {
    const add = await prisma.orderdetails.create({
      data: {
        user_id: req.user.id,
        productid: req.body.productId,
      },
    });
    const orderDetails = await prisma.orderdetails.findMany({
      where: {
        user_id: req.user.id,
      },
    });
    let result = [];
    for (let o of orderDetails) {
      result.push({
        ...o,
        description: await prisma.products.findFirst({
          where: {
            id: o.productId,
          },
        }),
      });
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// // /* Delete / Delete items from orders
router.delete("/", async (req, res, next) => {
 
  try {
    const getCheckoutId = await prisma.orderdetails.findFirst({
      where: {
        productid: Number(req.body.productId),
        userid: req.user.id,
      },
    });
    const checkout = await prisma.orderdetails.delete({
      where: {
        id: getCheckoutId.id,
      },
    });
    const orderDetails = await prisma.orderdetails.findMany({
      where: {
        userid: req.user.id,
      },
    });
    let result = [];
    for (let o of orderDetails) {
      result.push({
        ...o,
        description: await prisma.products.findFirst({
          where: {
            id: o.productId,
          },
        }),
      });
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});


router.post("/session", async (req, res, next) => {
  try {
    const session = await prisma.orderdetails.createMany({
      data: req.body.orderdetails,
    });
    const orderDetails = await prisma.orderdetails.findMany({
      where: {
        userid: req.user.id,
      },
    });
    return res.send({ orderDetails});
  } catch (error) {
    next(error);
  }
});

module.exports = router;