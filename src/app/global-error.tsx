"use client";

import GlobalError from "@/components/ui/GlobalError";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <GlobalError error={error} />;
}
