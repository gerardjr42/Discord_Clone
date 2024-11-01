import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

//fetches data
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

//modifies data
export const create = mutation({
  args: {
    sender: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { sender, content }) => {
    await ctx.db.insert("messages", { sender, content });
  },
});
