import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { SkipLink } from "@/components/SkipLink";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
