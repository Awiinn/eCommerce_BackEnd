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

router.get("/:id", async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true, // Include the role associated with the user
      },
    });
    if (!user) {
      return res.status(404).send("User was not found");
    }
   
    const roleWithPermissions = await prisma.roles.findFirst({
      where: {
        id: user.role_id,
      },
      include: {
        permissions: true, 
      },
    });

    res.json({
      user,
      roles: user.role,
      permissions: roleWithPermissions.permissions,
    });
  } catch (error) {
    next(error);
  }
});



router.put("/roles/:roleId/permissions", async (req, res, next) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;
    const updatedRole = await prisma.roles.update({
      where: {
        id: Number(roleId),
      },
      data: {
        permissions: {
          connect: permissions.map((permissionId) => ({ id: permissionId })), 
        },
      },
      include: {
        permissions: true, 
      },
    });
    res.json(updatedRole.permissions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

module.exports = router;

