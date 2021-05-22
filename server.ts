import App from "./src/app";
require('dotenv').config()

const app = new App(5001);

app.listen();
