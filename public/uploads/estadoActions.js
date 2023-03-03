import axios from 'axios'
import { tokenConfig, tokenConfigMultipart } from './auth'

export const GET_ESTADOS ='GET_ESTADOS'
export const ADD_ESTADO ='ADD_ESTADO'
export const EDIT_ESTADO ='EDIT_ESTADO'
export const DELETE_ESTADO ='DELETE_ESTADO'

const urlbase ='http://localhost:8080/api/'



export const getEstados = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'estados/', tokenConfig(getState))
        .then( res => {

            dispatch({
                type: GET_ESTADOS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const addESTADO = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'estados/', registro, tokenConfigMultipart(getState))
        .then (res => {

            dispatch({
                type: ADD_ESTADO,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}
export const editEstado = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `estados/${id}`, registro, tokenConfig(getState))
        .then (res => {
            
            dispatch({
                type: EDIT_ESTADO,
                payload: res.data
            })

             
        })
        .catch( err => console.log(err))
}

export const deleteEstado = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `estados/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_ESTADO,
                payload: id
            })
        })
        .catch(err => {
            alert(err.response); 
            console.log(err
        )})
}


