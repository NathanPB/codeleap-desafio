import React, {CSSProperties} from "react";
import {Career} from "../services/postsApi";
import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList} from "react-window";

type FeedInfiniteListArgs = {
  hasMore: boolean,
  isLoadingMore: boolean,
  items: Career[],
  loadMore: ()=>void,
  renderItem: (item: Career, style: CSSProperties)=>any
}

export default function FeedInfiniteList({ hasMore, isLoadingMore, items, loadMore, renderItem }: FeedInfiniteListArgs) {
  const itemCount = hasMore ? items.length + 1 : items.length
  const ref = React.useRef<HTMLElement>(null)
  const height = ref.current?.offsetHeight || 512

  return (
    <section className="flex-grow" ref={ref}>
      <InfiniteLoader
        isItemLoaded={index => !hasMore || index < items.length}
        loadMoreItems={isLoadingMore ? () => {} : loadMore}
        itemCount={itemCount}
        threshold={20}
      >
        {
          (({ onItemsRendered, ref }) =>
              <FixedSizeList
                itemSize={191}
                height={height}
                width={"100%"}
                itemCount={itemCount}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {
                  ({ index, style }) => {
                    const item = items[index]
                    return !!item && renderItem(items[index], style)
                  }
                }
              </FixedSizeList>
          )
        }
      </InfiniteLoader>
    </section>
  )
}
