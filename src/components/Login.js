const Login = ({ handleLogin,setUsername,setPassword,username,password }) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <input id="username" type="text" name="username" onChange={(event) => setUsername(event.target.value)} value={username}/>
      <input id="password" type="password" name="password" onChange={(event) => setPassword(event.target.value)} value={password}/>
      <input id="loginBtn" type="submit" value="Login" />
    </form>
  </div>
)
export default Login