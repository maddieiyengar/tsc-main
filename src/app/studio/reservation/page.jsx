import React from 'react';

const StudioReservation = () => {
    const linkStyle = {
        color: 'blue',
        textDecoration: 'underline'
    };

    return (
        <div>
            <a 
                href="https://services2.juniata.edu/cts/simplified-studio/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={linkStyle}
            >
                Visit Studio Reservations
            </a>
        </div>
    );
};

export default StudioReservation;


