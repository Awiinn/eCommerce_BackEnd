const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Categories
const category = [
  { name: "Vegetables" },
  { name: "Fruits" },
  { name: "Meat" },
  { name: "Seafood" },
  { name: "Condiments" },
  { name: "Dairy" },
  { name: "Grains & Baking" },
  { name: "Pantry Staples" },
  { name: "Beverages" },
  { name: "Snacks & Sweets" },
  { name: "Frozen Foods" },
  { name: "Personal Care" },
  { name: "Cleaning Supplies" },
  { name: "Pet Care" },
];

// Products
const products = [
  // Vegetables
  {
    name: "Carrots",
    price: 1.99,
    description: "Fresh and crunchy carrots, great for salads or snacking.",
    inStock: 10,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/8e17f6e2-7c67-45bb-85c8-3fe67daba804/Default_carrots_as_a_grocery_photo_0.jpg",
  },
  {
    name: "Broccoli",
    price: 2.49,
    description: "Nutritious broccoli packed with vitamins and minerals.",
    inStock: 8,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/5774e677-fdfb-42d6-8fba-e1ea1faab553/Default_Broccoli_as_a_grocery_photo_0.jpg",
  },
  {
    name: "Spinach",
    price: 2.29,
    description: "Tender spinach leaves, perfect for salads or cooking.",
    inStock: 15,
    imageUrl: "https://example.com/spinach.jpg",
  },
  {
    name: "Lettuce",
    price: 1.79,
    description:
      "Crisp and refreshing lettuce, ideal for salads and sandwiches.",
    inStock: 20,
    imageUrl: "https://example.com/lettuce.jpg",
  },
  {
    name: "Tomatoes",
    price: 1.59,
    description: "Juicy and flavorful tomatoes, versatile for various dishes.",
    inStock: 12,
    imageUrl: "https://example.com/tomatoes.jpg",
  },
  {
    name: "Bell Peppers",
    price: 1.29,
    description:
      "Sweet and crunchy bell peppers, great for adding color to meals.",
    inStock: 8,
    imageUrl: "https://example.com/bell-peppers.jpg",
  },
  {
    name: "Cucumbers",
    price: 2.19,
    description:
      "Cool and hydrating cucumbers, perfect for salads or pickling.",
    inStock: 10,
    imageUrl: "https://example.com/cucumbers.jpg",
  },
  {
    name: "Onions",
    price: 1.99,
    description: "A kitchen staple, versatile and essential for many recipes.",
    inStock: 15,
    imageUrl: "https://example.com/onions.jpg",
  },
  {
    name: "Potatoes",
    price: 2.79,
    description:
      "Versatile and filling, great for roasting, mashing, or frying.",
    inStock: 20,
    imageUrl: "https://example.com/potatoes.jpg",
  },
  {
    name: "Zucchini",
    price: 1.89,
    description: "Mild and tender zucchini, perfect for grilling or sautéing.",
    inStock: 12,
    imageUrl: "https://example.com/zucchini.jpg",
  },
  {
    name: "Apples",
    price: 0.99,
    description: "Sweet and crunchy apples, perfect for snacking or baking.",
    inStock: 30,
    imageUrl: "https://example.com/apples.jpg",
  },
  {
    name: "Bananas",
    price: 0.99,
    description: "Creamy and nutritious bananas, a great source of potassium.",
    inStock: 25,
    imageUrl: "https://example.com/bananas.jpg",
  },
  {
    name: "Oranges",
    price: 1.29,
    description: "Juicy and refreshing oranges, packed with vitamin C.",
    inStock: 18,
    imageUrl: "https://example.com/oranges.jpg",
  },
  {
    name: "Grapes",
    price: 2.99,
    description: "Plump and juicy grapes, delicious eaten fresh or frozen.",
    inStock: 12,
    imageUrl: "https://example.com/grapes.jpg",
  },
  {
    name: "Strawberries",
    price: 1.99,
    description:
      "Deliciously sweet strawberries, great for desserts or smoothies.",
    inStock: 8,
    imageUrl: "https://example.com/strawberries.jpg",
  },
  {
    name: "Blueberries",
    price: 1.79,
    description:
      "Antioxidant-rich blueberries, perfect for breakfast or baking.",
    inStock: 10,
    imageUrl: "https://example.com/blueberries.jpg",
  },
  {
    name: "Pineapple",
    price: 2.49,
    description:
      "Tropical and sweet pineapple, great for desserts or cocktails.",
    inStock: 6,
    imageUrl: "https://example.com/pineapple.jpg",
  },
  {
    name: "Watermelon",
    price: 0.89,
    description: "Refreshing and hydrating watermelon, ideal for hot days.",
    inStock: 15,
    imageUrl: "https://example.com/watermelon.jpg",
  },
  {
    name: "Peaches",
    price: 1.59,
    description:
      "Soft and velvety peaches, perfect for desserts or fruit salads.",
    inStock: 12,
    imageUrl: "https://example.com/peaches.jpg",
  },
  {
    name: "Kiwi",
    price: 2.19,
    description:
      "Exotic and tangy kiwi, delicious eaten fresh or in smoothies.",
    inStock: 8,
    imageUrl: "https://example.com/kiwi.jpg",
  },

  // Meat
  {
    name: "Chicken Breast",
    price: 3.99,
    description:
      "Lean and protein-rich chicken breast, versatile and easy to cook.",
    inStock: 15,
    imageUrl: "https://example.com/chicken-breast.jpg",
  },
  {
    name: "Ground Beef",
    price: 4.99,
    description:
      "Juicy and flavorful ground beef, perfect for burgers or meatballs.",
    inStock: 12,
    imageUrl: "https://example.com/ground-beef.jpg",
  },
  {
    name: "Ground Pork",
    price: 3.49,
    description:
      "Lean and flavorful ground pork, great for burgers, meatballs, or sausage stuffing.",
    inStock: 20,
    imageUrl: "https://example.com/ground-pork.jpg",
  },
  {
    name: "Beef Tenderloin",
    price: 13.99,
    description: "Premium cut of beef with exceptional tenderness and flavor.",
    inStock: 8,
    imageUrl: "https://example.com/beef-tenderloin.jpg",
  },
  {
    name: "Pork Loin Roast",
    price: 5.99,
    description: "Budget-friendly option for roasting or slow cooking.",
    inStock: 25,
    imageUrl: "https://example.com/pork-loin-roast.jpg",
  },
  {
    name: "Lamb Chops",
    price: 11.99,
    description:
      "Premium cut with rich flavor, great for grilling or pan-searing.",
    inStock: 12,
    imageUrl: "https://example.com/lamb-chops.jpg",
  },
  {
    name: "Ground Turkey",
    price: 4.49,
    description: "Lean and versatile option for burgers, tacos, or meatloaf.",
    inStock: 30,
    imageUrl: "https://example.com/ground-turkey.jpg",
  },

  // Seafood
  {
    name: "Salmon Fillets",
    price: 8.99,
    description:
      "Wild-caught salmon fillets, rich in omega-3 fatty acids and perfect for grilling or baking.",
    inStock: 12,
    imageUrl: "https://example.com/salmon-fillets.jpg",
  },
  {
    name: "Shrimp",
    price: 6.99,
    description:
      "Large, peeled and deveined shrimp, ideal for stir-fries, scampi, or cocktails.",
    inStock: 15,
    imageUrl: "https://example.com/shrimp.jpg",
  },
  {
    name: "Mussels",
    price: 4.99,
    description:
      "Sustainable farm-raised mussels, perfect for steaming, simmering, or adding to seafood chowder.",
    inStock: 10,
    imageUrl: "https://example.com/mussels.jpg",
  },
  {
    name: "Tilapia Fillets",
    price: 4.99,
    description:
      "Mild-flavored and affordable option, perfect for baking or sautéing.",
    inStock: 20,
    imageUrl: "https://example.com/tilapia-fillets.jpg",
  },
  {
    name: "Mahi-Mahi Fillets",
    price: 7.99,
    description: "Flaky and flavorful fish, excellent for grilling or tacos.",
    inStock: 15,
    imageUrl: "https://example.com/mahi-mahi-fillets.jpg",
  },
  {
    name: "Scallops (Sea)",
    price: 9.99,
    description:
      "Delicate and delicious, great for appetizers or main courses.",
    inStock: 8,
    imageUrl: "https://example.com/sea-scallops.jpg",
  },

  // Condiments
  {
    name: "Ketchup",
    price: 2.99,
    description: "Classic and tangy ketchup, perfect for burgers or fries.",
    inStock: 50,
    imageUrl: "https://example.com/ketchup.jpg",
  },
  {
    name: "Mustard",
    price: 3.49,
    description: "Sharp and tangy mustard, great for sandwiches or dressings.",
    inStock: 40,
    imageUrl: "https://example.com/mustard.jpg",
  },
  {
    name: "Mayonnaise",
    price: 1.99,
    description: "Creamy and rich mayonnaise, ideal for sandwiches or salads.",
    inStock: 60,
    imageUrl: "https://example.com/mayonnaise.jpg",
  },
  {
    name: "Soy Sauce",
    price: 2.49,
    description:
      "Salty and savory soy sauce, essential in many Asian cuisines.",
    inStock: 35,
    imageUrl: "https://example.com/soy-sauce.jpg",
  },
  {
    name: "BBQ Sauce",
    price: 2.99,
    description:
      "Sweet and smoky BBQ sauce, perfect for grilled meats or ribs.",
    inStock: 28,
    imageUrl: "https://example.com/bbq-sauce.jpg",
  },

  // Dairy & Eggs
  {
    name: "Milk",
    price: 3.99,
    description: "Creamy and nutritious milk, perfect for cereal or baking.",
    inStock: 40,
    imageUrl: "https://example.com/milk.jpg",
  },
  {
    name: "Eggs",
    price: 2.49,
    description:
      "Protein-packed eggs, versatile and essential for many recipes.",
    inStock: 30,
    imageUrl: "https://example.com/eggs.jpg",
  },
  {
    name: "Butter",
    price: 4.99,
    description:
      "Rich and creamy butter, great for cooking or spreading on toast.",
    inStock: 25,
    imageUrl: "https://example.com/butter.jpg",
  },
  {
    name: "Cheese",
    price: 5.99,
    description:
      "Smooth and creamy cheese, perfect for sandwiches or cheese boards.",
    inStock: 20,
    imageUrl: "https://example.com/cheese.jpg",
  },
  {
    name: "Yogurt",
    price: 1.49,
    description: "Creamy and tangy yogurt, a delicious and nutritious snack.",
    inStock: 45,
    imageUrl: "https://example.com/yogurt.jpg",
  },

  // Grains & Baking
  {
    name: "Bread",
    price: 1.99,
    description: "Soft and fluffy bread, essential for sandwiches or toast.",
    inStock: 35,
    imageUrl: "https://example.com/bread.jpg",
  },
  {
    name: "Rice",
    price: 2.99,
    description:
      "Versatile and filling rice, great as a side dish or main course.",
    inStock: 35,
    imageUrl: "https://example.com/rice.jpg",
  },

  // Pantry Staples
  {
    name: "Pasta",
    price: 1.79,
    description:
      "Dry pasta in various shapes, perfect for quick and easy meals.",
    inStock: 50,
    imageUrl: "https://example.com/pasta.jpg",
  },
  {
    name: "Flour",
    price: 2.49,
    description:
      "All-purpose flour, essential for baking breads, cakes, and pastries.",
    inStock: 40,
    imageUrl: "https://example.com/flour.jpg",
  },
  {
    name: "Sugar",
    price: 1.99,
    description: "Sweetener for various uses, from baking to beverages.",
    inStock: 60,
    imageUrl: "https://example.com/sugar.jpg",
  },
  {
    name: "Coffee",
    price: 4.99,
    description:
      "Ground coffee for brewing, various roasts and flavors available.",
    inStock: 35,
    imageUrl: "https://example.com/coffee.jpg",
  },
  {
    name: "Tea",
    price: 2.99,
    description:
      "Loose leaf or bagged tea in various flavors, calming and refreshing.",
    inStock: 28,
    imageUrl: "https://example.com/tea.jpg",
  },

  // Beverages
  {
    name: "Water",
    price: 1.49,
    description: "Bottled water, essential for hydration and thirst quenching.",
    inStock: 100,
    imageUrl: "https://example.com/water.jpg",
  },
  {
    name: "Soda",
    price: 1.99,
    description:
      "Carbonated soft drinks in various flavors, perfect for refreshment.",
    inStock: 90,
    imageUrl: "https://example.com/soda.jpg",
  },
  {
    name: "Juice",
    price: 3.99,
    description:
      "Fruit juices for vitamins and refreshment, various flavors available.",
    inStock: 60,
    imageUrl: "https://example.com/juice.jpg",
  },

  {
    name: "Sports Drinks",
    price: 2.49,
    description:
      "Electrolyte-rich sports drinks for hydration during exercise.",
    inStock: 45,
    imageUrl: "https://example.com/sports-drinks.jpg",
  },
  {
    name: "Milk Alternatives",
    price: 2.99,
    description: "Plant-based milk alternatives for various dietary needs.",
    inStock: 35,
    imageUrl: "https://example.com/milk-alternatives.jpg",
  },

  // Snacks & Sweets
  {
    name: "Chips",
    price: 1.99,
    description:
      "Crispy and salty chips in various flavors, great for snacking.",
    inStock: 70,
    imageUrl: "https://example.com/chips.jpg",
  },
  {
    name: "Cookies",
    price: 2.41,
    description: "Soft and chewy cookies in various flavors, a sweet treat.",
    inStock: 50,
    imageUrl: "https://example.com/chips.jpg",
  },

  // Frozen Foods
  {
    name: "Pizza",
    price: 6.99,
    description:
      "Frozen pizzas in various flavors, quick and easy meal option.",
    inStock: 40,
    imageUrl: "https://example.com/pizza.jpg",
  },
  {
    name: "French Fries",
    price: 2.99,
    description: "Frozen french fries for a quick and easy side dish.",
    inStock: 60,
    imageUrl: "https://example.com/french-fries.jpg",
  },
  {
    name: "Vegetables",
    price: 3.49,
    description: "Frozen mixed vegetables for convenience and nutrition.",
    inStock: 50,
    imageUrl: "https://example.com/frozen-vegetables.jpg",
  },
  {
    name: "Ice Cream",
    price: 4.99,
    description:
      "Frozen ice cream in various flavors, a delicious and refreshing treat.",
    inStock: 35,
    imageUrl: "https://example.com/ice-cream.jpg",
  },
  {
    name: "Chicken Nuggets",
    price: 3.99,
    description: "Frozen chicken nuggets, quick and easy protein option.",
    inStock: 45,
    imageUrl: "https://example.com/chicken-nuggets.jpg",
  },

  // Personal Care
  {
    name: "Shampoo",
    price: 4.99,
    description: "Hair cleanser for various hair types and needs.",
    inStock: 30,
    imageUrl: "https://example.com/shampoo.jpg",
  },
  {
    name: "Conditioner",
    price: 3.99,
    description: "Hair conditioner for various hair types and needs.",
    inStock: 25,
    imageUrl: "https://example.com/conditioner.jpg",
  },
  {
    name: "Body Wash",
    price: 2.99,
    description:
      "Body cleanser for daily use, various scents and formulas available.",
    inStock: 40,
    imageUrl: "https://example.com/body-wash.jpg",
  },
  {
    name: "Lotion",
    price: 3.49,
    description: "Moisturizer for skin, various formulas for different needs.",
    inStock: 35,
    imageUrl: "https://example.com/lotion.jpg",
  },
  {
    name: "Deodorant",
    price: 2.99,
    description: "Antiperspirant or deodorant to control sweat and odor.",
    inStock: 45,
    imageUrl: "https://example.com/deodorant.jpg",
  },

  // Cleaning Supplies
  {
    name: "Laundry Detergent",
    price: 5.99,
    description: "Cleans clothes, various formulas for different needs.",
    inStock: 25,
    imageUrl: "https://example.com/laundry-detergent.jpg",
  },
  {
    name: "Dish Soap",
    price: 2.99,
    description:
      "Cleans dishes by hand, various formulas and scents available.",
    inStock: 4,
    imageUrl: "https://example.com/dish-soap.jpg",
  },
];

const users = [
  {
    email: "aaron@admin.com",
    password: "aaron123",
    firstName: "Aaron",
    lastName: "Kim",
    isAdmin: false,
  },
  {
    email: "mark@admin.com",
    password: "mark123",
    firstName: "Mark",
    lastName: "Reyes",
    isAdmin: true,
  },
  {
    email: "tyrice@admin.com",
    password: "tyrice123",
    firstName: "Tyrice",
    lastName: "Freeman",
    isAdmin: true,
  },
  {
    email: "tyiffany@gmail.com",
    password: "Password123",
    firstName: "Tiffany",
    lastName: "Haddish",
    isAdmin: false,
  },
  {
    email: "John@yahoo.com",
    password: "Jdohnad3rsc2",
    firstName: "John",
    lastName: "Deer",
    isAdmin: false,
  },
  {
    email: "Konan.Beer@hotmail.com",
    password: "Passhfe45",
    firstName: "Konan",
    lastName: "Beer",
    isAdmin: false,
  },
  {
    email: "Oprah@gmail.com",
    password: "IamR$ch",
    firstName: "Oprah",
    lastName: "Whinfrey",
    isAdmin: false,
  },
  {
    email: "clark.kent@icloud.com",
    password: "IamSuperMan1",
    firstName: "Clark",
    lastName: "Kent",
    isAdmin: false,
  },
  {
    email: "Homer.Simpson@gmail.com",
    password: "D0nuts123",
    firstName: "Homer",
    lastName: "Simpson",
    isAdmin: false,
  },
];

const generateData = async () => {
  try {
    await prisma.products.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.products.createMany({
      data: products,
    });
    await prisma.category.createMany({
      data: category,
    });
    await prisma.users.createMany({
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

generateData();
