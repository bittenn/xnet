"use client";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { IoCloseSharp } from "react-icons/io5";

export function ImageViewer({
  open,
  src,
  alt,
  onClose,
}: {
  open: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <Image
          src={src}
          alt={alt || "image"}
          width={1600}
          height={1600}
          className="max-w-[325px] object-contain md:max-w-[800px]"
          loading="eager"
          fetchPriority="high"
        />
        <Button
          variant={"outline"}
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <IoCloseSharp />
        </Button>
      </div>
    </div>
  );
}
