import { FaBolt } from "react-icons/fa";

const Nav = () => {
    return (
        <nav className="nav">
            <a href="https://www.stephenpearson.dev" className="nav-link">
                stephenpearson.dev
            </a>
            <div className="nav-title-container">
                <h1 className="nav-title">Lightning Sudoku</h1>
                <FaBolt className="nav-icon" />
            </div>
        </nav>
    );
};

export default Nav;
