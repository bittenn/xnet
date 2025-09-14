"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { mockCategories } from "@/lib/mock";

const categories = mockCategories.map((v) => v.name);
const sorts = [
  { label: "최신순", value: "desc" },
  { label: "오래된순", value: "asc" },
] as const;

export function FilterBar() {
  const sp = useSearchParams();
  const category = sp.get("category") || "all";
  const sort = sp.get("sort") || "desc";

  const buildUrl = (key: "category" | "sort", value: string) => {
    const params = new URLSearchParams(sp.toString());

    if (key === "category") {
      if (value === "all") {
        params.delete("category");
      } else {
        params.set("category", value);
      }
    } else {
      params.set("sort", value);
    }

    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  return (
    <div className="mb-3 flex items-center justify-between gap-2 px-1">
      <div className="flex max-w-full flex-wrap gap-1 overflow-x-auto">
        <Link
          prefetch
          href={buildUrl("category", "all")}
          scroll={false}
          className={`rounded-full px-3 py-1 text-sm ${
            category === "all"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          전체
        </Link>

        {categories.map((c) => (
          <Link
            key={c}
            href={buildUrl("category", c)}
            scroll={false}
            className={`rounded-full px-3 py-1 text-sm ${
              category === c
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {/* 정렬 */}
      <div className="flex shrink-0 gap-1">
        {sorts.map((s) => (
          <Link
            key={s.value}
            href={buildUrl("sort", s.value)}
            scroll={false}
            className={`rounded-full px-3 py-1 text-sm ${
              sort === s.value
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
