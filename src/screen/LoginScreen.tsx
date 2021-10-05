import React, {FormEvent} from 'react';
import classnames from 'classnames';
import {useAppDispatch} from "../redux/hooks";
import {login} from "../redux/features/auth";

export default function LoginScreen() {
  const [username, setUsername] = React.useState('')
  const dispatch = useAppDispatch()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    dispatch(login({ username: username.trim() }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:px-4 sm:px-6 lg:px-8">
      <div className="p-5 max-w-md w-full space-y-8 sm:shadow-lg bg-gray-50 sm:border sm:border-gray-200">
        <h1 className="text-2xl font-extrabold text-gray-900">Welcome to CodeLeap network!</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Please enter your username</label>
          <input
            id="username"
            type="text"
            maxLength={16}
            placeholder="John Doe"
            className="mt-3 appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="submit"
            value="ENTER"
            className={
              classnames(
                "float-right mt-3 px-8 py-2 bg-black text-white font-bold cursor-pointer transition",
                {
                  "bg-gray-600": !username.trim()
                }
              )
            }
          />
        </form>
      </div>
    </div>
  )
}
