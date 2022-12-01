import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DB_table = () => {
    const [student, setStudent] = useState([])

    //for adding student to database
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [course, setCourse] = useState("")
    const [year, setYear] = useState(0)
    const [userInfo, setuserInfo] = useState({
      file:[],
      filepreview:null,
     });
  
    //for modal edit
    const [toggle, setToggle] = useState(false)
  
    //modal ADD
    const [addClick, setAddClick ] = useState(false)
  

    //FIRED EVERYTIME THE PAGE RENDERED
    useEffect(() => {
        axios.get('http://localhost:5000/display').then((response) => {
          setStudent(response.data.result)
        })
        
    })

    //ADD STUDENT
    const [isSucces, setSuccess] = useState(null);
    const addStudent = (e) => {
      const formdata = new FormData(); 
      formdata.append('avatar', userInfo.file);
      formdata.append('lastname', lastname)
      formdata.append('firstname', firstname)
      formdata.append('course', course)
      formdata.append('level', year)

      e.preventDefault()
      axios.post('http://localhost:5000/add-student',formdata ,{
        headers: { "Content-Type": "multipart/form-data" }
      }).then((response) => {
        alert(response.data.message)
        
      })
      
      document.querySelector('#form').reset()
    }

    const deleteStudent = (idno) => {
      axios.delete(`http://localhost:5000/delete-student/${idno}`).then((response) => {
  
        setStudent(
          student.filter((val) => {
            return val.idno != idno
          })
        )
      })
    }
    
   
    //MODAL FOR ADD
    const handleClickAdd = () =>{
      setAddClick(prev => ({addClick: !prev.addClick}))
    }
    const handleCloseModal = () => {
      setAddClick(false)
  
    }
  
    // //For MODAL PART ADD
    //FOR OPENING MODAL
    ///UseState for EDITING (grab the data)
    const [lstN, setLstN] = useState("")
    const [fstN, setfstN] = useState("")
    const [crrs, setCrrs] = useState("")
    const [lv, setLv] = useState("")
    const [idn, setIdn] = useState("")
    const [imgUpdate, setImgUpdate] = useState({
      file:[],
      filepreview:null,
     });

    const handleEdit = (id,lastN, firstN, cRs, lvl, img) => {
      setToggle(true)
      setIdn(id)
      ///grab data
      setLstN(lastN)
      setfstN(firstN)
      setCrrs(cRs)
      setLv(lvl)
      
      
    }

    const handleCloseModalForUpdate = () => {
      setToggle(false)
      window.location.reload()
    }
  
    ///Update student
    const updateStudent = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('avatar', imgUpdate.file)
      formData.append('lastname', lstN)
      formData.append('firstname',fstN)
      formData.append('course', crrs)
      formData.append('level', lv)
      formData.append('idno', idn)
      axios.put('http://localhost:5000/update-student', formData, {
        headers: {"Content-Type": "multipart/form-data"}
      }).then((response) => {
        alert(response.data.message)
      })
      document.querySelector('#form').reset()
    }
  
    return (
      <div className='w-[100vw] justify-center items-center'>
        <div className='bg-green-400 p-6 shadow-md flex flex-row justify-center gap-[73em]'>
            <p className='font-bold text-[3em] text-white tracking-wide'>Studen</p>
            <a href='/webcam' className='place-self-end text-[18px] font-bold hover:text-black hover:underline text-black tracking-wide'>Webcam</a>
        </div>
        
        <div className='w-[80vw] my-6 m-auto flex flex-col'>
          <button onClick={handleClickAdd} className='py-2 px-4 rounded-md hover:text-black text-black hover:bg-blue-700 m-4 bg-blue-400 place-self-end'>Add Student</button>
          <table className='w-full shadow-md'>
            <thead>
              <tr className='bg-green-400 text-white uppercase h-[50px]'>
                <th>Avatar</th>
                <th>idno</th>
                <th>Lastname</th>
                <th>Firstname</th>
                <th>Course</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {student.map((val, index) => {
                
                return (
                  <tr key={index} className='text-center hover:bg-gray-400 border'>
                    
                    <td><img src={`http://localhost:5000/image/${val.image}`} onClick={() => {window.open(`http://localhost:5000/image/${val.image}`)}} className="w-[100px] h-[80px] m-auto rounded-[100%] my-2 hover:cursor-pointer" /></td>
                    <td>{val.idno}</td>
                    <td>{val.lastname}</td>
                    <td>{val.firstname}</td>
                    <td>{val.course}</td>
                    <td>{val.level}</td>
                    <td>
                      <button onClick={() => {handleEdit(val.idno,val.lastname,val.firstname, val.course, val.level, val.image)}} className='hover:bg-white my-2 w-[40px] py-[2px] bg-blue-400 rounded-md mr-2 ' >&#9998;</button>
                      <button onClick={() =>{deleteStudent(val.idno)}}
                    className='hover:text-black text-white w-[40px] py-[2px] bg-red-500 rounded-md font-bold my-2 '>&#x2715;</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
  
       
        {toggle && 
        <div className='h-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
          
            <div className='bg-white w-[33vw] flex flex-col rounded-md '>
              <div className='absolute right-[34%]'><button className='text-red-400 hover:text-red-400 hover:font-extrabold px-2 text-xl place-self-end'
                onClick={handleCloseModalForUpdate}>X</button></div>
              <div className='bg-gray-400 p-10 text-center rounded-t-md'>
              <label className='font-bold text-[30px] text-white'>UPDATE STUDENT</label> 
              </div>
                <div className='w-[90%] m-auto flex flex-col justify-center items-center'>
                <form id='form'>
                <input 
                  type="file" 
                  className='my-6 w-[50%] hover:cursor-pointer hover:text-blue-400 place-self-start'
                  // placeholder={holder}
                  onChange={(e) => { setImgUpdate({
                    ...imgUpdate,
                    file:e.target.files[0],
                    filepreview:URL.createObjectURL(e.target.files[0]),
                  });}} 
                  />{/*Image upload*/}<br/>
                  
                  <label className='place-self-start font-bold uppercase'>Lastname </label>
                  <input type="text"
                    defaultValue={lstN}
                    onChange={(e) => {
                      setLstN(e.target.value)
                    }} className='w-full p-2 outline-none border-b-2'
                  />

                  <label className='place-self-start font-bold uppercase'>Firstname </label>
                  <input type="text" 
                    defaultValue={fstN}
                    onChange={(e) => {
                      setfstN(e.target.value)
                    }} className='w-full p-2 outline-none border-b-2'
                  />

                  <label className='place-self-start font-bold uppercase'>Course </label>
                  <input type="text"
                    defaultValue={crrs}
                    onChange={(e) => {
                      setCrrs(e.target.value)
                    }} className='w-full p-2 outline-none border-b-2'
                  />

                  <label className='place-self-start font-bold uppercase'>Level </label>
                  <input type="text"
                    defaultValue={lv}
                    onChange={(e)=>{
                      setLv(e.target.value)
                    }} className='w-full p-2 outline-none border-b-2
                  '/>
                
                
                </form>
                <button onClick={updateStudent} className='py-2 px-4 rounded-md hover:text-white m-4 bg-blue-400'>+ ADD</button>
                </div>
                {/* </div> */}
            </div>
        </div>}
  
        {addClick && 
        <div className='h-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
          
            <div className='bg-white w-[33vw] flex flex-col rounded-md'>
                <div className='absolute right-[34%]'><button className='text-black hover:text-red-400 hover:font-extrabold px-2 text-xl place-self-end'
                    onClick={handleCloseModal}>X</button></div>
                  <div className='bg-gray-400 p-10 text-center rounded-t-md'>
                  <label className='font-bold text-[30px] text-white'>ADD STUDENT</label> 
                </div>
                <div className='w-[90%] m-auto flex flex-col justify-center items-center'>
                <form id="form">
                <input 
                  type="file" 
                  className='my-6 w-[50%] hover:cursor-pointer hover:text-blue-400 place-self-start' 
                  onChange={(e) => { setuserInfo({
                    ...userInfo,
                    file:e.target.files[0],
                    filepreview:URL.createObjectURL(e.target.files[0]),
                  });}} 
                  />{/*Image upload*/}<br/>
                <label className='place-self-start font-bold uppercase'>Lastname </label>
                <input type="text"
                  onChange={(e) => {
                    setLastname(e.target.value)
                  }} className='w-full p-2 outline-none border-b-2 focus:border-blue-400'
                />
                <label className='place-self-start font-bold uppercase '>Firstname </label>
                <input type="text" 
                  onChange={(e) => {
                    setFirstname(e.target.value)
                  }} className='w-full p-2 outline-none border-b-2 focus:border-blue-400'
                />
                <label className='place-self-start font-bold uppercase'>Course </label>
                <input type="text"
                  onChange={(e) => {
                    setCourse(e.target.value)
                  }} className='w-full p-2 outline-none border-b-2 focus:border-blue-400'
                />
                <label className='place-self-start font-bold uppercase'>Year</label>
                <input type="text"
                  onChange={(e)=>{
                    setYear(e.target.value)
                  }} className='w-full p-2 outline-none border-b-2 focus:border-blue-400'
                />
  
                
                </form>
                <button onClick={addStudent} className='py-2 px-4 rounded-md hover:text-white m-4 bg-blue-400'>+ ADD</button>
                </div>
            </div>
        </div>}
  
        
      </div>
    )
}

export default DB_table