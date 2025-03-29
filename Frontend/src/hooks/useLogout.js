import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const useLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()
  const logout = async() => {
    setLoading(true);
    try {
        const res = await fetch('/api/auth/logout', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        });
        const data = res.json();
        if(data.error) {
            throw new Error(data.error);
        }
        localStorage.removeItem('chat-user');
        setAuthUser(null);
        navigate('/login') 
    } catch (error) {
      toast.error(error.message);
    }finally {
      setLoading(false);
    }
  }
  return {loading, logout}
}

export default useLogout
