import cors from "@fastify/cors";
import Fastify from "fastify";
import { CONFIG } from "./helper/config";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app
  .listen({
    port: CONFIG.port,
    host: "0.0.0.0",
  })
  .then(() => console.log(`💻 HTTP server running port ${CONFIG.port}`));
