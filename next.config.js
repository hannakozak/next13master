/** @type {import('next').NextConfig} */
const nextConfig = {
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
		];
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
