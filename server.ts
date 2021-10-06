import App from "./src/app";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const app = new App();

app.listen();
