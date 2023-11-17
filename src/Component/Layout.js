import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";


const Header = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light header">
                <Link to="/" id="heading">REDUX BLOG</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav" >
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/post">Form</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/users">Users</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header;