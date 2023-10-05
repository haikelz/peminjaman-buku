import { NextResponse } from "next/server";
import { booksData } from "~lib/utils/data";

export async function GET() {
  try {
    return NextResponse.json(
      {
        data: booksData,
        length: booksData.length,
        status: 200,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
      },
    );
  } catch (err) {
    return NextResponse.rewrite(`Failed to fetch API, server error!`, {
      status: 500,
    });
  }
}
