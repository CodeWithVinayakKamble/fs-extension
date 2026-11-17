import { useState, useEffect } from "react";
import anecdoteServices from "../services/anecdotes";

export const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => setValue(event.target.value)
    const reset = () => setValue('')
    return { type, value, onChange, reset }
}

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])
    useEffect(() => {
        anecdoteServices.getAll().then(data => setAnecdotes(data))
    }, [])
    const addAnecdote = (object) => {
        anecdoteServices.createNew(object).then(newAnecdote => setAnecdotes(prev => [...prev, newAnecdote]))
    }
    const deleteAnecdote = (id) => {
        anecdoteServices.remove(id).then(() => setAnecdotes(prev => prev.filter(anecdote => anecdote.id !== id)))
    }
    return { anecdotes, addAnecdote, deleteAnecdote }
}

