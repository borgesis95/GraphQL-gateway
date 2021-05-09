import express from "express";
import errors from "./middleware/error";

export default class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: unknown, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(errors); // Error Middleware
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port,() => {
      console.log(`App Gateway listening on: ${this.port}`);
    });
  }
}
