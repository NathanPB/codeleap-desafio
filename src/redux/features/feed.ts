import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  Career,
  CareerEdit,
  CareerIn,
  CareersPaginator,
  createCareer,
  deleteCareer,
  editCareer,
  getCareers
} from "../../services/postsApi";
import {RootState} from "../store";

interface FeedState {
  status: 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED'
  error?: string
  next?: { limit: number, offset: number }
  posts: Career[]
}

const initialState: FeedState = {
  status: 'IDLE',
  error: undefined,
  next: { limit: 10, offset: 0 },
  posts: []
}

export const loadFeed = createAsyncThunk('feed/load', async (_, thunk) => {
  const state = thunk.getState() as RootState
  if (!state.feed.next) return { next: null, results: [], count: 0, previous: null } as CareersPaginator

  const response = await getCareers(state.feed.next)
  return response.data
})

export const createPost = createAsyncThunk('posts/create', async (data: CareerIn) => {
  const response = await createCareer(data)
  return response.data
})

export const editPost = createAsyncThunk('posts/edit', async ({ id, data }: { id: string, data: CareerEdit }) => {
  const response = await editCareer(id, data)
  return response.data
})

export const deletePost = createAsyncThunk('posts/delete', async (id: string) => {
  const response = await deleteCareer(id)
  return response.data
})

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(loadFeed.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(loadFeed.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED'
        const { next, results } = action.payload
        state.posts.push(...results)
        if (next) {
          try {
            const { searchParams } = new URL(next)
            state.next = {
              limit: parseInt(searchParams.get('limit') ?? '0') ?? 0,
              offset: parseInt(searchParams.get('offset') ?? '0') ?? 0
            }
          } catch (e) {
            state.status = 'FAILED'
            state.error = String(e)
          }
        } else {
          state.next = undefined
        }
      })
      .addCase(loadFeed.rejected, (state, action) => {
        state.status = 'FAILED'
        state.error = action.error.message
      })
      .addCase(createPost.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED'
        if (state.posts.length > 10) {
          state.posts = [action.payload, ...state.posts]
        } else {
          state.posts.push(action.payload)
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'FAILED'
        state.error = action.error.message
      })
      .addCase(editPost.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED'
        state.posts = state.posts.map(post => post.id === action.payload.id ? action.payload : post)
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = 'FAILED'
        state.error = action.error.message
      })
      .addCase(deletePost.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED'
        state.posts = state.posts.filter(post => post.id !== action.meta.arg)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'FAILED'
        state.error = action.error.message
      })
  }
})

export default feedSlice.reducer
