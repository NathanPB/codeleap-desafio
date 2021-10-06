import React from 'react';
import {useAppDispatch} from "../redux/hooks";
import {logout} from "../redux/features/auth";
import PostFeed from "../feed/PostFeed";
import CreatePostController from "../feed/CreatePostController";

export default function HomeScreen() {
  const dispatch = useAppDispatch()


  return (
    <div className="flex justify-center h-screen">
      <div className="h-100 w-full sm:w-3/5 md:w-3/6 bg-white flex flex-col">
        <header className="text-white bg-black p-3 flex justify-between flex-grow-0 flex-shrink-0">
          <h1 className="font-bold text-lg">CodeLeap Network</h1>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </header>
        <main className="flex-grow flex-shrink overflow-y-auto px-2 flex flex-col pt-3">
          <CreatePostController/>
          <PostFeed/>
        </main>
      </div>
    </div>
  )
}
