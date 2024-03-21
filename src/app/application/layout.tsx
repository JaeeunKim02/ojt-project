export default async function Layout({
  createAppModal,
  children,
}: {
  createAppModal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      <div>{createAppModal}</div>
    </>
  );
}
