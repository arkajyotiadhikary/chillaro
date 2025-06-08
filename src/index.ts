import app from "./app";
import RadioService from "./services/radio.service";

app.listen(8000, () => {
  console.log("Server is running on port 8000");
  RadioService.start();
});
