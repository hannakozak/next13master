import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
	const body: unknown = await request.json();
	if (
		typeof body === "object" &&
		body &&
		"productId" in body &&
		typeof body.productId === "string"
	) {
		console.log(`Revalidating /product/${body.productId}`);
		revalidatePath(`/product/${body.productId}`);
		console.log(`Revalidating /products`);
		revalidatePath(`/products`);
		return NextResponse.json(null, { status: 201 });
	} else {
		return NextResponse.json(
			{ message: "Invalid body" },
			{ status: 400 },
		);
	}
}
