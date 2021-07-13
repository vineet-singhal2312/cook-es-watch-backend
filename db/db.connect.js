const mongoose = require("mongoose");

async function initializeDbConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://vineet:cookieswatch@cluster0.z3zfu.mongodb.net/video-library?authSource=admin&replicaSet=atlas-ccakfu-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );

    console.log("connecting......");
  } catch (error) {
    console.log({ error: error });
  }
}

module.exports = { initializeDbConnection };
