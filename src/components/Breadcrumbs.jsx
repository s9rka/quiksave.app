import React from 'react'
import '../css/Breadcrumbs.scss';
import { HashLink as Link } from 'react-router-hash-link';

function Breadcrumbs() {
  return (
    <div className="breadcrumb-container">
        <div className="first-point">
            <Link to="/#start" class="button-breadcrumb">I</Link>
        </div>
        <div className="second-point">
            <Link to="/#source" class="button-breadcrumb">II</Link> 
        </div>
        <div className="third-point">
            <Link to="/#proov" class="button-breadcrumb">III</Link>
        </div>
    </div>
  )
}

export default Breadcrumbs;