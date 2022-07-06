import React from 'react'

export default function Login() {

  const handleSubmit = (e) => {
    console.log()
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder='Email'  /><br />
        <input type="password" name="pwd" placeholder='Password'  /><br />
        <button>Log In</button>
      </form>
    </div>
  )
}
