const config = {
  baseUrl: "https://bookmaru.dsmhs.kr",
  endpoint: "/api/auth/login",
  platformType: "WEB",
  username: "kjone0kjone0591@dsm.hs.kr",
  password: "test1234",
};

const url = new URL(config.endpoint, config.baseUrl);
url.searchParams.set("platformType", config.platformType);

const body = {
  username: config.username,
  password: config.password,
};

const masked = {
  ...body,
  password: "*".repeat(config.password.length),
};

console.log("[LOGIN_API_TEST] Request URL:", url.toString());
console.log("[LOGIN_API_TEST] Request Body:", masked);

try {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let parsedBody = text;

  try {
    parsedBody = JSON.parse(text);
  } catch {
    // Keep raw text when the response is not JSON.
  }

  console.log("[LOGIN_API_TEST] Status:", response.status);
  console.log("[LOGIN_API_TEST] Headers:", Object.fromEntries(response.headers.entries()));
  console.log("[LOGIN_API_TEST] Body:", parsedBody);
} catch (error) {
  console.error("[LOGIN_API_TEST] Request failed:", error);
  process.exitCode = 1;
}
