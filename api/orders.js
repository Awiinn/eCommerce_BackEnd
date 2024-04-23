const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
// Logged in Admin can view any orders based on the input id
//POST || PATH http://localhost:3000/orders/admin  || 
router.post("/admin", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.send("Need to login");
    }
    const user = await prisma.users.findFirst({
      where: {
        id: req.user.id,
      },
    });
    if (!user.isadmin) {
      return res.send("Not an admin");
    }
    //find all orders based on the id admin is checking
    const orders = await prisma.orders.findMany({
      where: {
        userid: req.body.id,
      },
    });
    //find all order details of the order, looking into orderdetails table with reference to order id
    const results = [];
    for (let order of orders) {
      const orderdetails = await prisma.orderdetails.findMany({
        where: {
          orderid: order.id,
        },
      });
      results.push({ order, orderdetails });
    }
    //find all product description of order details, looking into products table with reference to orderdetails product id
    const array = [];
    for (let order of results) {
      const productInfo = [];
      for (let orders of order.orderdetails) {
        productInfo.push({
          ...orders,
          productDescription: await prisma.products.findFirst({
            where: {
              id: orders.productid,
            },
          }),
        });
      }
      array.push({ ...order.order, productInfo });
    }
    res.send(array);
  } catch (error) {
    next(error);
  }
});
//Logged in USER (Not ADMIN) can view their own order
// Get || Path / http://localhost:8080/orders/customer (Ex: "id": 4 (in the body))
// Test Approved
router.get("/customer", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.send("Need to login");
    }
    //get all orders of user, looks into order table with reference to user id
    const orders = await prisma.orders.findMany({
      where: {
        userid: req.user.id, //req.user.id
      },
    });
    //Get all order details of each order,
    // looks into orderdetails table with reference to order id
    const results = [];
    for (let order of orders) {
      const orderdetails = await prisma.orderdetails.findMany({
        where: {
          orderid: order.id,
        },
      });
      results.push({ order, orderdetails });
    }
    //Get all product descriptions of each
    // order details for each order, looks
    // into product table with reference to orderdetails product id
    const array = [];
    for (let order of results) {
      const productInfo = [];
      for (let orders of order.orderdetails) {
        productInfo.push({
          ...orders,
          productDescription: await prisma.products.findFirst({
            where: {
              id: orders.productid,
            },
          }),
        });
      }
      array.push({ ...order.order, productInfo });
    }
    res.send(array);
  } catch (error) {
    next(error);
  }
});
//create an order for a Logged in User
//POST || Path http://localhost:8080/orders // Test Approved
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.send("Need to login");
    }
    //create an order to get the order number to add into each order item
    const orders = await prisma.orders.create({
      data: {
        userid: req.user.id, //hardcoded in need login/register to be done  //req.user.id
      },
    });
    const cart = await prisma.cart.findMany({
      where: {
        userid: req.user.id,
      },
    });
    let array = [];
    //loop through each item and add the orderid
    for (let x of cart)
      array.push({ productid: x.productid, orderid: orders.id });
    //add all the items into the orderdetails table
    const orderDetails = await prisma.orderdetails.createMany({
      data: array,
    });
    await prisma.cart.deleteMany({
      where: {
        userid: req.user.id,
      },
    });
    await prisma.cart.deleteMany({
      //once checkout is called, delete cart
      where: {
        userid: req.user.id,
      },
    });
    res.send({ orders, orderDetails });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
