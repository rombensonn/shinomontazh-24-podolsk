import { NextResponse } from "next/server";
import { createFormToken } from "@/lib/formToken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const formStartedAt = Date.now();

  return NextResponse.json(
    {
      formStartedAt,
      formToken: createFormToken(formStartedAt),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
