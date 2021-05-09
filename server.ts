import App from "./src/app";
import FakeController from './src/controllers/fake.controller';

const app = new App([new FakeController()], 6000);

app.listen();
