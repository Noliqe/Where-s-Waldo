import Squirtle from './Images/Squirtle.png'
import Smeargle from './Images/Smeargle.png'
import Ekans from './Images/Ekans.png'


const Header = (props) => {

return (
    <div className='header'>
        <div className="header-images">
            <img src={Squirtle} alt="Squirtle"></img>
            <img src={Smeargle} alt="Smeargle"></img>
            <img src={Ekans} alt="Ekans"></img>
        </div>
        <div className="header-timer">Timer</div>
        <div className="header-pokemons-left">Pokemons left: 3</div>

    </div>
);
};
        
export default Header;