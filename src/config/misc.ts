// Conventions
export const conventions = {
  cookie: {
    getCookieLife: () => new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
    userInfo: "atu_sakdosj98h",
  },
  query: {
  },
  header: {
  },
}

// REGEX CHECKS
export const regexChecks = {
  phoneNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  string: /^.*$/,
}

// Domain name
export const domainName = process.env.NEXT_PUBLIC_DOMAIN!

// Is live site
export const isSiteLive = domainName?.includes?.("aqi.tv");

// Cookie Config
export const getCookieConfig = () => ({
  httpOnly: true,
  sameSite: "strict" as const,
  domain: process.env.NODE_ENV === "production" ? "aqi.tv" : undefined,
  expires: conventions.cookie.getCookieLife(),
  secure: process.env.NODE_ENV === "production",
});

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