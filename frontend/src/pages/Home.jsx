import React, { useEffect, useState } from 'react'
import { $api } from '../utils'

export default function Home() {
  const [request, setRequest] = useState("")

  const fetchRequest = async () => {
    try {
        const response = await $api.get('/api/users')
        console.log(response.data)
        setRequest(response.data)
    } catch (error) {
      console.log(error)
        
    }
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  const handleLogOut = () => {
    localStoreage.clear()
    // remove the access token from local storage
    localStorage.removeItem("accessToken")
    // remove the refresh token from local storage
    localStorage.removeItem("refreshToken")
    window.location.href = "/login"
  }
  return (
    <div>Home {request}
      <button className='bg-red-500 p-4 text-white' onClick={handleLogOut}>Log out</button>
    </div>
  )
}
