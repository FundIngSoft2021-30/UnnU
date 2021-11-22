import React from 'react';
import ReactDOM from 'react-dom';
import { crearEvento } from '../DB/firebase';
import Calendario from '../Pages/calendario/components/calendariosc';

const crearEventoC = ( Hora, Fecha, Titulo ) => {
    return Hora+Fecha+Titulo
}

describe('Calendario', () => {
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Calendario />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('Crear Evento en Calendar', () => {
        const evento = [
            {Hora: 1000, Fecha:18/11/21, Titulo:"Hackaton",  Resultado:"100018/11/21Hackaton" },
            {Fecha:18/11/21, Titulo:"San Francisco Dia", Resultado:"18/11/21San Francisco Dia" },
        ]
        const {Hora, Fecha, Titulo, Resultado } = evento;
        
        console.assert(
            crearEventoC(Hora, Fecha, Titulo) == Resultado
        )
        
    });
}); // end describe