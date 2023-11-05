import { CollectionsList } from "@/ui/organisms/CollectionsList";

export default async function Home() {
	return (
		<>
			<section className="my-10 flex flex-col gap-5 text-center">
				<h2 className="mb-(-5) prose mx-auto mt-10 text-2xl font-semibold text-gray-800">
					Carry Your World with Style and Ease!
				</h2>
				<h3 className="prose mx-auto mb-5  font-semibold text-gray-800">
					Discover Your Perfect Companion for Every Journey – Explore
					a World of Fashionable Backpacks and Totes to Elevate Your
					Style and Convenience.
				</h3>
			</section>

			<CollectionsList />
		</>
	);
}
