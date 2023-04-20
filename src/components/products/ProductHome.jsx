import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import prodHomeCard from "./cards/prodHomeCard"
import { fetchProducts } from "../../features/products/productSlice"

function ProductHome() {

    const dispatch = useDispatch()
    const productListConnect = useSelector((state) => state.product.productList)

    const renderProductList = () => {
        return productListConnect.map((product) => {
            return <prodHomeCard product={product} />
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
        <div className="w-1/4 mx-auto">
            <div>
            <h1 className="text-2xl font-bold">Product Home</h1>
            {/* <input type="text" onChange={inputHandler} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={addTodo}>Add</button> */}
            </div>
            <div>
            {renderProductList()}
            </div>
        </div>
    )
}

export default ProductHome