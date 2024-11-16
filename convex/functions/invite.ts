import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { query, QueryCtx } from "../_generated/server";
import { assertServerMember, authenticatedMutation } from "./helpers";

// Get an invite by its ID, and check if it's valid
const getInvite = async (ctx: QueryCtx, inviteId: Id<"invites">) => {
  const invite = await ctx.db.get(inviteId);
  if (!invite) {
    throw new Error("Invite not found");
  } else if (invite.expiresAt && Date.now() > invite.expiresAt) {
    throw new Error("Invite expired");
  } else if (invite.maxUses && invite.uses >= invite.maxUses) {
    throw new Error("Invite has been used the maximum number of times");
  }
  return invite;
};

// Get an invite by its ID, and include the server it belongs to
export const get = query({
  args: {
    id: v.id("invites"),
  },
  handler: async (ctx, { id }) => {
    const invite = await getInvite(ctx, id);
    const server = await ctx.db.get(invite.serverId);
    if (!server) {
      throw new Error("Server not found");
    }
    return {
      ...invite,
      server,
    };
  },
});

// Create an invite for a server
export const create = authenticatedMutation({
  args: {
    serverId: v.id("servers"),
    expiresAt: v.optional(v.number()),
    maxUses: v.optional(v.number()),
  },
  handler: async (ctx, { serverId, expiresAt, maxUses }) => {
    await assertServerMember(ctx, serverId);
    const inviteId = await ctx.db.insert("invites", {
      serverId,
      expiresAt: expiresAt ?? 0,
      maxUses,
      uses: 0,
    });
    return inviteId;
  },
});

// Join a server using an invite
export const join = authenticatedMutation({
  args: {
    id: v.id("invites"),
  },
  handler: async (ctx, { id }) => {
    const invite = await getInvite(ctx, id);
    await ctx.db.insert("serverMembers", {
      userId: ctx.user._id,
      serverId: invite.serverId,
    });
    await ctx.db.patch(id, {
      uses: invite.uses + 1,
    });
  },
});