import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      className="
flex

       ">
        <div
        className="
        bg-primary
px-8
justify-items-center
w-full
h-screen
        ">
            
       
      <div
        onClick={() => {
          navigate("/");
        }}
        className="
                font-semibold 
                text-5xl 
                text-white 
                hover:cursor-pointer 
                hover:text-light
                py-12
                "
      >
        tokoku
      </div>

      <div
        className="
text-white
font-regular
justify-center
py-10
"
      >
        <p>Hello,</p>
        <p>username</p>
      </div>

      <div className="grid text-white font-extrabold gap-5 py-8 justify-items-start">
        <button
        className="
        hover:text-light
        "
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </button>
        <button
         className="
         hover:text-light
         "
          onClick={() => {
            navigate("/products");
          }}
        >
          Products
        </button>
        <button
         className="
         hover:text-light
         "
          onClick={() => {
            navigate("/categories");
          }}
        >
          Categories
        </button>
        <button
         className="
         hover:text-light
         "
          onClick={() => {
            navigate("/transactions");
          }}
        >
          Transactions
        </button>
      </div>

      <div
      className="
      pt-20
      pb-6
      "
      >
        <button
          className="
    bg-secondary
    text-white
    font-bold
    rounded-full
    py-2
    px-10
    shadow-lg
    hover:scale-105
    transition
    ease-in-out
    delay-50
    "
        >
          LOGOUT
        </button>
      </div>
    </div>

    </div>
  );
}

export default Sidebar;
