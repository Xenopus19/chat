import { createServer } from "http";
import { PORT } from "./config";
import { connectDatabase } from "./database";
import app from "./app";
import { initSocket } from "./socket";

const startServer = async () => {
  try {
    await connectDatabase();
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");

    const httpServer = createServer(app);
    initSocket(httpServer);

    httpServer.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server on http://localhost:${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
