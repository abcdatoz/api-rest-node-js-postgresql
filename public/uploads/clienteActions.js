import axios from 'axios'
import { tokenConfig, tokenConfigMultipart } from './auth'


export const GET_CLIENTES ='GET_CLIENTES'
export const ADD_CLIENTE ='ADD_CLIENTE'
export const EDIT_CLIENTE ='EDIT_CLIENTE'
export const DELETE_CLIENTE ='DELETE_CLIENTE'

const urlbase ='http://localhost:8080/api/'



export const getClientes = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'clientes/', tokenConfig(getState))
        .then( res => {

            let newArray = res.data.map (item => {

                let url = 'http://localhost:8080/resources/' + item.CLIENTE_image
                let obj = {
                    ...item,
                    url
                }
                return obj
            })

            dispatch({
                type: GET_CLIENTES,
                payload: newArray
            })
        })
        .catch(err => console.log(err))
}

export const addCliente = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'clientes/', registro, tokenConfigMultipart(getState))
        .then (res => {


            dispatch({
                type: ADD_CLIENTE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}
export const editCliente = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `clientes/${id}`, registro, tokenConfig(getState))
        .then (res => {

       

            dispatch({
                type: EDIT_CLIENTE,
                payload: res.data
            })

             
        })
        .catch( err => console.log(err))
}

export const deleteCliente = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `clientes/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_CLIENTE,
                payload: id
            })
        })
        .catch(err => {
            alert(err.response); 
            console.log(err
        )})
}



