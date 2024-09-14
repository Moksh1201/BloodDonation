import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store';
import HomePage from './components/Home';
import BloodDonationList from './components/BloodDonationList';
import WhyDonate from './components/WhyDonate';
import Recipients from './components/Recipients';
import Donor from './components/Donors';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/BloodDonation/users" element={<BloodDonationList />} />
        <Route path="/whyDonate" element={<WhyDonate />}/>
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/Donors-list" element={<Donor />} />


      </Routes>
    </Router>
  </Provider>
);
