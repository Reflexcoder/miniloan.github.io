const mongoose = require("mongoose");

const Connection = async () => {
  try {
    const conc = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected Successfull ${conc.connection.host}`);
  } catch (error) {
    console.log("Error while connection with database", error);
  }
};

module.exports = Connection;
