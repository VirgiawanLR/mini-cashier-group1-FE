import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import ProdHomeCard from "./ProdHomeCard"
import { getProducts, fetchProducts } from "../../features/products/productSlice"
import Pagination from "../Pagination"

function ProductHome() {

    const dispatch = useDispatch()
    const allProductList = useSelector((state) => state.product.allProductList)
    const selectProductList = useSelector((state) => state.product.allProductList)

    const renderProductList = () => {
        return allProductList.map((product) => {
            return <ProdHomeCard product={product} />
        })
    }

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    useEffect(() => {
        dispatch(fetchProducts())
    }, [selectProductList])


    return (
        <div className=" h-screen flex flex-col gap-2 mx-auto bg-light p-10">

            <div>
            <h1 className="text-2xl font-bold bg-red">Product Home</h1>
            {/* <input type="text" onChange={inputHandler} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={addTodo}>Add</button> */}
            </div>

{/* cards & pagination */}
<div className="flex flex-col">

<div className="
            grid grid-cols-3 gap-3
            bg-dark
            p-5 h-full w-full
            items-center
            ">
            {renderProductList()}
</div>
<div>
<Pagination />
</div>

            </div>

        </div>
    )
}

export default ProductHome