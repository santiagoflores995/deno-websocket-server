import { Application, Router } from "https://deno.land/x/oak/mod.ts";
const app = new Application({ logErrors: false });
const router = new Router();
router.get("/wss", (ctx) => {
  if (!ctx.isUpgradable) {
    ctx.throw(501);
  }
  const ws = ctx.upgrade();

  ws.onopen = () => {
    console.log("Connected to client");
    ws.send("Hello from server, you are connected!");
  };

  ws.onmessage = (event) => {
    console.log(event.data);
    ws.send("Hello from server, you sent: " + event.data);
  }

});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: 8000 });