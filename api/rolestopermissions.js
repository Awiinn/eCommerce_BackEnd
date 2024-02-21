const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function connectRolesToPermissions() {
  try {
    // Find roles and permissions
    const adminRole = await prisma.roles.findUnique({
      where: { name: "admin" },
    });
    const userRole = await prisma.roles.findUnique({ where: { name: "user" } });
    const guestRole = await prisma.roles.findUnique({
      where: { name: "guest" },
    });

    const manageUsersPermission = await prisma.permissions.findUnique({
      where: { name: "manage_users" },
    });
    const placeOrdersPermission = await prisma.permissions.findUnique({
      where: { name: "place_orders" },
    });
    const viewOrderHistoryPermission = await prisma.permissions.findUnique({
      where: { name: "view_order_history" },
    });
    const manageProductsPermission = await prisma.permissions.findUnique({
      where: { name: "manage_products" },
    });

    // Connect roles to permissions
    await prisma.roles.update({
      where: { id: adminRole.id },
      data: {
        permissions: {
          connect: [
            { id: manageUsersPermission.id },
            { id: manageProductsPermission.id },
            { id: placeOrdersPermission.id },
            { id: viewOrderHistoryPermission.id },
          ],
        },
      },
    });

    await prisma.roles.update({
      where: { id: userRole.id },
      data: {
        permissions: {
          connect: [
            { id: placeOrdersPermission.id },
            { id: viewOrderHistoryPermission.id },
          ],
        },
      },
    });

    await prisma.roles.update({
      where: { id: guestRole.id },
      data: {
        permissions: {
          connect: [{ id: placeOrdersPermission.id }],
        },
      },
    });

    console.log("Roles connected to permissions successfully");
  } catch (error) {
    console.error("Error connecting roles to permissions:", error);
  } finally {
    await prisma.$disconnect();
  }
}

connectRolesToPermissions();
