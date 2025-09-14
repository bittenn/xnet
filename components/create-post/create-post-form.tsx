"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { mockCategories } from "@/lib/mock/categories";
import { mcokUser } from "@/lib/mock";
import { useCreatePost } from "@/hooks/use-create-post";
import { FaImage, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface CreatePostFormProps {
  isModal?: boolean;
}

export const CreatePostForm = ({ isModal = false }: CreatePostFormProps) => {
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const router = useRouter();
  const createPostMutation = useCreatePost();

  const maxLength = 280;
  const remainingChars = maxLength - content.length;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, 4 - selectedImages.length);
      setSelectedImages((prev) => [...prev, ...newFiles]);

      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    },
    [selectedImages.length],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 4,
    disabled: selectedImages.length >= 4,
  });

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || createPostMutation.isPending) return;

    try {
      const imageUrls = imagePreviewUrls;

      await createPostMutation.mutateAsync({
        content: content.trim(),
        imageUrls,
        category: selectedCategory,
      });

      setContent("");
      setSelectedImages([]);
      setImagePreviewUrls([]);

      if (isModal) {
        router.back();
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error("게시물 작성 실패:", error);
    }
  };

  const canSubmit =
    content.trim().length > 0 &&
    remainingChars >= 0 &&
    !createPostMutation.isPending;

  const handleCancle = () => {
    if (isModal) {
      router.back();
    } else {
      router.replace("/");
    }
  };
  return (
    <div className="mx-auto w-full p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 사용자 정보 */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={mcokUser.profileImage} alt={mcokUser.name} />
            <AvatarFallback>{mcokUser.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{mcokUser.name}</div>
            <div className="text-sm text-gray-500">@{mcokUser.nickname}</div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            카테고리
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="w-full rounded-lg border p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            {mockCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* 이미지 미리보기 */}
        {imagePreviewUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {imagePreviewUrls.map((url, index) => (
              <div key={index} className="relative p-1">
                <div className="relative aspect-square overflow-hidden rounded-lg border">
                  <Image
                    src={url}
                    alt={`미리보기 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 이미지 업로드 */}
        {selectedImages.length < 4 && (
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
              isDragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <FaImage className="mx-auto mb-2 h-8 w-8 text-gray-400" />
            {isDragActive ? (
              <p className="text-gray-600">이미지를 놓으세요...</p>
            ) : (
              <p className="text-gray-600">
                이미지를 드래그하거나 클릭하여 선택하세요
                <br />
                <span className="text-sm">
                  최대 4장까지 ({selectedImages.length}/4)
                </span>
              </p>
            )}
          </div>
        )}
        <div className="min-w-0">
          {" "}
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="무슨 일이 일어나고 있나요?"
            className="w-full resize-none overflow-hidden leading-relaxed"
            maxLength={maxLength}
          />
          <div
            className={`mt-2 text-right text-sm ${
              remainingChars < 20 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {content.length}/{maxLength}
          </div>
        </div>
        {/* 제출 버튼 */}
        <div className="flex justify-end gap-1 border-t pt-4">
          <Button
            type="button"
            className="px-8"
            variant={"destructive"}
            onClick={handleCancle}
          >
            취소
          </Button>
          <Button type="submit" disabled={!canSubmit} className="px-8">
            {createPostMutation.isPending ? "게시 중..." : "게시"}
          </Button>
        </div>
      </form>
    </div>
  );
};
