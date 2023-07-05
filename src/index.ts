import app from "./app";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Server stopped successfully`);
    process.exit(0);
  });
});
