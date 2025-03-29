import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversation(data);
                // console.log(data)
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getConversation();
    }, [])

    return { loading, conversation };
}

export default useGetConversation
