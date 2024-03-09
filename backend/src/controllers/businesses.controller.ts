import { fetchBusinesses } from "../services/businesses.service";
import { BusinessAPIResponse } from "../types";

export async function getPaginatedBusinesses({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<BusinessAPIResponse | null> {
  try {
    const res = await fetchBusinesses({ limit, offset });
    return res as BusinessAPIResponse;
  } catch (err) {
    console.error(err);
  }

  return null;
}
