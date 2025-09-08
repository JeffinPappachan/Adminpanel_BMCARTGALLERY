"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [mediaItemType, setMediaItemType] = useState("");
  const [mediaItemStoragePath, setMediaItemStoragePath] = useState("");
  const [mediaItemTitle, setMediaItemTitle] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [tags, setTags] = useState("");
  const [lastInsertId, setLastInsertId] = useState<string | null>(null);

  const handleAddMediaItem = () => {
    if (mediaItemType && mediaItemStoragePath && mediaItemTitle) {
      setMediaItems([
        ...mediaItems,
        {
          type: mediaItemType,
          storagePath: mediaItemStoragePath,
          title: mediaItemTitle,
        },
      ]);
      setMediaItemType("");
      setMediaItemStoragePath("");
      setMediaItemTitle("");
    } else {
      alert("Please fill all media item fields.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLastInsertId(null);

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const { data, error } = await supabase
      .from("content")
      .insert([
        {
          title,
          author_name: authorName,
          department,
          category,
          body,
          media_items: mediaItems,
          is_featured: isFeatured,
          tags: tagsArray,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error);
      alert("Error submitting the form. Check the console for details.");
    } else {
      const newContentId = data?.[0]?.content_id;
      console.log("Data inserted successfully:", data);
      alert(`Form submitted successfully! New Content ID: ${newContentId}`);
      if (newContentId) {
        setLastInsertId(newContentId);
      }
      // Clear form fields
      setTitle("");
      setAuthorName("");
      setDepartment("");
      setCategory("");
      setBody("");
      setMediaItems([]);
      setIsFeatured(false);
      setTags("");
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Content Submission Form</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-sm"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="authorName" className="font-medium">
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="department" className="font-medium">
              Department
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
              required
            >
              <option value="">Select a category</option>
              <option value="Literary Arts">Literary Arts</option>
              <option value="Print Media">Print Media</option>
              <option value="Visual Arts">Visual Arts</option>
              <option value="Photography">Photography</option>
              <option value="Media & Mixed Arts">Media & Mixed Arts</option>
              <option value="Radio & Podcasts">Radio & Podcasts</option>
              <option value="Blogs">Blogs</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="font-medium">
              Description
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
              required
            />
          </div>
          <div className="flex flex-col gap-4 border p-4 rounded-md">
            <h3 className="font-medium">Media Items</h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="mediaItemType" className="font-medium text-sm">
                Type
              </label>
              <input
                type="text"
                id="mediaItemType"
                value={mediaItemType}
                onChange={(e) => setMediaItemType(e.target.value)}
                className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="mediaItemStoragePath"
                className="font-medium text-sm"
              >
                Storage Path
              </label>
              <input
                type="text"
                id="mediaItemStoragePath"
                value={mediaItemStoragePath}
                onChange={(e) => setMediaItemStoragePath(e.target.value)}
                className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mediaItemTitle" className="font-medium text-sm">
                Title
              </label>
              <input
                type="text"
                id="mediaItemTitle"
                value={mediaItemTitle}
                onChange={(e) => setMediaItemTitle(e.target.value)}
                className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
              />
            </div>
            <button
              type="button"
              onClick={handleAddMediaItem}
              className="rounded-md bg-blue-500 text-white p-2"
            >
              Add Media Item
            </button>
            <div>
              <h4 className="font-medium">Added Media Items:</h4>
              <ul>
                {mediaItems.map((item, index) => (
                  <li key={index}>
                    {item.title} ({item.type})
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="font-medium">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] p-2"
            />
            <label htmlFor="isFeatured" className="font-medium">
              Is Featured
            </label>
          </div>
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Submit
          </button>
        </form>
        {lastInsertId && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md w-full max-w-sm">
            <p>Successfully created content with ID:</p>
            <p className="font-bold">{lastInsertId}</p>
          </div>
        )}
      </main>
    </div>
  );
}
