import HealthCheck from "../../components/HealthCheck";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HealthCheck />
      {children}
    </>
  );
}
