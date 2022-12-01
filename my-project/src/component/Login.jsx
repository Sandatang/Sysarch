import React,{useState} from 'react'
import axios from 'axios'

const Login = () => {
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')

  //errors
  const [error, setError] = useState(false)
  const [message, setMssg] = useState('')

  //pass the user
  // const [value,setValue] = useState('')

  const verifyUser = async () => {
    await axios.post('http://localhost:5000/verification', {
      username: username,
      password: password
    }).then((response) => {
      const path = '/table'
      if(response.data.path === path){
        window.location = '/table'
        // setValue(`Welcome ${response.data.username}`)
      }
      else{
        setError(true)
        setMssg(response.data.message)
      }
    })
  }
  return (
    <div className='flex justify-center items-center w-full rouned-md h-[70vh]'>
        <div className='flex flex-col justifyc-center items-center w-[30vw] bg-gray-100 m-auto shadow-lg'>
            <div className='bg-blue-400 w-[30vw] text-center rounded-t-md py-4 '>
                <label className='font-bold text-white text-[30px]'>USER LOGIN</label>
            </div>
            {/* <pre className='text-black '>{value}</pre> */}
            <div className='w-[28vw] my-4 flex flex-col justify-center item-center'>
                
                <input placeholder='Username' type='text' className='w-[100%] px-2 py-4 mt-2 outline-none border border-gray-200 rounded-md' onChange={(e) => {setUser(e.target.value)}}/>
                <input placeholder='Password' type='password' className='w-[100%] px-2 py-4 outline-none border border-gray-200 rounded-md mt-4' onChange={(e) => {setPass(e.target.value)}}/>
                <button onClick={verifyUser} className='my-4 w-[100%] bg-green-400 px-2 py-4 text-white text-[20px] font-bold'>Login</button>
 
            </div>
           <p className={`text-red-400 pb-6 ${error? 'visible':'invisible'}`}>{message}</p>
        </div>
    </div>
  )
}

export default Login