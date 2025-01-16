import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createClient from "openapi-fetch";
import { paths } from "./lib/backend/apiV1/schema";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const client = createClient<paths>({
    baseUrl: "http://localhost:8080",
    credentials: "include",
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  const meResponse = await client.GET("/api/v1/members/me");

  if (meResponse.response.headers.get("Set-Cookie")) {
    const cookieValue = meResponse.response.headers.get("Set-Cookie")!;
    (await cookies()).set({
      name: cookieValue.split("=")[0],
      value: cookieValue.split("=")[1].split(";")[0],
    });
  }

  const me = meResponse.data
    ? meResponse.data
    : {
        id: 0,
        createDate: "",
        modifyDate: "",
        nickname: "",
      };

  // 새로운 Headers 객체 생성
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-member-id", me.id.toString());
  requestHeaders.set("x-member-nickname", encodeURIComponent(me.nickname));
  requestHeaders.set("x-member-create-date", me.createDate);
  requestHeaders.set("x-member-modify-date", me.modifyDate);

  // 수정된 헤더로 새 요청 생성
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

// matcher 설정: API 경로와 정적 파일 제외
export const config = {
  matcher: "/((?!.*\\.|api\\/).*)",
};
