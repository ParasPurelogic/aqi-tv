import { Metadata } from "next";
import Signup from "../../../components/pages/Auth/Signup";

export const metadata: Metadata = {
  title: "Signup - Auth",
};

export default function Page() {
  // Return JSX
  return <Signup />;
}
