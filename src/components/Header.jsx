import React from "react"
import HomeIcon from '@material-ui/icons/Home';
function Header() {
    return <header>

        <img src="/images/ice-cube-logo.png" width="520" height="137" alt="Logo" class="rounded mx-auto d-block" />
        <div>
            <h1><HomeIcon color="action" /> NuCat </h1>
        </div>

    </header>
}

export default Header