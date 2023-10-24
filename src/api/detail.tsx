import { Elysia, t } from "elysia";
import { ctx } from "../context";
import Button from "../components/ui/button";

export const detail = new Elysia()
//   .use(ctx)
  .get(
    "/detail",
    async () => {
        return (
          // TODO back btn
          <div>
            <button hx-get="/api/list" hx-target="closest div"  hx-trigger="click" hx-swap="outerHTML" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">返回</button>
            this is detail
          </div>
        )

    },
  )
;
