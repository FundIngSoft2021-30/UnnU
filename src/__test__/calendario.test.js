import React from 'react';
import ReactDOM from 'react-dom';
import Calendario from '../Pages/calendario/components/calendariosc';

describe('Calendario', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Calendario />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
}); // end describe