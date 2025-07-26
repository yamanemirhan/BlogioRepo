import Hero from "@/components/Hero";
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard requireAuth={false}>
      <Hero />
    </AuthGuard>
  );
}
