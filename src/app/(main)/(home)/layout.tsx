import Sidebar from "./_Sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return JSX
  return (
    <div className="flex flex-col items-center justify-center h-contentHeight min-h-fit py-body">
      <div className="grid md:grid-cols-[18%_1fr] bg-white rounded-[2rem] w-full min-h-full overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="p-body">{children}</div>
      </div>
    </div>
  );
}
