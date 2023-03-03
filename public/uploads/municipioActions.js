import axios from 'axios'
import { tokenConfig, tokenConfigMultipart } from './auth'

export const GET_MUNICIPIOS ='GET_MUNICIPIOS'
export const ADD_MUNICIPIO ='ADD_MUNICIPIO'
export const EDIT_MUNICIPIO ='EDIT_MUNICIPIO'
export const DELETE_MUNICIPIO ='DELETE_MUNICIPIO'

const urlbase ='http://localhost:8080/api/'



export const getMunicipios = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'municipios/', tokenConfig(getState))
        .then( res => {

            dispatch({
                type: GET_MUNICIPIOS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const addMunicipio = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'municipios/', registro, tokenConfigMultipart(getState))
        .then (res => {

            dispatch({
                type: ADD_MUNICIPIO,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}
export const editMunicipio = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `municipios/${id}`, registro, tokenConfig(getState))
        .then (res => {
            
            dispatch({
                type: EDIT_MUNICIPIO,
                payload: res.data
            })

             
        })
        .catch( err => console.log(err))
}

export const deleteMunicipio = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `municipios/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_MUNICIPIO,
                payload: id
            })
        })
        .catch(err => {
            alert(err.response); 
            console.log(err
        )})
}


