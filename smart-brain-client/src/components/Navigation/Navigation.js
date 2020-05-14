import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f4 link dim black underline pa3 pointer' onClick={() => onRouteChange('SignIn')}>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span className='f4 link dim black underline pa3 pointer' onClick={() => onRouteChange('SignIn')}>Sign In</span>
        <span className='f4 link dim black underline pa3 pointer' onClick={() => onRouteChange('Register')}>Register</span>
      </nav>
    );
  }
}

export default Navigation;
