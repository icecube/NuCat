import React, { useState } from "react"

import Header from "./Header"
import Footer from "./Footer"
import MainDataTable from "./MainDataTable";

function Home() {
    return (
        <div>
            <Header />
            <MainDataTable />
            <Footer />
        </div>
    )
};


export default Home