import { render } from "@testing-library/react"
import { useState } from "react"
import '../index.css'
import Cart from "../components/Cart"
import Sidebar from "../components/Sidebar"
import Middle from "../components/Middle"

function Home() {

    return (
    <div
    className="
 flex
    ">
        <div className="w-1/6">
            <Sidebar />
        </div>
        <div className="w-7/12">
            <Middle />
        </div>
        <div className="w-1/4">
        <Cart />
        </div>
    </div>
    )
}

export default Home
