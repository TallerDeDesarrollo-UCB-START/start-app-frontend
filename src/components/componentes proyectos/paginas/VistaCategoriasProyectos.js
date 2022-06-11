// Componentes:
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import HeaderCategoriasProyectos from '../organismos/HeaderCategoriasProyectos'
import FormularioCrearProyecto from '../moleculas/FormularioCrearProyecto'
import ContenidoCategoriasProyectos from '../organismos/ContenidoCategoriasProyectos'
import { Container } from '@material-ui/core';
// Librerias-Paquetes:
import {useState, useEffect, useRef} from 'react'
import {useHistory} from "react-router-dom";
import RedirectErrorPage from "../../../components/redirect status/RedirectErrorPage";
import SnackbarMessage from "../../../components/templates/SnackbarMessage";
import BadRequests from "../../../components/redirect status/BadRequests";
const useStyles = makeStyles(() => ({
    container: {
        width: '98%',
    },
}));

function VistaCategoriasProyectos() {
    const classes = useStyles();
    const history = useHistory();
    // Hooks:
    const [categorias, setCategorias] = useState([])
    const [lideres, setLideres] = useState([])
    const [mostrarFormCrear, setMostrarFormCrear] = useState(false)
    const mountedRef = useRef(false)
    const activeSnackbar = (message, severity, afterClose) => {
        setSnackbar({ message, severity, afterClose, active: true });
      };
      const [snackbar, setSnackbar] = React.useState({
        message: "",
        active: false,
        severity: "success",
        afterClose:()=>{console.log("despues del mensaje");},
      });
    useEffect(() => {
        mountedRef.current = true
        
        const getCategorias = async () => {
            try{
                const response = await fetch(URLCategorias);
                const data = await response.json()
                mountedRef.current && setCategorias(data)
            } catch (error) {
                const message = BadRequests(404);
                activeSnackbar(
                  "No se pudo encontrar los proyectos. "+message,
                  "error");
            }
        }
        const getLideres = async ()=>{
            try{
                const lideresDelServer = await fetchLideres()
                mountedRef.current && setLideres(lideresDelServer)
            } catch (error) {
                const message = BadRequests(404);
                activeSnackbar(
                    "No se encontraron los proyectos. "+message,
                  "error");
            }
        }
        getCategorias()
        getLideres()

        return () => mountedRef.current = false;// Desmontar componentes evitando warnings
    }, [] )
    // Endpoint fetch
    const crearProyecto = async (nuevoProyecto) => {
        try{
            let formData = new FormData();
            if (nuevoProyecto.image){
                formData.append("photos",nuevoProyecto.image);
            }
            formData.append("titulo",nuevoProyecto.titulo);
            formData.append("descripcion",nuevoProyecto.descripcion);
            formData.append("objetivo",nuevoProyecto.objetivo);
            formData.append("lider",nuevoProyecto.lider);
            formData.append("fecha_inicio",nuevoProyecto.fecha_inicio);
            formData.append("fecha_fin",nuevoProyecto.fecha_fin);
            formData.append("estado",nuevoProyecto.estado);
            formData.append("categoria",nuevoProyecto.categoria);
            formData.append("informacion_adicional",nuevoProyecto.informacion_adicional);
            await fetch(
                URLCrearProy,
                {
                    method: 'POST',
                    body: formData
                }).catch((error)=>{
                    console.log(error);
                    if (error.message == "Failed to fetch")
                        throw new Error("Network Error");
                    throw error;
                })
            }
            catch(error){
                if (error.message == "Network Error"){
                    RedirectErrorPage(500,history,"Hubo un error en la conexión con los datos.")
                    return;
                }
                const message = BadRequests(404);
                activeSnackbar(
                    "No se pudo crear el proyecto. "+message,
                    "error");
                throw error;
            }
    }
    async function fetchLideres() {
        try{
            const response = await fetch(URLLideres);
            const data = await response.json()
            let dataLider=[]
            let index=1
            for (let x of data ) {
                dataLider.push({"id":`${index}`,"nombre":`${x.nombre}`})
                index++
                
            }
            return dataLider;
        }
        catch(error){
            if (error.message == "Network Error"){
                RedirectErrorPage(500,history,"Hubo un error en la conexión con los datos.")
                return;
            }
        }
    }

    // Methods:
    const activarFormCrear = () => {
        setMostrarFormCrear(!mostrarFormCrear);
    }

    // Components:
    const FormularioCrear = mostrarFormCrear===true ? <FormularioCrearProyecto onCrearProy={crearProyecto} onActivarForm={activarFormCrear} mostrarFormCrear={mostrarFormCrear} lideres={lideres} categorias={categorias}/> : <></>

    return (
        <Container className={classes.container}>
            <HeaderCategoriasProyectos  onActivarForm={activarFormCrear}/>
            {FormularioCrear}
            <ContenidoCategoriasProyectos categorias={categorias}/>
            <SnackbarMessage snackbar={snackbar} setActive={setSnackbar} />
        </Container>
    );
}

const url = process.env.REACT_APP_API;
const URLImages = `${url}uploadPhotos`
const URLLideres = `${url}get_lideres`
const URLCategorias = `${url}get_categoria_proyectos`//``http://localhost:5000/get_categorias`//`
const URLCrearProy = `${url}create_proyecto`//'http://localhost:5000/create_proyecto'//

export default VistaCategoriasProyectos;