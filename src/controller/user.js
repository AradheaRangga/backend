import { eq } from "drizzle-orm";
import { users } from "../../database/platform/schemas/users.js";
import { db } from "../../libs/db.js";
import { v4 as uuid } from "uuid";

export const getUserByEmail = async (email) => {
  const user = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
    })
    .from(users)
    .where(eq(users.email, email));

  return user.at(0);
};

export const insertUser = async (name, email, password, phone, patientId) => {
  const userId = uuid();
  const user = await db
    .insert(users)
    .values({
      id: userId,
      name,
      email,
      password,
      phone,
      patientId,
    })
    .returning();

  return user;
};
