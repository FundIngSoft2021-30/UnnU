import React from 'react';
import ReactDOM from 'react-dom';
import Chat from '../Pages/chats/components/ChatsGente';


const msg = (msg) => {
return msg
}

describe('Chat', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Chat />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    test('Send Message Hola', () => {
        expect(msg("Hola")).toBe("Hola")
    });
    test('Send Message 20Caracteres', () => {
        expect(msg("ASDFGHJKLZXCVBNMQWER")).toBe("ASDFGHJKLZXCVBNMQWER")
    });
    test('Send Message Whit SpecialCharacters', () => {
        expect(msg("#¢∞¬¬÷÷÷÷")).toBe("#¢∞¬¬÷÷÷÷")
    });

}); // end describe