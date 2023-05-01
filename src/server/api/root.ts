import { createTRPCRouter } from "~/server/api/trpc";
import { checklistRouter } from "./routers/checklist";
import { completedChecklistRouter } from "./routers/completedChecklist";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  checklist: checklistRouter,
  completedChecklist: completedChecklistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
