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
  return (
    <div>Home {request}</div>
  )
}
