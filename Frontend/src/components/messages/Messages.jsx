import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessagesSkeleton';
const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();
  console.log(messages)
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behaviour:"smooth"})
    }, 1000);
  }, [messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {messages.length == 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}

      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message key={message._id} message={message} ></Message>
        </div>
      ))}
    </div>
  )
}

export default Messages
