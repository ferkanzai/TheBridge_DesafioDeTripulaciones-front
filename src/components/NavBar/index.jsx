import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/login'>Iniciar sesión</Link>
      <Link to='/signup'>Registrarme</Link>
      <Link to='/profile'>Perfil</Link>
      <Link to='/map'>Mapa</Link>
    </nav>
  );
};

export default NavBar;