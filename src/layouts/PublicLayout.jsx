import { Outlet } from "react-router-dom";
import NavbarPublic from "@/shared/components/layout/NavbarPublic";
import Footer from "@/shared/components/layout/Footer";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarPublic />
      <main className="flex-1 min-h-[80vh] relative">
        <div className="absolute inset-0 bg-lightsecondary/70 z-0 saturate-150"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
