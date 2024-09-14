import React from 'react';
import './SignUpPopup.css';

function SignUpPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="signup-popup-overlay">
            <div className="signup-popup-container">
                <div className="signup-popup-header">
                    <h2>Sign Up</h2>
                    <button className="signup-close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="signup-popup-content">
                    <div className="signup-form">
                        <form>
                            <div className="signup-form-group">
                                <label>First Name:</label>
                                <input type="text" required />
                            </div>
                            <div className="signup-form-group">
                                <label>Last Name:</label>
                                <input type="text" required />
                            </div>
                            <div className="signup-form-group">
                                <label>Email:</label>
                                <input type="email" required />
                            </div>
                            <div className="signup-form-group">
                                <label>Password:</label>
                                <input type="password" required />
                            </div>
                            <button type="submit" className="signup-submit-button">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPopup;
