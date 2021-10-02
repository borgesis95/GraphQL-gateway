import App from "./src/app";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const app = new App(5001);

app.listen();
