import React from 'react'
import { useState } from 'react'
import Webcam from 'react-webcam'



const WebcamCapture = () => {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user'
    }
    const webcamRef = React.useRef(null)
    const [captured, setCapturedImg] = useState('')
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot()
            setCapturedImg(imageSrc)
        }, [webcamRef]
    )


    const [first,setFirst] =useState('')
    const [last,setLast] =useState('')
    const [course,setCourse] =useState('')
    const [level,setLevel] =useState('')
    const [output, setOutput] = useState(false)
    const saveForm = (e)=>{
        e.preventDefault()
        setOutput(true)
    }

    //reset data
    const resetForm = ()=>{
        setOutput(false)
        setFirst('')
        setLast('')
        setCourse('')
        setLevel('')
        setCapturedImg('')
    }
  return (
    // <>
    <div className='flex justify-center items-center flex-col'>
        <div className='bg-green-400 w-full py-[2em] flex flex-row justify-center gap-[73em]'>
            <p className='font-bold text-[3em] text-white tracking-wide'>Webcam</p>
            <a href='/table' className='place-self-end text-[18px] font-bold hover:text-black hover:underline text-black tracking-wide'>Table</a>
        </div>
        <div className='flex flex-col'>
            {output === false ?
            <form className='w-[400px] text-center mt-4 ml-20 '>
                { captured === '' ?
                    <Webcam
                        audio={false}
                        height={720}
                        ref={webcamRef}
                        screenshotFormat='image/jpeg'
                        width={500}
                        videoConstraints={videoConstraints}
                        className='rounded-sm'
                    />:<img src={captured} />}

                {captured !== '' ? 
                    <button onClick={(e) => {
                        e.preventDefault()
                        setCapturedImg('')
                        }} className='bg-blue-400 text-white px-10 py-2 mt-2 rounded-md hover:bg-blue-300 hover:text-black'>Retake</button>:<button className='hover:bg-blue-400 hover:text-black bg-green-400 text-white px-10 py-2 mt-2 rounded-md' onClick={(e) => {
                            e.preventDefault()
                            capture()
                        }}>Capture</button>
                }
                <input onChange={(e) => setFirst(e.target.value)} type='text' placeholder='First Name' className='w-full py-4 my-2'/>
                <input onChange={(e) => setLast(e.target.value)} type='text' placeholder='Last Name' className='w-full py-4 my-2'/>
                <input onChange={(e) => setCourse(e.target.value)} type='text' placeholder='Course' className='w-full py-4 my-2'/>
                <input onChange={(e) => setLevel(e.target.value)} type='text' placeholder='Level' className='w-full py-4 my-2'/>
                <button onClick={saveForm} className='bg-green-400 text-white px-10 py-2 mt-2 rounded-md hover:bg-green-300 hover:text-black'>Save</button>
            </form>:<form className='w-[400px] text-center mt-10 ml-20'>
                    <img src={captured}/><br/>
                    <label className='uppercase font-bold tracking-wide'>First Name</label><p className='w-full my-2 outline-none border-b-2 uppercase'> {first}</p>
                    <label className='uppercase font-bold tracking-wide'>Last Name</label><p className='w-full my-2 outline-none border-b-2 uppercase'>{last}</p>
                    <label className='uppercase font-bold tracking-wide'>Course</label><p className='w-full my-2 outline-none border-b-2 uppercase'>{course}</p>
                    <label className='uppercase font-bold tracking-wide'>Level</label><p className='w-full my-2 outline-none border-b-2 uppercase'>{level}</p>
                </form>
                
            }<br/>
            {output &&<div className='flex flex-row justify-end items-center gap-[10em]'>
            <button onClick={resetForm} className='bg-red-400 text-white hover:text-black hover:bg-red-300 px-10 py-2 rounded-md place-self-start'>Reset</button>
            <button className='bg-green-400 text-white hover:text-black hover:bg-green-300 px-10 py-2 rounded-md place-self-end'>Save</button></div>
            }          
            {/* <div>
                {output &&
                
                }
            </div> */}
        </div>
    </div>
  )}

export default WebcamCapture