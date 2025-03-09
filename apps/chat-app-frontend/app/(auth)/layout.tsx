import NavbarGuest from "../../components/NavbarGuest";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <NavbarGuest />
        {children}
      </>
    );
  }