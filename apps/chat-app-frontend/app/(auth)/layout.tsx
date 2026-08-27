import NavbarGuest from "../../components/NavbarGuest";
import HealthCheck from "../../components/HealthCheck";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <HealthCheck />
        <NavbarGuest />
        {children}
      </>
    );
  }