import { eq } from "drizzle-orm";
import { blacklistedTokens } from "../../database/platform/schemas/blacklistedTokens.js";
import { db } from "../../libs/db.js";
export const insertBlacklistToken = async (token, userId) => {
  try {
    const query = await db
      .insert(blacklistedTokens)
      .values({
        token,
        user_id: userId,
      })
      .returning();
    console.log("query", query);

    return query;
  } catch (error) {
    console.error("Error inserting blacklisted token:", error);
    throw new Error("Failed to insert blacklisted token");
  }
};

export const checkBlacklistedToken = async (token) => {
  const query = await db
    .select()
    .from(blacklistedTokens)
    .where(eq(blacklistedTokens.token, token));
  return query.length > 0;
};
