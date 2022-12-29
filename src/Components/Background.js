import { async } from '@firebase/util';
import React, { useState, useRef, useEffect } from 'react';

const Background = (props) => {
    const [display, setDisplay] = useState('none');
    const [xyPos, setXYPos] = useState([]);
    const [xyRel, setXYRel] = useState([]);
    const [popUp, setPopUp] = useState({
        visibility: 'hidden',
        backgroundColor: '',
        text: '',
    });

    const imgRef = useRef();

    useEffect(() => {
        if (popUp.visibility !== 'hidden') {
            setTimeout(() => {
                setPopUp({
                    visibility: 'hidden',
                    backgroundColor: '',
                    text: '',
                });
              }, "2000")
        }
      }, [popUp]);
  
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

        // get relative coordinates with current screen height/width in %
        let xRel = x / width * 100;
        let yRel = (y - headerHeight) / height * 100;
        setXYRel([xRel, yRel]);

        // set mouse coordinates
        setXYPos([x+'px', y+'px']);
    }

    const checkForPoke = async (poke) => {
        // await coordinates
        let coordinates = await props.checkLocation(poke);

        // get absolute value
        let xAbs = Math.abs(xyRel[0] - coordinates[0]);
        let yAbs = Math.abs(xyRel[1] - coordinates[1]);

        if (xAbs < 1 && yAbs < 1) {
            props.catchedPoke();
            props.displayPoke(poke);
            togglePopUp(true);
        } else {
            togglePopUp(false);
        }
    }

    const togglePopUp = (bool) => {
        if (bool) {
            return setPopUp({
                visibility: 'visible',
                backgroundColor: 'Green',
                text: 'Great job!',
            });
        }
        setPopUp({
            visibility: 'visible',
            backgroundColor: 'Red',
            text: 'Wrong, try again!',
        });
    }

    return (
        <div className='background'>
            <div className='backgroundPhoto'>
                <img src={props.photo} alt='pokemon' ref={imgRef} className='photo' onClick={getPos} ></img>
            </div>
            <div className='clickSquare' style={{ left: xyPos[0], top: xyPos[1], display: display}}></div>
            <div className='pokeList' style={{ left: xyPos[0], top: xyPos[1], display: display}}>
                <ul>
                    <button onClick={() => {checkForPoke('Squirtle')}} style={{display: props.pokeLeft.Squirtle ? 'block' : 'none' }}>Squirtle</button>
                    <button onClick={() => {checkForPoke('Smeargle')}} style={{display: props.pokeLeft.Smeargle ? 'block' : 'none' }}>Smeargle</button>
                    <button onClick={() => {checkForPoke('Kabuto')}} style={{display: props.pokeLeft.Kabuto ? 'block' : 'none' }}>Kabuto</button>
                </ul>
            </div>
            <div className='popUp' style={{ backgroundColor: popUp.backgroundColor, visibility: popUp.display}}>{popUp.text}</div>
        </div>
    );
    };
            
    export default Background;