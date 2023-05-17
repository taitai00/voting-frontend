import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [orgName, setOrgName] = useState('')
  const [code, setCode] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(orgName, code)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Please Log In With Your Code To Vote</h3>
      
      <label>Organization:</label>
      <input 
        type="text" 
        onChange={(e) => setCode(e.target.value)} 
        value={code} 
      />

      <label>Your Code:</label>
      <input 
        type="text" 
        onChange={(e) => setOrgName(e.target.value)} 
        value={orgName} 
      />
      

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login