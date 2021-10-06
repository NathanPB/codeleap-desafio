import React, {FormEvent} from "react";
import CreatePostForm from "../form/CreatePostForm";
import {Career} from "../services/postsApi";
import {useAppDispatch} from "../redux/hooks";
import {editPost} from "../redux/features/feed";

type EditPostControllerArgs = Career & {
  dismiss: ()=>void
}

export default function EditPostController({ dismiss, ...originalData }: EditPostControllerArgs) {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const dispatch = useAppDispatch()

  function resetState() {
    setTitle(originalData.title)
    setContent(originalData.content)
  }

  React.useEffect(resetState, [originalData.title, originalData.content])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    dispatch(
      editPost(
        {
          id: originalData.id,
          data: { title, content }
        }
      )
    ).then(resetState)
    dismiss()
  }

  function handleDismiss() {
    resetState()
    dismiss()
  }

  return (
    <form onSubmit={handleSubmit}>
      <CreatePostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />

      <section className="mt-4 flex justify-end">
        <button
          className="text-black border border-black px-3 w-24"
          onClick={handleDismiss}
        >
          Cancel
        </button>
        <input
          type="submit"
          value="SAVE"
          className="text-white bg-black border border-black px-3 ml-3 w-24 cursor-pointer"
        />
      </section>
    </form>
  )
}
