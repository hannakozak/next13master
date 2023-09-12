"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { type Route } from "next";

type ActiveLinkProps<T extends string> = {
	href: Route<T> | URL;
	children: ReactNode;
	exact?: boolean;
	className?: string;
	activeClassName?: string;
};

export const ActiveLink = <T extends string>({
	href,
	children,
	exact = false,
	className = "",
	activeClassName = "",
}: ActiveLinkProps<T>) => {
	const pathname = usePathname();

	let isActive;

	if (typeof href === "string") {
		isActive = exact ? pathname === href : pathname.startsWith(href);
	}

	if (typeof href === "object") {
		isActive = exact
			? pathname === href.pathname
			: pathname.startsWith(href.pathname);
	}

	return (
		<Link
			href={href}
			className={clsx(className, isActive && activeClassName)}
		>
			{children}
		</Link>
	);
};
