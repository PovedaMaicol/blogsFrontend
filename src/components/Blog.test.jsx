import React from "react";
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";
import AddBlog from "./AddBlog"
import { expect } from "vitest";
import jest from 'jest-mock'


test('display title and autor of blog but not url or likes by default', () => {
    const blog = {
        title: 'esta es una prueba',
        author: 'Maicol Salazar',
        url: 'jjjasjalsal',
        likes: 5,
        user: {username: 'testuser'}
    }
    
    const user = { username: 'testuser' }

    render(<Blog blog={blog} user={user}/>)

    // valido que titulo y autor esten presentes
    const title = screen.getByText(/esta es una prueba/i)
    const author = screen.getByText(/Maicol Salazar/i)
    expect(title).toBeDefined()
    expect(author).toBeDefined()

    // Verifica que la URL y los likes no se muestran por defecto
    const url = screen.queryByText(/jjjasjalsal/i)
    const likes = screen.queryByText(/likes: 5/i)
    expect(url).toBeNull()
    expect(likes).toBeNull()
})

test('url and likes are shown when the button is clicked', async () => {
    const blog = {
        title: 'esta es una prueba',
        author: 'Maicol Salazar',
        url: 'jjjasjalsal',
        likes: 5,
        user: {username: 'testuser'}
    }

    const user = { username: 'testuser' }

    render(<Blog blog={blog} user={user} />)

    const userEventSetup = userEvent.setup()
    const button = screen.getByText('view')
    await userEventSetup.click(button)


    // Verifica que la URL y los likes se muestran después de hacer clic en el botón
    const url = screen.getByText(/jjjasjalsal/i)
    const likes = screen.getByText(/likes: 5/i)
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})

test('calls handleLike twice when like button is clicked twice', async () => {
    const blog = {
        title: 'esta es una prueba',
        author: 'Maicol Salazar',
        url: 'jjjasjalsal',
        likes: 5,
        user: { username: 'testuser' }
    }
    const user = { username: 'testuser' }

    const handleLike = jest.fn()

    render(<Blog blog={blog} handleLike={handleLike} user={user} />)

    const button = screen.getByText('view')
    await userEvent.click(button)

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(handleLike).toHaveBeenCalledTimes(2)

})

