import { connect } from "mongoose";
import app from "./app";
import config from "./config/index";

async function mainFunc() {
  try {
    await connect(config.database_url as string);
    console.log("🔋 Database Connected");

    app.listen(config.port, () => {
      console.log(`Digital Cow Hut listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

mainFunc();
