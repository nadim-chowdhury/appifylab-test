import { ProtectedRoute } from "@/components/providers/protected-route";

export default function layout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
