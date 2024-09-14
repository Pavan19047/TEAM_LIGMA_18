import React from 'react'
// import "../css/Login.css"
import "../CSS/Login.css"
function Login() {
  return (
    <div className='Login'>
    <form action="/login" method="post">
        <h1>LOGIN</h1>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required/>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required/>
        <button type="submit">Login</button>
        <a  className="anchor"href="/">Back to Home</a>
    </form>


    </div>
  )
}

export default Login