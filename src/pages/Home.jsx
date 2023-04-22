import { render } from "@testing-library/react"
import { useState } from "react"
import '../index.css'
import Cart from "../components/cart/Cart"
import Sidebar from "../components/Sidebar"
import ProductHome from "../components/products/ProductHome"

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
            <ProductHome />
        </div>
        <div className="w-1/4">
        <Cart />
        </div>
    </div>
    )
}

export default Home
