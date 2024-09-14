import React from 'react';
import './SignInPopup.css';

function SignInPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h2>Sign In</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="popup-content">
                    <div className="signup-option">
                        <h3>Don't have an account?</h3>
                        <button className="signup-button">Sign Up</button>
                    </div>
                    <div className="signin-form">
                        <form>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" required />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" required />
                            </div>
                            <button type="submit" className="signin-button">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPopup;
