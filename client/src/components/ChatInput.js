import React, { useState } from 'react';

const ChatInput = () => {
    const [textArea, setTextArea] = useState(null);

    return (
        <div className="bottom-fix">
            <div className="chat-input">
                <textarea value="" 
                    onChange={e => setTextArea(e.target.value)}
                />
                <button className="secondary-button">Submit</button>
            </div>
        </div>
    )
}

export default ChatInput