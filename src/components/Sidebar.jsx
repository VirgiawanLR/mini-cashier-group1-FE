import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setResetLoggedUser } from "../features/users/userSlice";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutBtnHandler = async () => {
    localStorage.removeItem("user_token");
    dispatch(setResetLoggedUser());
    navigate("/login");
  };

  return (
    <div
      className="
flex

       "
    >
      <div className="bg-primary px-8 w-full h-screen">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="
                font-semibold 
                text-5xl 
                tracking-tightest
                text-white 
                hover:cursor-pointer 
                hover:text-light
                py-12
                text-center
                "
        >
          tokoku
        </div>
        <div
          className="text-white font-regular 
          text-center py-10"
        >
          <p>Hello,</p>
          <p>username</p>
        </div>

        <div className="grid text-white font-extrabold gap-5 py-4 px-5 justify-items-start">
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
          <button
            className="
         hover:text-light
         "
            onClick={() => {
              navigate("/analytics");
            }}
          >
            Analytics
          </button>
        </div>

        <div
          className="
      pt-20 pb-6
      flex flex-col items-center
      "
        >
          <button
            onClick={() => {
              logoutBtnHandler();
            }}
            className="
    bg-secondary
    text-white font-bold
    rounded-full
    py-2 px-10
    fixed bottom-0 mb-16
    shadow-lg
    hover:scale-105
    transition ease-in-out delay-50
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
