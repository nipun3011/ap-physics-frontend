import React from 'react'
import PersonIcon from '@mui/icons-material/PersonRounded';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
            <h1 className="title">AP Physics</h1>
            <button style={{backgroundColor: 'transparent', border: '0', cursor: 'pointer'}}><PersonIcon fontSize='large'/></button>
        </div>
    )
}

export default Navbar;