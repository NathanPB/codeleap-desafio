import React from "react";

type CreatePostFormArgs = {
  title: string
  setTitle: (title: string)=>void
  content: string
  setContent: (content: string)=>void
}

export default function CreatePostForm({ title, content, setTitle, setContent }: CreatePostFormArgs) {
  return (
    <>
      <div className="mt-6">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Hello world"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mt-1 appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
          maxLength={64}
          required
        />
      </div>
      <div className="my-3">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          placeholder="Content Here"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="mt-1 appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm resize-none"
          maxLength={512}
          required
        />
      </div>
    </>
  )
}
