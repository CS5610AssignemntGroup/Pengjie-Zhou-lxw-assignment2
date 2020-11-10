import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Rules from '../rules/Rules';
import Home from '../home/Home';
import Board from '../grid/Board';

class NavbarReact extends React.Component {
    render() {
        return (
            <>
                <Router>
                    <div>
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="#home">
                                Conwey Game
                            </Navbar.Brand>
                            <Nav className="mr-auto">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                                <Link className="nav-link" to="/game">
                                    Game
                                </Link>
                                <Link className="nav-link" to="/rule">
                                    Rule
                                </Link>
                            </Nav>
                        </Navbar>
                        <Switch>
                            <Route path="/game">
                                <Board />
                            </Route>
                            <Route path="/rule">
                                <Rules />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </>
        );
    }
}

export default NavbarReact;
