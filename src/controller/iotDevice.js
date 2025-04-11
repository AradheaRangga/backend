import { iotDevices } from "../../database/platform/schemas/iotDevices";

export const getAllIotDevices = async () => {
  const query = await db
    .select({
      ...getTableColumns(iotDevices),
    })
    .from(iotDevices);
  return query;
};

export const addIotDevice = async (name, patientId) => {
  const query = await db
    .insert(iotDevices)
    .values({
      name,
      patientId,
    })
    .returning();
  return query;
};
