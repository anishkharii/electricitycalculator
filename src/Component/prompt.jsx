import React, { useEffect, useState } from 'react'

const Prompt = (props) => {
   var windowY =Math.floor(window.scrollY);
   
   useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "scroll"
    }
   })
  return (
    <>
    
    <div style={{top:`${windowY}px`}} className={`absolute z-30  left-0 w-full h-full bg-black/30`}>
    <div className='relative top-1/2'>
    <div className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 shadow-[0_0_20px_0_rgba(0,0,0,0.5)] py-5 px-10 rounded-md`}>
    <p className='text-xl font-bold '>Do You Want to Clear All Items?</p>
    <div className=' text-black flex gap-5 items-center justify-center'>
    <button className=' bg-[#E71010] font-bold hover:bg-[#b21a1a]' onClick={()=>{props.clearAll()}}>Clear</button>
    <button className=' text-black font-bold bg-slate-100 hover:bg-slate-200' onClick={()=>{props.closePrompt()}}>No</button>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Prompt;