import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import ProdHomeCard from "./ProdHomeCard"
import { fetchProducts } from "../../features/products/productSlice"
import Pagination from "../Pagination"
import PaginationTailwind from "../PaginationTailwind"

function ProductHome() {

    const dispatch = useDispatch()
    const productListConnect = useSelector((state) => state.product.productList)
    const totalCountConnect = useSelector((state) => state.product.totalCount)

    const renderProductList = () => {
        return productListConnect.map((product) => {
            return <ProdHomeCard product={product} />
        })
    }

    // const deleteTodo = (id) => {
    //     Axios.delete("http://localhost:2000/todo/" + id).then((response) => {
    //         fetchData() // refresh data setelah di-delete
    //     })
    // }

    // const inputHandler = (event) => {
    //     setNewTodo(event.target.value)
    // }

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <div className=" h-screen flex flex-col gap-2 mx-auto bg-light p-10">

            <div>
            <h1 className="text-2xl font-bold bg-red">Product Home</h1>
            {/* <input type="text" onChange={inputHandler} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={addTodo}>Add</button> */}
            </div>

            <div className="
            grid grid-cols-3 gap-3
            bg-dark
            p-5 h-full w-full
            items-center
            ">
            {renderProductList()}
            {/* <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      /> */}
      {/* <PaginationTailwind /> */}
<Pagination />
            </div>

        </div>
    )
}

export default ProductHome