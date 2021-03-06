import axios from 'axios'
import {setAlert} from './alert'
import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from './types'



export const getCurrentProfile=()=>async(dispatch)=>{
 try {
     const res=await axios.get('/api/profile/me')
     dispatch({
         type:GET_PROFILE,
         payload:res.data
     })
 } catch (err) {
     dispatch({
         type:PROFILE_ERROR,
         payload:{msg:err.response.statusText,status:err.response.status}
     })
 }
}

// create and update profile
export const createProfile=(profile,history,edit=false)=>async(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
       const res=await axios.post('/api/profile',profile,config) 
       dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
   dispatch(setAlert(edit ? 'Profile Updated':'Profile Created',"success"))
   if(!edit){
       history.push('/dashboard')
   }
    } catch (err) {
        const errors=err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,"danger")))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

// add experience
export const addExperience=(formData,history)=>async(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
       const res=await axios.put('/api/profile/experience',formData,config) 
       dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
   dispatch(setAlert("experience added","success"))
       history.push('/dashboard')
    } catch (err) {
        const errors=err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,"danger")))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// add education
export const addEducation=(formData,history)=>async(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
       const res=await axios.put('/api/profile/education',formData,config) 
       dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
   dispatch(setAlert("Education added","success"))
       history.push('/dashboard')
    } catch (err) {
        const errors=err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,"danger")))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// delete experience
export const deleteExperience=id=>async dispatch=>{
    try {
        const res=await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert("Experience removed","success"))
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// delete education
export const deleteEducation=id=>async dispatch=>{
    try {
        const res=await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert("Education removed","success"))
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// delete Account
export const deleteAccount=()=>async dispatch=>{
    if(window.confirm('Are you sure ? This can not be undone')){
        try {
            await axios.delete('/api/profile')
            dispatch({ type:CLEAR_PROFILE })
            dispatch({ type:ACCOUNT_DELETED})
            dispatch(setAlert("your account has been permanantly deleted","success"))
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            })
        }
    }
  
}

