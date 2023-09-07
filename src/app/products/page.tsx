import { type ProductItemType } from "@/ui/types";
import { ProductList } from "@/ui/organisms/ProductList";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "Czapki",
		name: "Czapka z daszkiem",
		price: 25,
		coverImage: {
			src: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
			alt: "Czapka z daszkiem",
		},
	},
	{
		id: "2",
		category: "Koszula",
		name: "Koszula w kratę",
		price: 50,
		coverImage: {
			src: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-02.jpg",
			alt: "Koszula w kratę",
		},
	},
	{
		id: "3",
		category: "Kurtka",
		name: "Kurtka zimowa",
		price: 100,
		coverImage: {
			src: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
			alt: "Kurtka zimowa",
		},
	},
	{
		id: "4",
		category: "Buty",
		name: "Buty sportowe",
		price: 120,
		coverImage: {
			src: "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-02.jpg",
			alt: "Buty sportowe",
		},
	},
];

export default function Products() {
	return (
		<section className="sm:py-18 mx-auto flex w-full max-w-2xl flex-grow flex-col px-8 py-12 sm:px-6 lg:max-w-7xl">
			<ProductList products={products} />
		</section>
	);
}
