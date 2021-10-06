import React, {CSSProperties} from 'react';
import {Career} from "../services/postsApi";
import {useAppSelector} from "../redux/hooks";
import humanizeDuration from 'humanize-duration';
import EditPostController from "./EditPostController";
import StandardDialog from "../utils/StandardDialog";

type FeedItemArgs = Career & {
  style?: CSSProperties
  onEdit: (data: Career) => void
  onDelete: (data: Career) => void
}

export default function FeedItem({ onEdit, onDelete, style, ...data }: FeedItemArgs) {
  const { username, created_datetime, title, content } = data
  const authUsername = useAppSelector(s => s.auth.username)
  const isAuthor = username === authUsername
  const humanDate = React.useMemo(
    () => humanizeDuration(+ new Date(created_datetime) - Date.now(), { largest: 1, units: ['w', 'd', 'h', 'm', 's'] }),
    [created_datetime]
  )

  const [showDelete, setShowDelete] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)

  function renderDeleteDialog() {
    return (
      <StandardDialog visible={showDelete} setVisible={setShowDelete} title={"Are you sure you want to delete this item?"}>
        <section className="mt-4 flex justify-end">
          <button
            className="text-black border border-black px-3 w-24"
            onClick={() => setShowDelete(false)}
          >
            Cancel
          </button>
          <button
            className="text-white bg-black border border-black px-3 ml-3 w-24"
            onClick={() => onDelete(data)}
          >
            OK
          </button>
        </section>
      </StandardDialog>
    )
  }

  function renderEditDialog() {
    return (
      <StandardDialog visible={showEdit} setVisible={setShowEdit} title={"Edit Item"}>
        <EditPostController
          { ...data }
          dismiss={() => setShowEdit(false)}
        />
      </StandardDialog>
    )
  }

  function renderAuthorButtons() {
    return (
      <section>
        { showDelete && renderDeleteDialog() }
        { showEdit && renderEditDialog() }
        <button className="inline-block mr-4 cursor-pointer" onClick={() => setShowDelete(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
          </svg>
        </button>
        <button className="inline-block cursor-pointer" onClick={() => setShowEdit(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M18 13.45l2-2.023v4.573h-2v-2.55zm-11-5.45h1.743l1.978-2h-3.721v2zm1.361 3.216l11.103-11.216 4.536 4.534-11.102 11.218-5.898 1.248 1.361-5.784zm1.306 3.176l2.23-.472 9.281-9.378-1.707-1.707-9.293 9.388-.511 2.169zm3.333 7.608v-2h-6v2h6zm-8-2h-3v-2h-2v4h5v-2zm13-2v2h-3v2h5v-4h-2zm-18-2h2v-4h-2v4zm2-6v-2h3v-2h-5v4h2z"/>
          </svg>
        </button>
      </section>
    )
  }

  return (
    <article className="py-2" style={style}>
      {/* had to do this weirdo wrapper because infinite loading is pain */}
      <section className="border border-gray-200 h-full flex flex-col">
        <header className="bg-black text-white px-4 py-2 flex justify-between">
          <h1 className="font-bold capitalize">{title}</h1>
          { isAuthor && renderAuthorButtons() }
        </header>
        <section className="flex justify-between px-4 py-1 text-gray-500">
          <address className="not-italic">@{username}</address>
          <time dateTime={created_datetime}>{humanDate} ago</time>
        </section>
        <section className="px-4 py-1 overflow-ellipsis overflow-hidden flex-grow">
          { content }
        </section>
      </section>
    </article>
  )
}
