// Creates the first ADMIN user so you can log in.
// Run once from the server folder:   npm run seed
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/user.js";

dotenv.config();

const ADMIN = {
  name: "Shoba Rohra",
  email: "admin@gmail.com",
  password: "123456",
  title: "Administrator",
  role: "Admin",
  isAdmin: true,
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const exists = await User.findOne({ email: ADMIN.email });
  if (exists) {
    console.log(`Admin already exists: ${ADMIN.email}`);
  } else {
    await User.create(ADMIN);
    console.log(`Admin created -> email: ${ADMIN.email}  password: ${ADMIN.password}`);
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
