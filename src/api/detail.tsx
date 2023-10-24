import { Elysia, t } from "elysia";
import { ctx } from "../context";

export const detail = new Elysia()
//   .use(ctx)
  .get(
    "/detail",
    async () => {
        return <div>this is detail</div>

    },
  )
;
