export default function StaticLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className=" prose mx-auto p-6">{children}</div>;
}
