import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import './AuthButtons.css';
import './Footer.css'
import facebook_logo from './img/facebook_logo.png'
import instagram_logo from './img/instagram_logo.png'
import twitter_logo from './img/twitter_logo.png'
import { useState } from 'react';
import SignInPopup from './SignInPopup';
import SignUpPopup from './SignUpPopup';
// import favicon from './img/favicon.png'


const HomePage = (props) => {
const [isPopupOpen, setPopupOpen] = useState(false);
const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);

const openPopup = () => setPopupOpen(true);
const closePopup = () => setPopupOpen(false);

const openSignUpPopup = () => setSignUpPopupOpen(true);
const closeSignUpPopup = () => setSignUpPopupOpen(false);
  return (
    <div className="home-page">

      <header className="hero">
      <div className="auth-container">
      <button className="">Campign</button>
      <button className="">About Us</button>
      <button className="">Contact us</button>
      <button className="signup-button-main" onClick={openSignUpPopup}>Sign Up</button>
      <SignUpPopup isOpen={isSignUpPopupOpen} onClose={closeSignUpPopup} />
      <button className="signin-button" onClick={openPopup}>Sign In</button>
      <SignInPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
    {/* <div className='dropimg'>
      img = {favicon}
    </div> */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Blood Donation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Save lives by donating blood.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="blood-drip-button"
        >
          Donate Now
        </motion.button>
      </header>

      <section className="info-section">
        <motion.div
          className="info-box"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2>Why Donate Blood?</h2>
          <p>
            Every donation can save up to three lives. Donating blood is a simple and selfless way to make a significant impact.
          </p>
        <a href='blank'>learn more </a>
        </motion.div>
        <motion.div
          className="info-box"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2>Eligibility</h2>
          <p>
            Find out if you're eligible to donate blood. Healthy individuals aged 17 and above can donate.
          </p>
        <a href='blank'>learn more </a>
        </motion.div>
        <motion.div
          className="info-box"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2>How to Donate</h2>
          <p>
            Locate the nearest blood donation camp and schedule your donation. It's quick, easy, and rewarding.
          </p>
        <a href='blank'>learn more </a>
        </motion.div>
        
      </section>
      <br></br>

      <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>123 Main Street, City, Country</p>
                    <p>Email: info@example.com</p>
                    <p>Phone: +1234567890</p>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    
                    <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src ={facebook_logo}  alt="Facebook" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={twitter_logo} alt="Twitter" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagram_logo} alt="Instagram" />
                    </a>
                </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </div>
    </footer>

      
    </div>
    
  );
};

export default HomePage;
