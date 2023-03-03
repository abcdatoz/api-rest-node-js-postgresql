import axios from 'axios'
import { tokenConfig, tokenConfigMultipart } from './auth'

export const GET_CLIENTES_DATOS_GENERALES ='GET_CLIENTES_DATOS_GENERALES'
export const ADD_CLIENTE_DATOS_GENERALES ='ADD_CLIENTE_DATOS_GENERALES'
export const EDIT_CLIENTE_DATOS_GENERALES ='EDIT_CLIENTE_DATOS_GENERALES'
export const DELETE_CLIENTE_DATOS_GENERALES ='DELETE_CLIENTE_DATOS_GENERALES'

const urlbase ='http://localhost:8080/api/'



export const getClienteDatosGenerales = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'clientesDatosGenerales/', tokenConfig(getState))
        .then( res => {

            dispatch({
                type: GET_CLIENTES_DATOS_GENERALES,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const addClienteDatosGenerales = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'clientesDatosGenerales/', registro, tokenConfigMultipart(getState))
        .then (res => {

            dispatch({
                type: ADD_CLIENTE_DATOS_GENERALES,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}
export const editClienteDatosGenerales = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `clientesDatosGenerales/${id}`, registro, tokenConfig(getState))
        .then (res => {
            
            dispatch({
                type: EDIT_CLIENTE_DATOS_GENERALES,
                payload: res.data
            })

             
        })
        .catch( err => console.log(err))
}

export const deleteClienteDatosGenerales = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `clientesDatosGenerales/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_CLIENTE_DATOS_GENERALES,
                payload: id
            })
        })
        .catch(err => {
            alert(err.response); 
            console.log(err
        )})
}


