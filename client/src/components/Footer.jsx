import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/components/footer.scss'

function Footer() {
    return (
        <div className="copyright">
            <p>ScholarDoor© 2021 All rights reserved <Link to="/private-policy" className="private-policy">Private Policy</Link></p>
        </div>
    )
}

export default Footer;
