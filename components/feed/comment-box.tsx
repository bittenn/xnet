"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { mockUser } from "@/lib/mock";
import { User } from "@/types";

export function CommentBox({
  onAdd,
}: {
  onAdd: (c: {
    id: string;
    author: User;
    content: string;
    createdAt: string;
  }) => void;
}) {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async () => {
    if (!value.trim()) return;
    setPending(true);
    const optimistic = {
      id: `tmp-${Date.now()}`,
      author: mockUser,
      content: value,
      createdAt: new Date().toISOString(),
    };
    setTimeout(() => {
      onAdd(optimistic);
      setPending(false);
      setValue("");
    }, 500);
  };

  return (
    <div className="mt-3 flex gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="댓글을 입력하세요…"
        className="min-h-[40px] flex-1 resize-none rounded-md border p-2 text-sm outline-none focus:ring-2 focus:ring-gray-500"
      />
      <Button onClick={submit} disabled={pending || !value.trim()}>
        등록
      </Button>
    </div>
  );
}
