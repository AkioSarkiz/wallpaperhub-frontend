"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Nature", "Abstract", "Architecture", "Animals", "Space", "Technology", "Minimal", "Art"];

interface CategoryFilterProps {
    onCategoryChange?: (category: string) => void;
}

export function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
    const [selected, setSelected] = useState("All");

    const handleSelect = (category: string) => {
        setSelected(category);
        onCategoryChange?.(category);
    };

    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={selected === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSelect(category)}
                    className="whitespace-nowrap"
                >
                    {category}
                </Button>
            ))}
        </div>
    );
}
