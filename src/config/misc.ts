// Conventions
export const conventions = {
  cookie: {
    getCookieLife: () => new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
    userInfo: "aqi_tu_sakdosj98h",
  },
  query: {
  },
  header: {
  },
}

// REGEX CHECKS
export const regexChecks = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /.{6,}/,
  phoneNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  simpleStringCheck: /^.*$/,
}

// Domain name
export const domainName = process.env.NEXT_PUBLIC_DOMAIN!

// Is live site
export const isSiteLive = domainName?.includes?.("aqi.tv");

// Cookie Config
export const getCookieConfig = () => ({
  httpOnly: true,
  sameSite: "strict" as const,
  domain: process.env.NODE_ENV === "production" ? isSiteLive ? ".aqi.tv" : ".aqi.in" : undefined,
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