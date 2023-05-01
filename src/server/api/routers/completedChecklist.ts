import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const completedChecklistRouter = createTRPCRouter({
  //Get count of checklists
  getCount: protectedProcedure.query(async ({ ctx }) => {
    const count = await ctx.prisma.completedChecklist.count({
      where: {
        userId: ctx.session.user.id,
        deleted: false,
      },
    });
    return {
      result: count,
    };
  }),

  //Get completed checklist by id
  getChecklist: protectedProcedure
    .input(
      z.object({
        id: z.number().min(1),
      })
    )
    .query(async ({ input, ctx }) => {
      const checklist = await ctx.prisma.completedChecklist.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
          deleted: false,
        },
        include: {
          Checklist: {
            select: {
              title: true,
              description: true,
            },
          },
        },
      });
      return {
        result: checklist,
      };
    }),

  //Get all completed checklists
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        // searchTerm: z.string().max(170).optional(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 30;
      const { cursor, skip } = input;
      const result = await ctx.prisma.completedChecklist.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        skip: skip, // Skip the cursor
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          userId: ctx.session.user.id,
          deleted: false, //Just not deleted rows
          // title: {
          //   contains: input.searchTerm, //If search term exist
          // },
        },
        include: {
          Checklist: true,
        },

        orderBy: {
          id: "desc", //Last records first
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (result.length > limit) {
        const nextItem = result.pop();
        nextCursor = nextItem!.id;
      }
      return {
        result,
        count: result.length,
        // search: input.searchTerm,
        nextCursor,
      };
    }),

  //Update checklist
  // updateChecklist: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number().min(1),
  //       title: z.string().trim().min(2),
  //       description: z.string().trim().nullish(),
  //       items: z.string().min(1),
  //     })
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     const updatedChecklist = await ctx.prisma.checklist.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         title: input.title,
  //         description: input.description,
  //         items: input.items,
  //       },
  //     });
  //     return {
  //       result: updatedChecklist,
  //     };
  //   }),

  //Create completed checklist
  create: protectedProcedure
    .input(
      z.object({
        checklistId: z.number().min(1),
        items: z.string().min(1),
        note: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newCompletedChecklist = await ctx.prisma.completedChecklist.create({
        data: {
          userId: ctx.session.user.id, //User ID
          checklistId: input.checklistId,
          items: input.items,
          note: input.note,
        },
      });
      return {
        success: true,
        checklist: newCompletedChecklist,
      };
    }),

  //Soft delete checklist
  delete: protectedProcedure
    .input(
      z.object({
        checklistId: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.completedChecklist.update({
        where: {
          id: input.checklistId,
        },
        data: {
          deleted: true,
        },
      });

      return {
        success: true,
        message: "Completed checklist deleted",
      };
    }),
});

export type CompletedChecklistRouter = typeof completedChecklistRouter;
