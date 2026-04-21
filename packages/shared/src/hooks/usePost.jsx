import { useState } from "react";

export function usePost(post, onPublish, onDelete, onSave) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(post.text);

  function handleSave() {
    setIsEditing(false);
    if (!draft.trim() || draft === post.text) return;
    onSave(post, draft);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") setIsEditing(false);
    if (e.key === "Enter") handleSave();
  }

  function startEditing() {
    setDraft(post.text);
    setIsEditing(true);
  }

  return {
    isEditing,
    draft,
    setDraft,
    handleSave,
    handleKeyDown,
    startEditing,
  };
}
