import { Outlet } from "react-router-dom";
import NavbarDesktop from "@/shared/components/layout/NavbarDesktop";
import NavbarMobile from "@/shared/components/layout/NavbarMobile";
import Footer from "@/shared/components/layout/Footer";

function PrivateLayout() {
  return (
    <>
      <div className="md:hidden">
        <NavbarMobile />
      </div>

      <div className="hidden md:block">
        <NavbarDesktop />
      </div>
      <div className="h-[10vh]"></div>
      <main className="min-h-[70vh]">
        <div className="absolute inset-0 bg-lightsecondary/50 z-0 saturate-150"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer className="relative" />
    </>
  );
}

export default PrivateLayout;
