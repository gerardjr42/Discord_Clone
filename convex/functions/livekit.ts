import { v } from "convex/values";
import { AccessToken } from "livekit-server-sdk";
import { assertServerMember, authenticatedQuery } from "./helpers";

export const getToken = authenticatedQuery({
  args: {
    serverId: v.id("servers"),
  },
  handler: async (ctx, { serverId }) => {
    await assertServerMember(ctx, serverId);
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: ctx.user.username,
      }
    );
    token.addGrant({
      room: serverId,
      roomJoin: true,
    });
    return await token.toJwt();
  },
});
