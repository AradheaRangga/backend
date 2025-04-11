import {eq} from 'drizzle-orm';
import { blacklistedTokens } from '../../database/platform/schemas/blacklistedTokens.js';
import {db} from '../../libs/db.js';
export const insertBlacklistToken = async (token, userId) => {
    const query = await db
    .insert(blacklistedTokens)
    .values({
        token,
        userId
    }) 
    .returning();
    
    return query;
}

export const checkBlacklistedToken = async (token) => {
    const query = await db
    .select()
    .from(blacklistedTokens)
    .where(eq(blacklistedTokens.token, token));
    return query.length > 0;
}