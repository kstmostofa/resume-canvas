import { BackgroundAccent } from "@/components/background-accent";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { Fragment } from "react/jsx-runtime";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <DesktopNavigation />
      <MobileNavigation />
      <BackgroundAccent />
      {children}
    </Fragment>
  );
}
