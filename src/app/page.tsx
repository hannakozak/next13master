import { CollectionsList } from "@/ui/organisms/CollectionsList";
import Image from "next/image";

export default async function Home() {
	return (
		<>
			<h2 className="mb-(-5) mt-10  text-center text-2xl font-semibold text-gray-600 ">
				Carry Your World with Style and Ease!
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2">
				<Image
					src="/images/ate.png"
					alt="hero"
					width={800}
					height={500}
				/>
				<aside className="prose place-self-center text-center">
					<h3 className="mb-5 font-semibold text-gray-600">
						Discover Your Perfect Companion for Every Journey –
						Explore a World of Fashionable Backpacks and Totes to
						Elevate Your Style and Convenience.
					</h3>
					<button className="brighness-100 font-semiboldbold mb-10 h-14 w-3/4 rounded-md bg-gradient-to-r from-gray-900  to-amber-600 text-xl text-white shadow-md hover:brightness-125 disabled:cursor-wait disabled:brightness-50">
						Browse our Products
					</button>
				</aside>
			</div>

			<CollectionsList />
		</>
	);
}
