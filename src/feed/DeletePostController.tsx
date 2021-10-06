import React from "react";
import {Career} from "../services/postsApi";
import {deletePost} from "../redux/features/feed";
import {useAppDispatch} from "../redux/hooks";

type DeletePostControllerArgs = Career & {
  dismiss: ()=>void
}

export default function DeletePostController({ dismiss, ...data }: DeletePostControllerArgs) {
  const dispatch = useAppDispatch()

  function handleDelete() {
    dispatch(deletePost(data.id))
    dismiss()
  }

  return (
    <section className="mt-4 flex justify-end">
      <button
        className="text-black border border-black px-3 w-24"
        onClick={dismiss}
      >
        Cancel
      </button>
      <button
        className="text-white bg-black border border-black px-3 ml-3 w-24"
        onClick={handleDelete}
      >
        OK
      </button>
    </section>
  )
}
