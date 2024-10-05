import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const connect = await mongoose.connect(
      String(process.env.MONGODB_CONNECTION_STRING)
    );
    console.log("✔️✔️ Db Connect Successfully");
    return connect;
  } catch (error) {
    console.error("🥲 🥲 DB Not Connected🥲🥲", error);
  }
}
