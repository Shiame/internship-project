import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--navbar'];
const SIZES = ['btn--medium', 'btn--large', 'btn--larger'];

export const Button = ({ children, type, onClick, buttonStyle, buttonSize, path ='/' }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    // Check if the path is an external link
    const isExternal = path.startsWith('http');

    return (
        <>
            {isExternal ? (
                <a href={path} className={`btn ${checkButtonStyle} ${checkButtonSize}`} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            ) : (
                <Link to={path} className='btn-mobile'>
                    <button
                        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                        onClick={onClick}
                        type={type}
                    >
                        {children}
                    </button>
                </Link>
            )}
        </>
    );
};
