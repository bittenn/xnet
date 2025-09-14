"use client";

import { useState } from "react";
import { FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa";

import { Comment } from "@/types/post";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { relTime } from "@/lib/reltime";

interface CommentListProps {
  comments: Partial<Comment>[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="-mx-5 mt-4 space-y-3 border-t px-5 py-3">
      <div className="text-sm text-gray-600">댓글 {comments.length}개</div>
      {comments
        .filter((comment) => comment.content && comment.author)
        .map((comment, index) => (
          <CommentItem
            key={`${comment.content}-${index}`}
            author={comment.author!}
            content={comment.content!}
            createdAt={comment.createdAt!}
            isLiked={comment.isLiked ?? false}
            likes={comment.likes ?? 0}
          />
        ))}
    </div>
  );
};
const CommentItem = ({
  author,
  content,
  createdAt,
  isLiked: propIsLiked,
  likes: propLikes,
}: Comment) => {
  const [isLiked, setIsLiked] = useState(propIsLiked);
  const [likes, setLikes] = useState(propLikes);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };
  return (
    <div className="flex gap-2">
      <Avatar className="h-7 w-7 flex-shrink-0">
        <AvatarImage
          src={author?.profileImage}
          alt={`${author?.name} 프로필`}
        />
        <AvatarFallback className="text-xs">{author?.name?.[0]}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">
                {author?.name}
              </span>
              <span className="text-xs text-gray-500">@{author?.nickname}</span>
              {author?.verified && (
                <FaCheckCircle className="h-3 w-3 text-blue-500" />
              )}
              <span className="text-xs text-gray-400">
                {createdAt && relTime(new Date(createdAt))}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-800">{content}</p>
          </div>

          <div className="ml-2 flex-shrink-0">
            {likes !== undefined && (
              <Button
                onClick={handleLike}
                variant={"ghost"}
                className="flex items-center gap-1 text-gray-500 transition-colors"
              >
                {isLiked ? (
                  <FaHeart className="h-3 w-3 text-red-500" />
                ) : (
                  <FaRegHeart className="h-3 w-3" />
                )}
                <span className="text-xs">{likes}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
