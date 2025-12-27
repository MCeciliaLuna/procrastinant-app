import { Outlet } from "react-router-dom";
import NavbarPublic from "@/shared/components/layout/NavbarPublic";
import Footer from "@/shared/components/layout/Footer";

function PublicLayout() {
  return (
    <>
      <NavbarPublic />
      <main className="min-h-[80vh]">
        <div className="absolute inset-0 bg-lightsecondary/70 z-0 saturate-150"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
