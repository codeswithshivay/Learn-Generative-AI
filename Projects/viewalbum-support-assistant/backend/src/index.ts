import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

app.listen(env.port, () => {
  // This server is intentionally wired to stop at the placeholder LLM boundary.
  console.log(`ViewAlbum backend listening on http://localhost:${env.port}`);
});
