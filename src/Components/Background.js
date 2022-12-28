import React, { useState } from 'react';

const Background = (props) => {
    const [display, setDisplay] = useState('none');
    const [xpos, setXPos] = useState('10px');
    const [ypos, setYPos] = useState('10px');
  
    const getPos = (e) => {
        if (display === 'none') {
            setDisplay('block');
        } else {
            setDisplay('none');
        }
      let x = e.clientX;
      // window.pageYOffset when user scrolls down
      let y = e.clientY + window.pageYOffset;
      setXPos(x+'px');
      setYPos(y+'px');
    }


    return (
        <div className='background'>
            <div className='backgroundPhoto' >
                <img src={props.photo} alt='pokemon' className='photo' onClick={getPos} ></img>
            </div>
            <div className='clickSquare' style={{ left: xpos, top: ypos, display: display}}></div>
            <div className='pokeList' style={{ left: xpos, top: ypos, display: display}}>
                <ul>
                    <button>Squaryle</button>
                    <button>Smeargle</button>
                    <button>Ekans</button>
                </ul>
            </div>
        </div>
    );
    };
            
    export default Background;