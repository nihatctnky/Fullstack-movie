import React from 'react'
import Input from './ınput'
import { INPUTS } from '../../constants'
import api from '../../service/api';
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const Form = () => {

  const navigate = useNavigate()


  const handleSubmit = (e)=>{
    //form gönderince
    e.preventDefault()
    // inputlardaki verilere nesne formatımda eriş
     const formData= new FormData(e.target)
     const movieData = Object.fromEntries(formData.entries())

     // cast ve genre verilerine dizi formatına çevir

     movieData.genre = movieData.genre.split(",")
    
     movieData.cast = movieData.cast.split(",")


     //rasgele foto ekle

     movieData.image= `https://picsum.photos/seed/${Math.random()*100}/400/600`

// filmin süresini s/dk formatına çevir

const hour = (movieData.duration/60).toFixed(0)
const minute = movieData.duration % 60
movieData.duration= `${hour}s ${minute}dk`



     // apiye film oluşturmak ,çin istek at 

     api.post ("/movies",movieData)
     .then((res)=>{
      toast.success("Yeni film oluşturuldu")
      navigate(`/movie/${res.data.id}`)
     })
     .catch((error)=>{
toast.error("Hata oluştu")
     })
  }


  return (
    <div className='min-h-screen relative overflow-hidden flex items-center justify-center px-5 py-12'>
 <div className='glass w-full max-w-2xl p-10 mx-auto rounded-2xl shadow-2xl z-10 animate-fade-in'>
  <form onSubmit={handleSubmit}
  className='flex flex-col gap-5 '>
    <h1 className='text-center text-3xl font-bold'>Yeni Film Oluştur</h1>

    {/* inputlar */}
    <div className='space-y-5'>
     {INPUTS.slice(0,5).map((props)=>(
      <Input key={props.name}{...props}/>
     ))}
    </div>
    <div className='space-y-5 md:grid md:grid-cols-2 md:gap-5'>
     {INPUTS .slice(5,7).map((props)=>(
      <Input key={props.name}{...props}/>
     ))}
    </div>
    <div className='space-y-5 md:grid md:grid-cols-2 md:gap-5'>
     {INPUTS .slice(7,9).map((props)=>(
      <Input key={props.name}{...props}/>
     ))}
    </div>

     {/* button */}
     <button type='submit' className='btn-gradient py-3 px-6 rounded-xl font-semibold text-lg mt-4 sha-xl'>Oluştur</button>
  </form>

 </div>
    </div>
  )
}

export default Form
