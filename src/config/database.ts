import mongoose from "mongoose";

export function getDbUrl() {
  const { MONGODB_HOST, MONGODB_DB, MONGODB_USER, MONGODB_PASS } = process.env;

  const AUTH =
    MONGODB_USER && MONGODB_PASS
      ? [MONGODB_USER, ":", MONGODB_PASS, "@"].join("")
      : "";

  const PREFIX = MONGODB_USER && MONGODB_PASS ? "mongodb+srv" : "mongodb";

  return `${PREFIX}://${AUTH}${MONGODB_HOST}/${MONGODB_DB}`;
}

const database = async () => {
  const url = getDbUrl();
  console.log(url);
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default database;
