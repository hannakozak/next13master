export default function StaticLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="mx-auto">{children}</div>;
}
