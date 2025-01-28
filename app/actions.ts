"use server";

import { cookies } from "next/headers";

export async function setRegion(region: string) {
  const cookieStore = await cookies();
  cookieStore.set("region", region, {
    maxAge: 60 * 60 * 24 * 365,
  });
}
