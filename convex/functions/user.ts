import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

// Upsert user to database
export const upsert = internalMutation({
  args: {
    username: v.string(),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (user) {
      await ctx.db.patch(user._id, {
        username: args.username,
        image: args.image,
      });
    } else {
      await ctx.db.insert("users", {
        username: args.username,
        image: args.image,
        clerkId: args.clerkId,
      });
    }
  },
});

// Remove user from database
export const remove = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (user) {
      await ctx.db.delete(user._id);
    }
  },
});
