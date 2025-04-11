import { patients } from "../../database/platform/schemas/patients.js";
import { iotDevices } from "../../database/platform/schemas/iotDevices.js";
import { db } from "../../libs/db.js";
import { getTableColumns, eq } from "drizzle-orm";

export const addPatients = async (
  name,
  age,
  gender,
  address,
  bodyWeight,
  bodyHeight,
  bloodType,
  allergies,
  phone,
  email
) => {
  const query = await db
    .insert(patients)
    .values({
      name,
      age,
      gender,
      address,
      bodyWeight,
      bodyHeight,
      bloodType,
      allergies,
    })
    .returning();

  return query;
};

export const getAllPatient = async () => {
  const query = await db
    .select({
      ...getTableColumns(patients),
    })
    .from(patients);

  return query;
};
