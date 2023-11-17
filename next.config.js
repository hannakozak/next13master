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
		mdxRs: true,
		workerThreads: false,
		cpus: 1,
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/categories/backpacks",
				destination: "/categories/backpacks/1",
				permanent: false,
			},
			{
				source: "/categories/crossbody",
				destination: "/categories/crossbody/1",
				permanent: false,
			},
			{
				source: "/categories/accessories",
				destination: "/categories/accessories/1",
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
