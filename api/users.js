const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET /users - get all users */
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.users.findMany();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

/* GET /users/:id - get the user specified by id */
router.get("/:id", async (req, res, next) => {
  try {
    const users = await prisma.users.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!users) {
      return res.status(404).send("User was not found");
    }
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
