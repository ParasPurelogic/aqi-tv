import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Page() {
  // Return JSX
  return <div>Home Page</div>;
}
