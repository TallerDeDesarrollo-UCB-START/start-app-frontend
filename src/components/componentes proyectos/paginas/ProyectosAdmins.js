// Componentes:
import HeaderProyectosAdmin from '../organismos/HeaderProyectosAdmin'
import BodyProyectos from '../organismos/BodyProyectos'
import FormularioCrearProyecto from '../moleculas/FormularioCrearProyecto'
import FormularioEditarProyecto from '../moleculas/FormularioEditarProyecto'
import SelectFiltroCategoria from '../atomos/SelectFiltroCategoria'
// Librerias-Paquetes:
import {useState} from 'react'
import { Box } from '@material-ui/core';


function ProyectosAdmins({proyectos, rol, onCrearProy, onEliminarProy, onPartiparProy, onEditarProy, onGetParticipacion, onCancelarParticipacion, onFiltroProy}) {
    // Hooks
    const [mostrarFormCrear, setMostrarFormCrear] = useState(false)
    const [mostrarFormEditar, setMostrarFormEditar] = useState(false)
    const [proyectoEditar, setProyectoEditar] = useState({})

    // Funciones
    const activarFormCrear = () => {
        setMostrarFormCrear(!mostrarFormCrear);
    }

    const activarFormEditar = (proyecto) => {
        setProyectoEditar(proyecto)
        setMostrarFormEditar(!mostrarFormEditar);
    }

    //Componentes
    const FormularioCrear = mostrarFormCrear===true ? <FormularioCrearProyecto onCrearProy={onCrearProy} onActivarForm={activarFormCrear}/> : <></>
    const FormularioEditar = mostrarFormEditar===true ? <FormularioEditarProyecto onEditarProy={onEditarProy} onActivarForm={activarFormEditar} proyecto={proyectoEditar}/> : <></>

    return (
        <Box style={styles}>
            <HeaderProyectosAdmin onActivarForm={activarFormCrear}/>
            {FormularioCrear}
            {FormularioEditar}
            <SelectFiltroCategoria onFiltroProy={onFiltroProy}/>
            <BodyProyectos rol={rol}
                            proyectos={proyectos} 
                            onEliminarProy={onEliminarProy} 
                            onActivarForm={activarFormEditar}
                            onPartiparProy={onPartiparProy}
                            onGetParticipacion={onGetParticipacion}
                            onCancelarParticipacion={onCancelarParticipacion}/>
        </Box>
    );
}

const styles= {
    minHeight: "650px"
    //border: "4px solid orange"
}

export default ProyectosAdmins