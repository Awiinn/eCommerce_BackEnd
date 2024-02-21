const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/* POST /auth/register - create new user */
router.post("/register", async (req, res, next) => {
  const salt = 5;
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await prisma.users.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        role: {connect: {id: 2} },
      },
    });
    res.status(201).send({
      user: user,
      message: "You have successfully registered your account!",
    });
  } catch (error) {
    next(error);
  }
});

/* POST /auth/login - logs in user */
router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res
        .status(401)
        .send(
          "Account with that email address does not exist. Please register an account before logging in."
        );
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user?.password
    );
    if (!passwordMatch) {
      return res.status(401).send("Invalid login credentials.");
    }
    const token = JWT.sign({ id: user.id }, process.env.JWT);
    return res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
});

/* PUT /auth/users/:id - edits user */
router.put("/users/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!updatedUser) {
      return res.status(401).send("User not found.");
    }
    return res.status(200).send("User information updated successfully!");
  } catch (error) {
    next(error);
  }
});

/* DELETE /auth/users/:id - deletes user */
router.delete("/users/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const deletedUser = await prisma.users.delete({
      where: { id: userId },
    });
    if (!deletedUser) {
      return res.status(401).send("User not found.");
    }
    res.status(200).send("User deleted successfully!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
