import NextImage from "next/image";

type ProductCoverImageProps = {
	width: number;
	height: number;
	src: string;
	alt: string;
};

export const ProductCoverImage = ({
	src,
	alt,
	width,
	height,
}: ProductCoverImageProps) => {
	return (
		<div className="rounded-md border bg-slate-50 ">
			<NextImage
				width={width}
				height={height}
				alt={alt}
				src={src}
				className="aspect-square w-full object-contain object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
