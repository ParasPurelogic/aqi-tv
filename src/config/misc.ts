// Domain name
export const domainName = process.env.NEXT_PUBLIC_DOMAIN!

// Is live site
export const isSiteLive = domainName?.includes?.("aqi.tv");

// Cookie Config
export const getCookieConfig = () => ({
  httpOnly: true,
  sameSite: "strict" as const,
  domain: process.env.NODE_ENV === "production" ? "aqi.tv" : undefined,
  expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days
  secure: process.env.NODE_ENV === "production",
});

// Regexes
export const regexes = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /.{6,}/,
  passkey: /^[a-zA-Z0-9]+$/,
  phoneNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  simpleStringCheck: /^.*$/,
  gst: /^([0-9]{2})([A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/
}

// Current Time
export const getCurrentTime = () => new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
})