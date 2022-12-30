import Squirtle from './Images/Squirtle.png'
import Smeargle from './Images/Smeargle.png'
import Kabuto from './Images/Kabuto.png'


const Header = (props) => {

return (
    <div className='header'>
        <div className='header-username'>Name: {props.username}</div>
        <div className="header-images">
            <img src={Squirtle} alt="Squirtle" style={{opacity: props.pokeLeft.Squirtle ? '1' : '0.2' }}></img>
            <img src={Smeargle} alt="Smeargle" style={{opacity: props.pokeLeft.Smeargle ? '1' : '0.2' }}></img>
            <img src={Kabuto} alt="Kabuto" style={{opacity: props.pokeLeft.Kabuto ? '1' : '0.2' }}></img>
        </div>
        <div className="header-timer">Timer: {props.counter}s</div>
        <div className="header-pokemons-left">Pokemons left: {props.numPoke}</div>

    </div>
);
};
        
export default Header;