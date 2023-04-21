import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import ProdHomeCard from "./ProdHomeCard"
import { fetchProducts } from "../../features/products/productSlice"

function ProductHome() {

    const dispatch = useDispatch()
    const productListConnect = useSelector((state) => state.product.productList)

    const renderProductList = () => {
        return productListConnect.map((product) => {
            return <ProdHomeCard product={product} />
        })
    }

        // component didMount
        // useEffect(() => {
        //     dispatch(fetchProducts())
        //  }, [])

    // const productData = useSelector((state) => state.product.productData)
  // useState -> dummy data
//   const [prodDetail, setProdDetail] = useState([
 
// ])

    // const [todoList, setTodoList] = useState([])
    // const [newTodo, setNewTodo] = useState("")

    // const fetchProduct = () => {
    //     Axios.get("http://localhost:2000/todo").then((response) => {
    //         console.log(response.data)
    //         setTodoList(response.data)
    //     })
    // }



    // const renderList = () => {
    //     return productList.map((product) => {
    //         return (
    //             <prodHomeCard product={productListConnect} />
    //             // <div className="p-4">
    //             //     <p>{product.productName}</p>
    //             //     <p>{product.productPrice}</p>
    //             // </div>
    //         )
            
    //     })
    // }

    // const deleteTodo = (id) => {
    //     Axios.delete("http://localhost:2000/todo/" + id).then((response) => {
    //         fetchData() // refresh data setelah di-delete
    //     })
    // }

    // const inputHandler = (event) => {
    //     setNewTodo(event.target.value)
    // }

    // const addTodo = async () => {
    //     try {
    //         await Axios.post("http://localhost:2000/todo", { activity: newTodo })
    //         fetchData()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }



    return (
        <div className=" h-screen flex flex-col gap-2 mx-auto bg-green-400 p-10">

            <div>
            <h1 className="text-2xl font-bold bg-red">Product Home</h1>
            {/* <input type="text" onChange={inputHandler} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={addTodo}>Add</button> */}
            </div>

            <div className="
            grid grid-cols-3 gap-3
            bg-green-200
            p-5
            items-center
            h-max w-full
            ">
            {renderProductList()}
            </div>

        </div>
    )
}

export default ProductHome