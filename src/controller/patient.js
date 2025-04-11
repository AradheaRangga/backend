import { patients } from "../../database/platform/schemas/patients.js";
import { iotDevices } from "../../database/platform/schemas/iotDevices.js";
import { db } from "../../libs/db.js";
import { getTableColumns, eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const addPatients = async (
  name,
  age,
  gender,
  address,
  bodyWeight,
  bodyHeight,
  bloodType,
  allergies
) => {
  const patientId = uuid();

  const query = await db
    .insert(patients)
    .values({
      id: patientId,
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
