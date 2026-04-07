import mongooose from "mongoose";

const connectDb = async (req, res) => {
  try {
    const connDb = await mongooose.connect(process.env.MONGO_URI);
    console.log(`Mongodb Connected `);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDb;
