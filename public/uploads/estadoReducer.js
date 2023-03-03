import {GET_ESTADOS,ADD_ESTADO,EDIT_ESTADO,DELETE_ESTADO } from '../actions/estadoActions'
import {GET_MUNICIPIOS,ADD_MUNICIPIO,EDIT_MUNICIPIO,DELETE_MUNICIPIO } from '../actions/municipioActions'
import {GET_CLIENTES,ADD_CLIENTE,EDIT_CLIENTE,DELETE_CLIENTE } from '../actions/clienteActions'
import {GET_CLIENTES_DATOS_GENERALES,ADD_CLIENTE_DATOS_GENERALES,EDIT_CLIENTE_DATOS_GENERALES,DELETE_CLIENTE_DATOS_GENERALES } from '../actions/clienteDatosGeneralesActions'
import {GET_CLIENTES_DATOS_ENTREGAS,ADD_CLIENTE_DATOS_ENTREGAS,EDIT_CLIENTE_DATOS_ENTREGAS,DELETE_CLIENTE_DATOS_ENTREGAS } from '../actions/clienteDatosEntregasActions'

const initialState = {
    lista:[],
    mode: '',
    idBug:''
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ESTADOS:
            return{
                ...state,
                lista: action.payload
            }
        case ADD_ESTADO:
            return{
                ...state,
                lista: [...state.lista, action.payload]
            }
        case EDIT_ESTADO:
            console.log (action.payload)
            return {
                ...state,
                lista: [...state.lista.filter(item=> item.id !== action.payload.id), action.payload]
            }
        case DELETE_ESTADO:
            return{
                ...state,
                lista: state.lista.filter(item=>item.id !== action.payload)
            }
        
        default:
            return state        
    }
}