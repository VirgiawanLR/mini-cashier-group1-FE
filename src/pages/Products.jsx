import { render } from "@testing-library/react"
import '../index.css'
import Cart from "../components/cart/Cart"
import Sidebar from "../components/Sidebar"
import ProductProducts from "../components/products/ProductProducts"

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
            <ProductProducts />
        </div>
        <div className="w-1/4">
        <Cart />
        </div>
    </div>
    )
}

export default Home
