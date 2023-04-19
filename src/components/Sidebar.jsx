import { useNavigate } from "react-router-dom"

function Sidebar() {

    const navigate = useNavigate()

    return (
        <div className="
grid
grid-cols-1
bg-primary
gap-14
py-10
px-8
justify-items-center
w-60
h-screen

       ">

            <div
                onClick={() => { navigate("/") }}
                className="
                font-semibold 
                text-5xl 
                text-white 
                hover:cursor-pointer 
                hover:text-dark
                "
            >tokoku</div>

<div className="
text-white
font-regular
justify-center
">
    <p>Hello,</p>
    <p>username</p>
</div>

            <div className="grid text-white font-extrabold gap-5 justify-items-start">
                <button onClick={() => { navigate("/home") }}>Home</button>
                <button onClick={() => { navigate("/products") }}>Products</button>
                <button onClick={() => { navigate("/categories") }}>Categories</button>
                <button onClick={() => { navigate("/transactions") }}>Transactions</button>
            </div >

<div>
    <button
    className="
    bg-secondary
    text-white
    font-bold
    rounded-full
    py-2
    px-10
    shadow-lg
    "
    >LOGOUT</button>
</div>

        </div >
    )
}

export default Sidebar