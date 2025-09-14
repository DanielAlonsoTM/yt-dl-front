import { RequestYTDL } from "@/models/request-ytdl";
import { ResponseYTDL } from "@/models/response-ytdl";
import { HOST_URL } from "./conts";

async function postJSON<TRequest, TResponse>(
  url: string,
  request: TRequest,
): Promise<TResponse[]> {

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if(!res.ok) throw new Error(`POST ${url} failed: ${res.status}`)
  return res.json();
}

export function downloadUrls(request: RequestYTDL): Promise<ResponseYTDL[]> {
  return postJSON<RequestYTDL, ResponseYTDL>(`${HOST_URL}/download`, request);
}
