import mongoose from "mongoose";

const { DB_CONN_STRING } = process.env;

const connectionString = DB_CONN_STRING;

if (!connectionString) {
  console.error("Remember to have environment variables on a  file .env");
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

//connection mongodb atlas
export const connect = () => {
  mongoose
    .connect(connectionString, options)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

process.on("uncaughtException", (error) => {
  console.error(error);
  mongoose.disconnect();
});
