import { worker } from "./browser";
import { server } from "./server";

if (typeof window === "undefined") {
  server.listen();
} else {
  worker.start();
}
export {};
