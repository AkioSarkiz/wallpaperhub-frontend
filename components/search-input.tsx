"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
	initValue?: string;
};

export function SearchInput(props: Props) {
	const { push } = useRouter();
	const [inputValue, setInputValue] = useState<string>(props.initValue || "");

	const onClick = () => {
		if (!inputValue) {
			return;
		}

		push(`/search?q=${inputValue}`);
	};

	return (
		<div className="flex gap-4">
			<div className="relative mb-6">
				<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

				<Input
					type="search"
					placeholder="Search wallpapers..."
					className="pl-10 min-w-80"
					defaultValue={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyUp={(event) => {
						if (event.key === "Enter") {
							onClick();
						}
					}}
				/>
			</div>

			<Button onClick={onClick}>Search</Button>
		</div>
	);
}
