export default async function Layout({
  PermissionModal,
  children,
}: {
  PermissionModal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      <div>{PermissionModal}</div>
    </>
  );
}
