export const ProductCoverImage = ({
	src,
	alt,
}: {
	src?: string;
	alt?: string;
}) => {
	return (
		<div className="rounded-md border bg-slate-50 ">
			<img
				width={256}
				height={256}
				alt={alt}
				src={src}
				className="aspect-square w-full object-contain object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
