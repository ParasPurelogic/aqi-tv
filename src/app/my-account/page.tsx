import { Button } from "@/components/elements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Account",
};

export default function Page() {
  // Return JSX
  return <Button>Manage Account</Button>;
}
