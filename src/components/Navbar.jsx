import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { Link, NavLink, } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../redux/features/basketSlice";
import { setUserData } from "../redux/features/basketSlice";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const mode = useSelector((state) => state.basket.mode);
  const userData = useSelector((state) => state.basket.userData);
  const numItemsInCart = useSelector((state) => state.basket.numItemsInCart)
  // console.log(numItemsInCart)

  const handleMode = () => {
    dispatch(toggleMode())
  }

  const handleLogOut = () => {
    dispatch(setUserData(null));
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <nav className="bg-base-200 dark:bg-[#F0F6FF]">
      <div className="bg-neutral text-neutral-content">
        {!userData && (
          <div className="max-w-6xl px-5 py-2 mx-auto flex gap-5 justify-end top">
            <Link to={"/login"} className="link link-hover text-xc sm:text-sm">
              Login / Guest
            </Link>
            <Link
              to={"/register"}
              className="link link-hover text-xc sm:text-sm"
            >
              Create Account
            </Link>
          </div>
        )}
        {userData && (
          <div className="max-w-6xl px-5 py-2 mx-auto flex gap-5 justify-end top">
            <button
              onClick={handleLogOut}
              className="btn btn-sm btn-error"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
      <div className="align-element pt-2 pb-2 flex items-center justify-between">
        <Link
          aria-current="page"
          className="hidden lg:flex btn btn-info text-3xl items-center"
          to="/">
          C
        </Link>

        <div className="flex gap-7 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/chekout">Chekout</NavLink>
          <NavLink to="/orders">Orders</NavLink>
        </div>

        <div className="flex items-center">
          <button onClick={handleMode} className="dark:text-white">
            {mode == 'dark' ? <BsSunFill /> : <BsMoonFill />}
          </button>
          <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator w-[20px]">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar