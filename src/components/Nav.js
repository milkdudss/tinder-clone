import React from 'react';
import whiteLogo from '../images/white-logo-tinder.png';
import colorLogo from '../images/color-logo-tinder.png';

function Nav({minimal, authToken}) {

  return (
    <nav>
        <div className='logo-container'>
            <img className='logo' src={minimal ? colorLogo : whiteLogo} />

        </div>
        {!authToken && !minimal && <button className='nav-button'>Log in</button>}
    </nav>
  )
}
export default Nav