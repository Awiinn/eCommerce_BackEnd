const { PrismaClient } = require("@prisma/client");
// const { Decimal } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const categories = [
  {
    name: "Vegetables",
    description:
      "Vegetables are nutrient-rich plant-based foods essential for a balanced diet, offering an array of vitamins, minerals, and dietary fiber, with diverse textures, flavors, and colors enhancing culinary versatility.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/21bf2d7e-ef55-4960-affb-3379292dcc87/Default_Vegetables_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Fruits",
    description:
      "Fruits are naturally sweet and nutritious edible parts of plants containing seeds, offering a diverse range of vitamins, minerals, and antioxidants crucial for a balanced diet, with a variety of flavors, textures, and colors.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/7cf387c7-c6ad-464d-b9d0-8b1f849f9b65/Default_Fruits_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Meat",
    description:
      "Meat refers to the flesh of animals consumed as food, providing essential nutrients like protein, iron, and B vitamins, and encompassing a variety of options such as beef, pork, poultry, lamb, and game meats.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/6ed52388-75c6-4f00-a0cd-d398cb7ed756/Default_meats_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Seafood",
    description:
      "Seafood comprises a diverse selection of marine animals and plants harvested for consumption, known for their rich flavors and nutritional benefits, including fish, shellfish, and algae.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/546a3e43-3fc6-40b9-b2a3-7b82363289f3/Default_Seafood_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Condiments",
    description:
      "Condiments are flavorful substances added to food to enhance taste, texture, and overall enjoyment, encompassing a variety of sauces, spices, spreads, and seasonings.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/597dc28f-a3ee-4436-a086-d3c968fd8a8c/Default_Condiments_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Dairy",
    description:
      "Dairy comprises products derived from milk, including milk itself, cheese, yogurt, and butter, offering a rich source of calcium, protein, and essential nutrients.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/96485a50-74e9-4d1d-9c95-7a27f89e2395/Default_Dairy_products_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Grains & Baking",
    description:
      "Grains & Baking encapsulate a wide range of staple food ingredients derived from cereal crops like wheat, rice, oats, and corn, along with baking essentials such as flour, sugar, yeast, and baking powder.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/700826f3-42b3-442a-9130-f46eb124d055/Default_grains_and_baking_products_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Pantry Staples",
    description:
      "Pantry staples are essential food items kept on hand to facilitate cooking and meal preparation, encompassing non-perishable goods such as rice, pasta, canned beans, cooking oils, spices, and condiments.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/e65e1431-cefe-4d42-bd00-706dcd10c782/Default_pantry_staple_products_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Beverages",
    description:
      "Beverages encompass a diverse array of liquid refreshments ranging from water, juices, and soft drinks to tea, coffee, alcoholic beverages, and dairy or plant-based milk alternatives.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/38da768f-5e08-4f5a-972d-3fd971a39ae8/Default_Beverages_products_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Snacks & Sweets",
    description:
      "Snacks & Sweets encompass a wide range of indulgent treats and savory delights enjoyed between meals or as desserts, offering a variety of flavors, textures, and options including chips, nuts, chocolates, cookies, cakes, and candies.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/e08e9a64-a3af-4a72-be5c-65930c51c050/Default_Snacks_and_sweets_junk_food_products_for_grocery_disp_0.jpg",
  },
  {
    name: "Frozen Foods",
    description:
      "Frozen foods are pre-packaged food items that have been frozen to preserve freshness and extend shelf life, offering convenient meal solutions and a variety of options including fruits, vegetables, meats, seafood, and prepared meals.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/c4ab842c-a237-4f74-a0ff-17b3d6e68773/Default_Frozen_Foods_products_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Personal Care",
    description:
      "Personal care items refer to products and tools designed for maintaining personal hygiene, grooming, and well-being, encompassing items such as soaps, shampoos, toothpaste, deodorants, and skincare products.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/d4abcd27-03c3-4576-9919-a5c425198496/Default_Personal_Care_products_for_grocery_display_photo_0.jpg",
  },
  {
    name: "Cleaning Supplies",
    description:
      "Cleaning supplies encompass a range of products and tools utilized for maintaining cleanliness and hygiene across various settings, including homes, offices, and public spaces.",
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/00e9b5e5-9301-453f-bc7e-c52f7c46ad04/Default_Cleaning_supplies_products_for_grocery_display_photo_0.jpg",
  },
];

const products = [
  // Vegetables
  {
    name: "Carrots",
    price: 1.99,
    description: "Fresh and crunchy carrots, great for salads or snacking.",
    inStock: 10,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/8e17f6e2-7c67-45bb-85c8-3fe67daba804/Default_carrots_as_a_grocery_photo_0.jpg",
    categoryId: 1,
  },
  {
    name: "Broccoli",
    price: 2.49,
    description: "Nutritious broccoli packed with vitamins and minerals.",
    inStock: 8,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/5774e677-fdfb-42d6-8fba-e1ea1faab553/Default_Broccoli_as_a_grocery_photo_0.jpg",
    categoryId: 1,
  },
  {
    name: "Spinach",
    price: 2.29,
    description: "Tender spinach leaves, perfect for salads or cooking.",
    inStock: 15,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/75da2fd6-288f-4cca-ba52-0db422fdca2d/Default_Spinach_as_a_grocery_photo_0.jpg?w=512",
    categoryId: 1,
  },
  {
    name: "Lettuce",
    price: 1.79,
    description:
      "Crisp and refreshing lettuce, ideal for salads and sandwiches.",
    inStock: 20,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/958b3762-2b0f-4721-8c68-559e27604fd6/Default_Lettuce_as_a_grocery_photo_0.jpg?w=512",
    categoryId: 1,
  },
  {
    name: "Tomatoes",
    price: 1.59,
    description: "Juicy and flavorful tomatoes, versatile for various dishes.",
    inStock: 12,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/deb32812-62a2-4ea8-bf52-19cf4f924cd4/Default_Tomatoes_as_a_grocery_photo_0.jpg",
    categoryId: 1,
  },
  {
    name: "Bell Peppers",
    price: 1.29,
    description:
      "Sweet and crunchy bell peppers, great for adding color to meals.",
    inStock: 8,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/ffa42ade-851c-4ac9-8fb9-b1553261a71e/Default_Bell_Peppers_as_a_grocery_photo_0.jpg",
    categoryId: 1,
  },
  {
    name: "Cucumbers",
    price: 2.19,
    description:
      "Cool and hydrating cucumbers, perfect for salads or pickling.",
    inStock: 10,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/fa069771-4d9a-47bf-b42e-9c2abe3b3de8/Default_cucumbers_as_a_grocery_photo_0.jpg?w=512",
    categoryId: 1,
  },
  {
    name: "Onions",
    price: 1.99,
    description: "A kitchen staple, versatile and essential for many recipes.",
    inStock: 15,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/e37fe35f-2452-4da0-b412-4889fc1a4e1d/Default_onions_as_a_grocery_photo_0.jpg",
    categoryId: 1,
  },
  {
    name: "Potatoes",
    price: 2.79,
    description:
      "Versatile and filling, great for roasting, mashing, or frying.",
    inStock: 20,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/62cddd7f-5aca-4f62-a591-02e16c1a5502/Default_potatoes_as_a_grocery_photo_0.jpg",
    categoryId: 1,
  },
  {
    name: "Zucchini",
    price: 1.89,
    description: "Mild and tender zucchini, perfect for grilling or sautéing.",
    inStock: 12,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/bc3873f8-306a-4e06-927d-8262fa08ccb4/Default_zucchini_as_a_grocery_photo_0.jpg",
    categoryId: 1,
  },

  // Fruits
  {
    name: "Apples",
    price: 0.99,
    description: "Sweet and crunchy apples, perfect for snacking or baking.",
    inStock: 30,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/83fda11c-3eab-4299-8d82-20dd7e82c381/Default_apples_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },
  {
    name: "Bananas",
    price: 0.99,
    description: "Creamy and nutritious bananas, a great source of potassium.",
    inStock: 25,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/3ca00b14-f41f-43aa-bf3e-3d35277c5fd5/Default_Bananas_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },
  {
    name: "Oranges",
    price: 1.29,
    description: "Juicy and refreshing oranges, packed with vitamin C.",
    inStock: 18,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/944dd216-9be9-4713-a305-a24e678b5c23/Default_Oranges_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },
  {
    name: "Grapes",
    price: 2.99,
    description: "Plump and juicy grapes, delicious eaten fresh or frozen.",
    inStock: 12,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/6d62dec5-5f1c-424a-8465-e2791e4cc59c/Default_Grapes_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },
  {
    name: "Strawberries",
    price: 1.99,
    description:
      "Deliciously sweet strawberries, great for desserts or smoothies.",
    inStock: 8,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/7f523882-ae67-4d47-8ce5-c75f76b21983/Default_Strawberries_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },
  {
    name: "Blueberries",
    price: 1.79,
    description:
      "Antioxidant-rich blueberries, perfect for breakfast or baking.",
    inStock: 10,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/0352617c-d400-4211-91d5-daadc3808e16/Default_blueberries_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },
  {
    name: "Pineapple",
    price: 2.49,
    description:
      "Tropical and sweet pineapple, great for desserts or cocktails.",
    inStock: 6,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/ffa33ae9-a7cb-423a-bdc3-eaa56b39a4e7/Default_Pineapple_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },
  {
    name: "Watermelon",
    price: 0.89,
    description: "Refreshing and hydrating watermelon, ideal for hot days.",
    inStock: 15,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/1abbe168-95b3-4c03-8a4d-4a81a4058f72/Default_watermelon_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },
  {
    name: "Peaches",
    price: 1.59,
    description:
      "Soft and velvety peaches, perfect for desserts or fruit salads.",
    inStock: 12,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/10399f55-6d1d-42c0-ace7-013aee1e2b98/Default_the_fruit_Peach_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },
  {
    name: "Kiwi",
    price: 2.19,
    description:
      "Exotic and tangy kiwi, delicious eaten fresh or in smoothies.",
    inStock: 8,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/213b89a2-13bd-4187-948d-7ea556b3ba03/Default_Kiwi_as_a_grocery_photo_0.jpg",
    categoryId: 2,
  },

  // Meat
  {
    name: "Chicken Breast",
    price: 3.99,
    description:
      "Lean and protein-rich chicken breast, versatile and easy to cook.",
    inStock: 15,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/b146ed58-f471-4de3-9c34-a52cfef34ade/Default_Chicken_Breast_as_a_grocery_photo_0.jpg",
    categoryId: 3,
  },
  {
    name: "Ground Beef",
    price: 4.99,
    description:
      "Juicy and flavorful ground beef, perfect for burgers or meatballs.",
    inStock: 12,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/6bcc8e55-496c-4b53-a854-9ebf0d09f39b/Default_ground_beef_0.jpg",
    categoryId: 3,
  },
  {
    name: "Ground Pork",
    price: 3.49,
    description:
      "Lean and flavorful ground pork, great for burgers, meatballs, or sausage stuffing.",
    inStock: 20,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/f6182762-d7ee-4dbf-a5bd-dbadc3d5178e/Default_ground_beef_as_a_grocery_photo_0.jpg",
    categoryId: 3,
  },
  {
    name: "Beef Tenderloin",
    price: 13.99,
    description: "Premium cut of beef with exceptional tenderness and flavor.",
    inStock: 8,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/d3b2e04b-e547-4128-adbd-ad0cf87d2442/Default_beef_tenderloin_as_a_grocery_photo_0.jpg",
    categoryId: 3,
  },
  {
    name: "Pork Loin Roast",
    price: 5.99,
    description: "Budget-friendly option for roasting or slow cooking.",
    inStock: 25,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/4f754d67-48d1-4883-bf88-55bb430cb9c9/Default_pork_loin_roast_as_a_grocery_photo_0.jpg",
    categoryId: 3,
  },
  {
    name: "Lamb Chops",
    price: 11.99,
    description:
      "Premium cut with rich flavor, great for grilling or pan-searing.",
    inStock: 12,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/38c84012-78da-4b00-93d5-90d262388ac7/Default_Lamb_Chops_as_a_grocery_photo_0.jpg",
    categoryId: 3,
  },
  {
    name: "Ground Turkey",
    price: 4.49,
    description: "Lean and versatile option for burgers, tacos, or meatloaf.",
    inStock: 30,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/a370e013-bc42-4980-8487-a3861a187cf3/Default_Ground_Turkey_as_a_grocery_photo_0.jpg",
    categoryId: 3,
  },

  // Seafood
  {
    name: "Salmon Fillets",
    price: 8.99,
    description:
      "Wild-caught salmon fillets, rich in omega-3 fatty acids and perfect for grilling or baking.",
    inStock: 12,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/e39652ec-082e-4eee-93c8-a45887e736ee/Default_Salmon_fillets_as_a_grocery_photo_0.jpg",
    categoryId: 4,
  },
  {
    name: "Shrimp",
    price: 6.99,
    description:
      "Large, peeled and deveined shrimp, ideal for stir-fries, scampi, or cocktails.",
    inStock: 15,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/2c70fafd-88b1-45d3-9e5f-fb3b9c961e1f/Default_shrimp_as_a_grocery_photo_0.jpg",
    categoryId: 4,
  },
  {
    name: "Mussels",
    price: 4.99,
    description:
      "Sustainable farm-raised mussels, perfect for steaming, simmering, or adding to seafood chowder.",
    inStock: 10,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/a492b543-029e-4d5a-a8f6-3eed3f1cb44c/Default_mussels_as_a_grocery_photo_0.jpg",
    categoryId: 4,
  },
  {
    name: "Tilapia Fillets",
    price: 4.99,
    description:
      "Mild-flavored and affordable option, perfect for baking or sautéing.",
    inStock: 20,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/bb6a6583-1f3a-4764-a10d-770b1e7fcc2e/Default_Tilapia_Fillet_as_a_grocery_photo_0.jpg",
    categoryId: 4,
  },
  {
    name: "Mahi-Mahi Fillets",
    price: 7.99,
    description: "Flaky and flavorful fish, excellent for grilling or tacos.",
    inStock: 15,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/7bdab0bd-6045-4f42-af48-34cef499ce45/Default_Mahi_Fillet_as_a_grocery_photo_0.jpg",
    categoryId: 4,
  },
  {
    name: "Scallops (Sea)",
    price: 9.99,
    description:
      "Delicate and delicious, great for appetizers or main courses.",
    inStock: 8,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/c4022162-7207-4907-b851-5a68c6ae36fe/Default_Scallops_as_a_grocery_photo_0.jpg",
    categoryId: 4,
  },

  // Condiments
  {
    name: "Ketchup",
    price: 2.99,
    description: "Classic and tangy ketchup, perfect for burgers or fries.",
    inStock: 50,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/0722d94d-fc1e-47f8-89f9-509a208fc338/Default_Ketchup_as_a_grocery_photo_0.jpg",
    categoryId: 5,
  },
  {
    name: "Mustard",
    price: 3.49,
    description: "Sharp and tangy mustard, great for sandwiches or dressings.",
    inStock: 40,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/942b4738-10a7-42ac-b59d-c5ee034d5796/Default_Mustard_as_a_grocery_photo_0.jpg",
    categoryId: 5,
  },
  {
    name: "Mayonnaise",
    price: 1.99,
    description: "Creamy and rich mayonnaise, ideal for sandwiches or salads.",
    inStock: 60,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/c1092807-3be9-4f84-9c1f-c76c045e9761/Default_Mayonnaise_a_grocery_photo_0.jpg",
    categoryId: 5,
  },
  {
    name: "Soy Sauce",
    price: 2.49,
    description:
      "Salty and savory soy sauce, essential in many Asian cuisines.",
    inStock: 35,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/83fbfd6d-9156-4867-8ae0-193774691f25/Default_Soy_Sauce_a_grocery_photo_0.jpg",
    categoryId: 5,
  },
  {
    name: "BBQ Sauce",
    price: 2.99,
    description:
      "Sweet and smoky BBQ sauce, perfect for grilled meats or ribs.",
    inStock: 28,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/8ce65d41-303f-4aad-9ad5-cf1b7d995531/Default_BBQ_Sauce_a_grocery_photo_0.jpg",
    categoryId: 5,
  },

  // Dairy & Eggs
  {
    name: "Milk",
    price: 3.99,
    description: "Creamy and nutritious milk, perfect for cereal or baking.",
    inStock: 40,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/e81f135e-36d6-4c3d-85f6-c40bd070a14e/Default_Milk_for_grocery_display_photo_0.jpg",
    categoryId: 6,
  },
  {
    name: "Eggs",
    price: 2.49,
    description:
      "Protein-packed eggs, versatile and essential for many recipes.",
    inStock: 30,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/60b4256a-7aa8-46b1-81a7-b3f68ba86d8f/Default_Eggs_a_grocery_photo_0.jpg",
    categoryId: 6,
  },
  {
    name: "Butter",
    price: 4.99,
    description:
      "Rich and creamy butter, great for cooking or spreading on toast.",
    inStock: 25,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/69addaf3-f62c-402c-905c-ad7d19f54500/Default_butter_for_grocery_display_photo_0.jpg",
    categoryId: 6,
  },
  {
    name: "Cheese",
    price: 5.99,
    description:
      "Smooth and creamy cheese, perfect for sandwiches or cheese boards.",
    inStock: 20,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/473bb098-1aeb-4b36-80aa-ddde9f244640/Default_cheese_for_grocery_display_photo_0.jpg",
    categoryId: 6,
  },
  {
    name: "Yogurt",
    price: 1.49,
    description: "Creamy and tangy yogurt, a delicious and nutritious snack.",
    inStock: 45,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/e197c3b3-8f52-4a26-a817-0a52f8004297/Default_Yogurt_for_grocery_display_photo_0.jpg",
    categoryId: 6,
  },

  // Grains & Baking
  {
    name: "Bread",
    price: 1.99,
    description: "Soft and fluffy bread, essential for sandwiches or toast.",
    inStock: 35,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/9131196d-15c7-42f6-92d8-d55b1acd832d/Default_Bread_for_grocery_display_photo_0.jpg",
    categoryId: 7,
  },
  {
    name: "Rice",
    price: 2.99,
    description:
      "Versatile and filling rice, great as a side dish or main course.",
    inStock: 35,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/9237d48a-f761-4ba0-8de4-c1763f0cc0a1/Default_Rice_for_grocery_display_photo_0.jpg",
    categoryId: 7,
  },

  // Pantry Staples
  {
    name: "Pasta",
    price: 1.79,
    description:
      "Dry pasta in various shapes, perfect for quick and easy meals.",
    inStock: 50,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/1795d86d-10d5-4ac6-b12a-a7ed454ac157/Default_Pasta_for_grocery_display_photo_0.jpg",
    categoryId: 8,
  },
  {
    name: "Flour",
    price: 2.49,
    description:
      "All-purpose flour, essential for baking breads, cakes, and pastries.",
    inStock: 40,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/4c8c02d0-68ac-4337-a0ca-a6a7e087c629/Default_Flour_for_grocery_display_photo_0.jpg",
    categoryId: 8,
  },
  {
    name: "Sugar",
    price: 1.99,
    description: "Sweetener for various uses, from baking to beverages.",
    inStock: 60,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/d0137e6b-533e-451c-9dbf-4ab81573537c/Default_Sugar_for_grocery_display_photo_0.jpg",
    categoryId: 8,
  },
  {
    name: "Coffee",
    price: 4.99,
    description:
      "Ground coffee for brewing, various roasts and flavors available.",
    inStock: 35,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/20008f91-dae2-4b57-9508-ae3bd6e6adbd/Default_Coffee_for_grocery_display_photo_0.jpg",
    categoryId: 8,
  },
  {
    name: "Tea",
    price: 2.99,
    description:
      "Loose leaf or bagged tea in various flavors, calming and refreshing.",
    inStock: 28,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/0cd088c8-78cb-4052-8ec0-1736a1316966/Default_Tea_for_grocery_display_photo_0.jpg",
    categoryId: 8,
  },

  // Beverages
  {
    name: "Water",
    price: 1.49,
    description: "Bottled water, essential for hydration and thirst quenching.",
    inStock: 100,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/d24b5b88-d511-4267-af11-c7f626f2367f/Default_Water_for_grocery_display_photo_0.jpg",
    categoryId: 9,
  },
  {
    name: "Soda",
    price: 1.99,
    description:
      "Carbonated soft drinks in various flavors, perfect for refreshment.",
    inStock: 90,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/8ba1a339-774b-4fd1-bdfc-161f8b9bd93b/Default_Soda_for_grocery_display_photo_0.jpg",
    categoryId: 9,
  },
  {
    name: "Juice",
    price: 3.99,
    description:
      "Fruit juices for vitamins and refreshment, various flavors available.",
    inStock: 60,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/43d2111f-09df-431f-b1cf-bdb7689181b0/Default_Juice_for_grocery_display_photo_0.jpg",
    categoryId: 9,
  },

  {
    name: "Sports Drinks",
    price: 2.49,
    description:
      "Electrolyte-rich sports drinks for hydration during exercise.",
    inStock: 45,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/5d2df5af-c8a8-42e5-a5f6-1acc7b1f1523/Default_Sports_Drinks_for_grocery_display_photo_0.jpg",
    categoryId: 9,
  },
  {
    name: "Milk Alternatives",
    price: 2.99,
    description: "Plant-based milk alternatives for various dietary needs.",
    inStock: 35,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/ee0ccc56-f9e2-4afe-864c-cea397c9c558/Default_Milk_Alternatives_for_grocery_display_photo_0.jpg",
    categoryId: 9,
  },

  // Snacks & Sweets
  {
    name: "Chips",
    price: 1.99,
    description:
      "Crispy and salty chips in various flavors, great for snacking.",
    inStock: 70,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/a14aa6dc-ad3c-4e53-a98e-627663dbad0a/Default_Chips_for_grocery_display_photo_0.jpg",
    categoryId: 10,
  },
  {
    name: "Cookies",
    price: 2.41,
    description: "Soft and chewy cookies in various flavors, a sweet treat.",
    inStock: 50,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/177e4798-dfff-4d0e-81ff-59fc4435aab6/Default_Cookies_for_grocery_display_photo_0.jpg",
    categoryId: 10,
  },

  // Frozen Foods
  {
    name: "Pizza",
    price: 6.99,
    description:
      "Frozen pizzas in various flavors, quick and easy meal option.",
    inStock: 40,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/7747074a-6267-4042-a8cb-020e16289c85/Default_Pizza_for_grocery_display_photo_0.jpg",
    categoryId: 11,
  },
  {
    name: "French Fries",
    price: 2.99,
    description: "Frozen french fries for a quick and easy side dish.",
    inStock: 60,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/1f98c436-86a1-4700-ae6f-684474c5fe38/Default_French_Fries_for_grocery_display_photo_0.jpg?w=512",
    categoryId: 11,
  },
  {
    name: "Vegetables",
    price: 3.49,
    description: "Frozen mixed vegetables for convenience and nutrition.",
    inStock: 50,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/c83fe894-5f3f-4fcc-9909-77df7d441e9e/Default_Vegeta_holding_vegetables_0.jpg",
    categoryId: 11,
  },
  {
    name: "Ice Cream",
    price: 4.99,
    description:
      "Frozen ice cream in various flavors, a delicious and refreshing treat.",
    inStock: 35,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/81f4ed47-5e13-440b-b285-cd717372a695/Default_Ice_Cream_for_grocery_display_photo_0.jpg",
    categoryId: 11,
  },
  {
    name: "Chicken Nuggets",
    price: 3.99,
    description: "Frozen chicken nuggets, quick and easy protein option.",
    inStock: 45,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/9f872633-8164-4307-9365-501261030ba7/Default_Chicken_nuggets_for_grocery_display_photo_0.jpg",
    categoryId: 11,
  },

  // Personal Care
  {
    name: "Shampoo",
    price: 4.99,
    description: "Hair cleanser for various hair types and needs.",
    inStock: 30,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/7fab7d70-4a77-4417-8a17-4d75473e6e18/Default_Shampoo_for_grocery_display_photo_0.jpg",
    categoryId: 12,
  },
  {
    name: "Conditioner",
    price: 3.99,
    description: "Hair conditioner for various hair types and needs.",
    inStock: 25,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/f256d11f-659b-4fae-9211-d46ae91592d9/Default_Conditioner_for_grocery_display_photo_0.jpg",
    categoryId: 12,
  },
  {
    name: "Body Wash",
    price: 2.99,
    description:
      "Body cleanser for daily use, various scents and formulas available.",
    inStock: 40,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/6c593c10-b933-41c7-b613-eb7491bd2b43/Default_Body_Wash_for_grocery_display_photo_0.jpg",
    categoryId: 12,
  },
  {
    name: "Lotion",
    price: 3.49,
    description: "Moisturizer for skin, various formulas for different needs.",
    inStock: 35,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/f86dc886-1fa8-4dca-909e-458390d273c2/Default_Lotion_for_grocery_display_photo_0.jpg",
    categoryId: 12,
  },
  {
    name: "Deodorant",
    price: 2.99,
    description: "Antiperspirant or deodorant to control sweat and odor.",
    inStock: 45,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/2bfcceb9-84c6-49b8-acbb-ec85a6f008a1/Default_Deodorant_for_grocery_display_photo_0.jpg",
    categoryId: 12,
  },

  // Cleaning Supplies
  {
    name: "Laundry Detergent",
    price: 5.99,
    description: "Cleans clothes, various formulas for different needs.",
    inStock: 25,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/a658248e-3be1-4acf-9416-caca9464e8be/Default_Laundry_Detergent_for_grocery_display_photo_0.jpg",
    categoryId: 13,
  },
  {
    name: "Dish Soap",
    price: 2.99,
    description:
      "Cleans dishes by hand, various formulas and scents available.",
    inStock: 4,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/e2448e0e-c446-4692-bb3c-d375a1ea91bc/Default_Dish_Soap_for_grocery_display_photo_0.jpg",
    categoryId: 13,
  },
  {
    name: "Disinfectanct Wipes",
    price: 4.99,
    description: "Clean surfaces by hand, various scents available.",
    inStock: 12,
    imageUrl:
      "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/0d857c04-476f-49a8-9a8d-c6203c627c5e/Default_Disinfectant_wipes_for_grocery_display_photo_0.jpg",
    categoryId: 13,
  },
];
const adminRole = { name: "admin" };
const userRole = { name: "user" };
const guestRole = { name: "guest" };

const manageUsersPermission = [{ name: "manage_users" }];
const placeOrdersPermission = [{ name: "place_orders" }];
const viewOrderHistoryPermission = [{ name: "view_order_history" }];
const manageProductsPermission = [{ name: "manage_products" }];

const permissions = [
  ...manageUsersPermission,
  ...placeOrdersPermission,
  ...viewOrderHistoryPermission,
  ...manageProductsPermission,
];

const roles = [adminRole, userRole, guestRole];

const adminUser = [
  {
    email: "aaron@admin.com",
    password: "aaron123",
    firstName: "Aaron",
    lastName: "Kim",
    role_id: 1,
  },
  {
    email: "mark@admin.com",
    password: "mark123",
    firstName: "Mark",
    lastName: "Reyes",
    role_id: 1,
  },
  {
    email: "tyrice@admin.com",
    password: 'tyrice123',
    firstName: "Tyrice",
    lastName: "Freeman",
    role_id: 1,
  },
];

const regularUser = [
  {
    email: "tyiffany@gmail.com",
    password: "Password123",
    firstName: "Tiffany",
    lastName: "Haddish",
    role_id: 2,
  },
  {
    email: "John@yahoo.com",
    password: "Jdohnad3rsc2",
    firstName: "John",
    lastName: "Deer",
    role_id: 2,
  },
  {
    email: "Konan.Beer@hotmail.com",
    password: "Passhfe45",
    firstName: "Konan",
    lastName: "Beer",
    role_id: 2,
  },
  {
    email: "Oprah@gmail.com",
    password: "IamR$ch",
    firstName: "Oprah",
    lastName: "Whinfrey",
    role_id: 2,
  },
];
const guestUser = [
  {
    email: "clark.kent@icloud.com",
    password: "IamSuperMan1",
    firstName: "Clark",
    lastName: "Kent",
    role_id: 3,
  },
  {
    email: "Homer.Simpson@gmail.com",
    password: "D0nuts123",
    firstName: "Homer",
    lastName: "Simpson",
    role_id: 3,
  },
];

const allUsers = [...adminUser, ...regularUser, ...guestUser];

const hashPassword = () => {

}

// const orderData = {
//   user_id: 1,
//   status: "pending",
//   items: {
//     create: [
//       {
//         quantity: 2,
//         price: 10.99,
//         product: {
//           connect: { id: 1 },
//         },
//       },
//       {
//         quantity: 1,
//         price: 20.99,
//         product: {
//           connect: { id: 2 },
//         },
//       },
//     ],
//     total: Decimal.toJson(),
//   },
// };

const hash = async () => {
  const salt = 5;
  for (let user of allUsers) {
    try {
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;
    } catch (error) {
      console.log(error, "error hashing passwords");
    }
  }
};

hash()

const generateData = async () => {
  try {
    await prisma.categories.deleteMany();
    console.log("Deleted records in category table");
    await prisma.products.deleteMany();
    console.log("Deleted records in product table");
    await prisma.users.deleteMany();
    console.log("Deleted records in users table");

    await prisma.categories.createMany({
      data: categories,
      skipDuplicates: true,
    });
    console.log("Added category data");

    await prisma.products.createMany({
      data: products,
      skipDuplicates: true,
    });
    console.log("Added product data");

    await prisma.roles.createMany({
      data: roles,
      skipDuplicates: true,
    });
    console.log("Added roles data");

    await prisma.permissions.createMany({
      data: permissions,
      skipDuplicates: true,
    });
    console.log("Added permissions data");


    await prisma.users.createMany({
      data: allUsers,
      skipDuplicates: true,
    });
    console.log("Added user data");

    // await prisma.orders.create({
    //   data: orderData,
    // });
    console.log("Added order create");

    console.log("Data seeding successful!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

generateData();
