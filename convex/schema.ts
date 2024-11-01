import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  // Define the users table and index it by clerkId
  users: defineTable({
    username: v.string(),
    image: v.string(),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  // Define the messages table
  messages: defineTable({
    sender: v.string(),
    content: v.string(),
  }),
});
