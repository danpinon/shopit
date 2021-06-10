import React from 'react'
import '../../App.css'
import { Route } from 'react-router-dom'
import Search from './Search'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions' 

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'

const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out')
    }
    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                    <Link to="/">

                    <img src="/images/shopit_logo.png" alt="Logo shopit" />
                    </Link>
                    </div>
                </div>
                    
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Route render={({history}) => <Search  history={history} />}/>
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none'}}>
                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">2</span>
                    </Link>

                    {user ? (
                        <span className="ml-4">

                        <div className=" dropdown d-inline">
                            <Link 
                            to="#!" 
                            className="btn dropdown-toggle text-white mr-4"
                            id="dropDownMenuButton"
                            data-toggle="dropdown"
                            arial-haspopup="true"
                            arial-expanded="false">
                                <figure className="avatar avatar-nav">
                                    <img 
                                    src={user.avatar ? user.avatar.url : 'images/default_avatar.jpg'}
                                    alt={user && user.name}
                                    className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" arial-labelledby="">
                                {user && user.role !== 'adim'? (
                                    <Link className='dropdown-item' to='/orders/me'>Orders</Link>
                                ) : (
                                    <Link className='dropdown-item' to='/dashboard'>Dashboard</Link>
                                )}
                                <Link className='dropdown-item' to='/me'>Profile</Link>
                                <Link className="dropdown-item text-danger" to='/' onClick={logoutHandler}>
                                    Logout
                                </Link>
                            </div>
                        </div>
                        </span>
                    ) : !loading && <Link to='/Login' className="btn ml-4" id="login_btn">Login</Link>}
                    

                </div>
            </nav>
            
        </>
    )
}

export default Header

