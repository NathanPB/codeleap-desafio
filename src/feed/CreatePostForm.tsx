import React, {FormEvent} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import classnames from "classnames";
import {createPost} from "../redux/features/feed";
import {Disclosure} from '@headlessui/react'

export default function CreatePostForm() {
  const { username } = useAppSelector(s => s.auth)
  const { status } = useAppSelector(s => s.feed)
  const dispatch = useAppDispatch()

  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')

  // Trickery to autoclose the form's Disclosure when new content is loading
  //   because it means that the user is scrolling down to reach new content
  const [hasAutoclosed, setHasAutoclosed] = React.useState(true)
  const [open, setOpen] = React.useState(true)

  React.useEffect(() => {
    if (!hasAutoclosed && open && status === 'LOADING') {
      setOpen(false)
      setHasAutoclosed(true)
    }
  }, [open, status, hasAutoclosed])

  React.useEffect(() => {
    const interval = setInterval(() => setHasAutoclosed(false), 2000)
    return () => clearInterval(interval)
  }, [hasAutoclosed])

  function resetState() {
    setTitle('')
    setContent('')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      dispatch(
        createPost({
          title: title.trim(),
          content: content.trim(),
          username
        })
      )

      resetState()
    }
  }

  return (
    <section className="border border-gray mr-4 mb-3">
      <Disclosure>
        <Disclosure.Button className="flex justify-between w-full cursor-default">
          <h2 className="font-bold text-lg pl-3">Whats on your mind, {username}?</h2>
          <div className="flex flex-col justify-center pr-3 cursor-pointer" onClick={() => setOpen(!open)}>
            <span
              className={
                classnames(
                  "w-5 h-5 transition-all duration-300",
                  { "transform rotate-180": open }
                )
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
              </svg>
            </span>
          </div>
        </Disclosure.Button>
        <Disclosure.Panel static>
          { open && (
            <form className="p-3" onSubmit={handleSubmit}>
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
              <div className="flex justify-end">
                <input
                  type="submit"
                  value="CREATE"
                  className={
                    classnames(
                      "mt-3 px-8 py-2 bg-black text-white font-bold text-sm cursor-pointer transition",
                      {
                        "bg-gray-800": !title.trim() || !content.trim()
                      }
                    )
                  }
                />
              </div>
            </form>
          ) }
        </Disclosure.Panel>
      </Disclosure>
    </section>
  )
}
