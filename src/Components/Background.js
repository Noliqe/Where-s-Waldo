import React, { useState, useRef } from 'react';

const Background = (props) => {
    const [display, setDisplay] = useState('none');
    const [xpos, setXPos] = useState('10px');
    const [ypos, setYPos] = useState('10px');

    const imgRef = useRef();
  
    const getPos = (e) => {
        if (display === 'none') {
            setDisplay('block');
        } else {
            setDisplay('none');
        }
        // get current screensizes
        const width = imgRef.current.offsetWidth;
        const height = imgRef.current.offsetHeight;
        // get header height
        let headerHeight = document.querySelector('.header').offsetHeight;

        let x = e.clientX;
        // window.pageYOffset when user scrolls down
        let y = e.clientY + window.pageYOffset;

        let xRel = x / width * 100;
        let yRel = (y - headerHeight) / height * 100;
        setXPos(x+'px');
        setYPos(y+'px');

        console.log('x ' + x + ' xRel ' + xRel)

    }


    return (
        <div className='background'>
            <div className='backgroundPhoto'>
                <img src={props.photo} alt='pokemon' ref={imgRef} className='photo' onClick={getPos} ></img>
            </div>
            <div className='clickSquare' style={{ left: xpos, top: ypos, display: display}}></div>
            <div className='pokeList' style={{ left: xpos, top: ypos, display: display}}>
                <ul>
                    <button>Squirtle</button>
                    <button>Smeargle</button>
                    <button>Ekans</button>
                </ul>
            </div>
        </div>
    );
    };
            
    export default Background;