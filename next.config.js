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
				source: "/products/t-shirts",
				destination: "/products/t-shirts/1",
				permanent: false,
			},
		];
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
