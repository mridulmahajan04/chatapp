import React, { useEffect } from 'react'
import { useState } from 'react';
import  useConversations  from '../zustand/useConversations';
import toast from 'react-hot-toast'
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversations();
  useEffect(() => {
    const getMessages = async() => {
        setLoading(true);
        try {
          setMessages([]);
            const res = await fetch(`/api/messages/${selectedConversation._id}`)
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            setMessages(data)
        } catch (error) {
            console.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    if(selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages])

  return {loading, messages}
}

export default useGetMessages
