const Header = (props) => {

return (
    <div className='header'>
        <div className="header-images">
            <img alt="pokemon1"></img>
            <img alt="pokemon2"></img>
            <img alt="pokemon3"></img>
        </div>
        <div className="header-timer">Timer</div>
        <div className="header-pokemons-left">Pokemons left: 3</div>

    </div>
);
};
        
export default Header;