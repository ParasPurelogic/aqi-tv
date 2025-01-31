import { Metadata } from "next";
import Login from "../../../components/pages/Auth/Login";

export const metadata: Metadata = {
  title: "Login - Auth",
};

export default function Page() {
  // Return JSX
  return <Login />;
}
