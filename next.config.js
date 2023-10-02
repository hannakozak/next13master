/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.graphassets.com",
			},
		],
	},
	pageExtensions: ["tsx", "ts", "mdx"],
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/categories/T-Shirts",
				destination: "/categories/T-Shirts/1",
				permanent: false,
			},
			{
				source: "/categories/Hoodies",
				destination: "/categories/Hoodies/1",
				permanent: false,
			},
			{
				source: "/categories/Accessories",
				destination: "/categories/Accessories/1",
				permanent: false,
			},
			{
				source: "/collections/summer-vibes",
				destination: "/collections/summer-vibes/1",
				permanent: false,
			},
			{
				source: "/collections/new-arrivals",
				destination: "/collections/new-arrivals/1",
				permanent: false,
			},
			{
				source: "/collections/elegant-extras",
				destination: "/collections/elegant-extras/1",
				permanent: false,
			},
		];
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
