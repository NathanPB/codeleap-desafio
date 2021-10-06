import React from "react";
import {deletePost, loadFeed} from "../redux/features/feed";
import FeedItem from "./FeedItem";
import FeedInfiniteList from "./FeedInfiniteList";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

export default function PostFeed() {
  const { posts, next, status } = useAppSelector(s => s.feed)
  const dispatch = useAppDispatch()

  return (
    <FeedInfiniteList
      hasMore={!!next}
      isLoadingMore={status === 'LOADING'}
      items={posts}
      loadMore={() => dispatch(loadFeed())}
      renderItem={(post, style) => (
        <FeedItem
          key={post.id}
          id={post.id}
          created_datetime={post.created_datetime}
          username={post.username}
          title={post.title}
          content={post.content}
          style={style}
          onEdit={console.log}
          onDelete={() => dispatch(deletePost(post.id))}
        />
      )}
    />
  )
}
