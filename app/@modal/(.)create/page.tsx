"use clinet";
import { Modal } from "@/components/common/modal";
import { CreatePostForm } from "@/components/create-post/create-post-form";

export default function CreatePostModal() {
  return (
    <Modal>
      <CreatePostForm isModal={true} />
    </Modal>
  );
}
