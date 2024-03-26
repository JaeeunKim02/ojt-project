export default async function Layout({
  AppModal,
  children,
}: {
  AppModal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      <div>{AppModal}</div>
    </>
  );
}
