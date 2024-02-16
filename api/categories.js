const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET /categories - get all categories */
router.get("/", async (req, res, next) => {
  try {
    const categories = await prisma.categories.findMany();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

/* GET /categories/:id - get the category specified by id */
router.get("/:id", async (req, res, next) => {
  try {
    const category = await prisma.products.findMany({
      where: {
        categoryId: Number(req.params.id),
      },
    });
    if (!category) {
      return res.status(404).send("Product was not found");
    }
    res.send(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
