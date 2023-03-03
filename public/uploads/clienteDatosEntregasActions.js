import axios from 'axios'
import { tokenConfig, tokenConfigMultipart } from './auth'

export const GET_CLIENTES_DATOS_ENTREGAS ='GET_CLIENTES_DATOS_ENTREGAS'
export const ADD_CLIENTE_DATOS_ENTREGAS ='ADD_CLIENTE_DATOS_ENTREGAS'
export const EDIT_CLIENTE_DATOS_ENTREGAS ='EDIT_CLIENTE_DATOS_ENTREGAS'
export const DELETE_CLIENTE_DATOS_ENTREGAS ='DELETE_CLIENTE_DATOS_ENTREGAS'

const urlbase ='http://localhost:8080/api/'



export const getClienteDatosEntregas = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'clientesDatosEntregas/', tokenConfig(getState))
        .then( res => {

            dispatch({
                type: GET_CLIENTES_DATOS_ENTREGAS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const addClienteDatosEntregas = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'clientesDatosEntregas/', registro, tokenConfigMultipart(getState))
        .then (res => {

            dispatch({
                type: ADD_CLIENTE_DATOS_ENTREGAS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}
export const editClienteDatosEntregas = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `clientesDatosEntregas/${id}`, registro, tokenConfig(getState))
        .then (res => {
            
            dispatch({
                type: EDIT_CLIENTE_DATOS_ENTREGAS,
                payload: res.data
            })

             
        })
        .catch( err => console.log(err))
}

export const deleteClienteDatosEntregas = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `clientesDatosEntregas/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_CLIENTE_DATOS_ENTREGAS,
                payload: id
            })
        })
        .catch(err => {
            alert(err.response); 
            console.log(err
        )})
}


