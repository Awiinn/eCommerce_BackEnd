const { PrismaClient } = require("@prisma/client") 
const prisma = new PrismaClient()

const products = [
  {
    name: "Banana",
    price: 0.99,
    description: "it's a banana",
    inStock: 10,
    imageUrl: "https://t.ly/huKbC",
  },
  {
    name: "Carrot",
    price: 0.99,
    description: "it's a carrot",
    inStock: 10,
    imageUrl: "https://t.ly/iIHsM",
  },
  {
    name: "Coca-Cola",
    price: 3.99,
    description: "2L",
    inStock: 10,
    imageUrl: "https://t.ly/Fqi3u",
  },
];

const users = [
  {
    email: "aaron@admin.co",
    password: "aaron123",
    firstName: "Aaron",
    lastName: "Kim",
    isAdmin: false,
  },
  {
    email: "mark@admin.co",
    password: "mark123",
    firstName: "Mark",
    lastName: "Reyes",
    isAdmin: true,
  },
  {
    email: "tyrice@admin.co",
    password: "tyrice123",
    firstName: "Tyrice",
    lastName: "Freeman",
    isAdmin: true,
  },
];

const generateData = async () => {
  try {
    await prisma.products.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.products.createMany({
      data: products,
    });
    await prisma.users.createMany({
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

generateData();