import app from "./app.ts";
import { PORT } from "./config.ts";

app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT} ...`);
});