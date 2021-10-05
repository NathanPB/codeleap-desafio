import React from 'react';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {logout} from "../redux/features/auth";
import {loadFeed} from "../redux/features/feed";

export default function HomeScreen() {
  const { username } = useAppSelector(s => s.auth)
  const feed = useAppSelector(s => s.feed)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(loadFeed())
  }, [])

  return (
    <div className="flex justify-center h-screen">
      <div className="h-100 w-full sm:w-3/5 md:w-3/6 bg-white flex flex-col">
        <header className="text-white bg-black p-3 flex justify-between flex-grow-0 flex-shrink-0">
          <h1 className="font-bold text-lg">CodeLeap Network</h1>
          <a href="#" onClick={() => dispatch(logout())}>Logout</a>
        </header>
        <main className="flex-grow flex-shrink overflow-y-auto">
          <span className="block text-center mt-3 flex-grow">Welcome, {username}!</span>
          { feed.posts.map(post => <div className="text-center">{ post.content }</div>) }
          <a href="#" className="block text-center" onClick={() => dispatch(loadFeed())}>
            Load More
          </a>
        </main>
      </div>
    </div>
  )
}
