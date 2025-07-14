import dotenv from "dotenv";
import { web } from "./application/web";

dotenv.config();

const port = parseInt(process.env.PORT ?? "3002");

web.listen(port, () => {
  console.log(`Liten at port ${port}`);
});
