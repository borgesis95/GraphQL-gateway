import * as express from "express";

export default class FakeController {
  public path = "/fake";
  public router = express.Router();

  constructor() {
    this.defineRoutes();
  }

  private defineRoutes() {
    this.router.get(`${this.path}`, this.fakeRoute);
  }

  private fakeRoute(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    response.send("fake response");
  }
}
