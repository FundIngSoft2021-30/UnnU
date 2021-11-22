import React from 'react';
import ReactDOM from 'react-dom';
import Editprofile from '../Pages/perfil/components/editprofile';


const editprofile = (name,edad,email,carrera,facultad, gustos) => {
return name+edad+email+carrera+facultad+gustos
}
const editContrasenaProfile = (email, NuevaContraseña) => {
    return email, NuevaContraseña
    }

describe('Editprofile', () => {
    
    test('EditarPerfilDatosAlejandro21', () => {
        const datos = [
            {name: "Alejandro",edad: "21",email: "aton@yahoo.com" ,carrera:"Sistemas" ,facultad:"Ingeneria" , gustos:"Cafe,Atletismo", Resultado:"Alejandro21aton@yahoo.comSistemasIngeneriaCafeAtletismo"  }
        ]
        const {name,edad,email,carrera,facultad, gustos, Resultado} = datos

        console.assert(
            editprofile(name,edad,email,carrera,facultad, gustos) == Resultado
        )
    });
    test('Cambiar Contraseña', () => {
        const datos = [
            {email: "aton@yahoo.com" ,NuevaContraseña:"ABCDEFGH", ResultadoCorreo:"aton@yahoo.com",ResultadoContraseña:"ABCDEFGH"  }
        ]
        const {email, NuevaContraseña, ResultadoCorreo, ResultadoContraseña} = datos
        
        console.assert(
            editContrasenaProfile(email, NuevaContraseña) == ResultadoCorreo, ResultadoContraseña
        )
    });
    test('Cambiar Contraseña con Caracteres especiales |@#¢∞¬÷“”≠#¢', () => {
        const datos = [
            {email: "aton@yahoo.com" ,NuevaContraseña:"|@#¢∞¬÷“”≠#¢", ResultadoCorreo:"aton@yahoo.com",ResultadoContraseña:"|@#¢∞¬÷“”≠#¢"  }
        ]
        const {email, NuevaContraseña, ResultadoCorreo, ResultadoContraseña} = datos
        
        console.assert(
            editContrasenaProfile(email, NuevaContraseña) == ResultadoCorreo, ResultadoContraseña
        )
    });

    test('Cambiar Contraseña con Caracteres AlfaNumerico x011A1F', () => {
        const datos = [
            {email: "aton@yahoo.com" ,NuevaContraseña:"x011A1F", ResultadoCorreo:"aton@yahoo.com",ResultadoContraseña:"x011A1F"  }
        ]
        const {email, NuevaContraseña, ResultadoCorreo, ResultadoContraseña} = datos
        
        console.assert(
            editContrasenaProfile(email, NuevaContraseña) == ResultadoCorreo, ResultadoContraseña
        )
    });
    

}); // end describe