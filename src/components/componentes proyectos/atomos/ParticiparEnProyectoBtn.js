// Componentes:
import './ParticiparEnProyectoBtn.css';
// Librerias-Paquetes:
import React from "react";
import { Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


function ParticiparEnProyectoBtn( {proyecto,  onPartiparProy, onAsignarSnackbarStatus, onAsignarParticipacion}) {

    // States
    //const [snackbar, setSnackbar] = React.useState(false)

    /*useEffect(function () {
        onAsignarParticipacion()
    }, [snackbar, participacion])*/


    const onClick = async (event) => {
        //debugger
        const participarResponse = await onPartiparProy(proyecto.id)
        //console.log(participarResponse)
        if(participarResponse){
            
            onAsignarParticipacion();
            onAsignarSnackbarStatus("Participacion exitosa", true, true);
        }else{
            onAsignarParticipacion();
            onAsignarSnackbarStatus("Participacion fallida", true, false);
        }
    }

    return (
        <div>
            <div id={proyecto.id}>
                <ParticipateButton variant="contained" color="secondary"
                onClick={onClick}
                >
                    Participar
                </ParticipateButton>
            </div>
        </div>
    );
}

const ParticipateButton = withStyles((theme) => ({
    root: {
        color: "#FFFFFF",
    },
}))(Button);

export default ParticiparEnProyectoBtn