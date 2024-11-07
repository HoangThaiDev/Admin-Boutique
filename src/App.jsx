// Import Modules
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import APIServer from "./API/customAPI";
import { actionUser } from "./redux/actionRedux";
import BoxChat from "./page/BoxChat";

// Import Components
// ------------ Layout --------------
const RootLayout = lazy(() => import("./layout/RootLayout"));

// ------------ Pages --------------
const Login = lazy(() => import("./page/Login"));
const Register = lazy(() => import("./page/Register"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const Orders = lazy(() => import("./page/Orders"));
const Products = lazy(() => import("./page/Products"));
const SettingAccount = lazy(() => import("./page/SettingAccount"));
const Permission = lazy(() => import("./page/Permission"));

// ------------ Components --------------
const Loading = lazy(() => import("./UI/Loading"));
const ModalFormProduct = lazy(() => import("./UI/ModalFormProduct"));
const ModalCheckout = lazy(() => import("./UI/ModalCheckout"));

function App() {
  // Create + use Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // // Create + use variables
  const pathsAuth = ["/login", "/signup"];

  // Sides Effect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await APIServer.admin.getAdmin();
        const { isLoggedIn, accessToken, role } = res.data;

        // If client not logged in => Back to page login
        if (res.status === 200 && !isLoggedIn) return navigate("..");

        // If client was logged in and lost accessToken => update new accessToken
        if (res.status === 201 && isLoggedIn) {
          return dispatch(
            actionUser.save({
              accessToken: accessToken,
              isLoggedIn: isLoggedIn,
              role: role,
            })
          );
        }
      } catch (error) {
        const { data, status } = error.response;

        if (status === 500) {
          alert(data.message);
          return false;
        }

        if (status === 400) {
          alert(data.message);
          navigate("..");
          return false;
        }

        if (status === 401) {
          alert(data.message);
          navigate("..");
          return dispatch(
            actionUser.save({ accessToken: "", isLoggedIn: data.isLoggedIn })
          );
        }
      }
    };

    // Check path not in Page Login & Register
    if (!pathsAuth.includes(location.pathname)) {
      fetchUser();
    }
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <ModalFormProduct />
        <ModalCheckout />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route path="/dashboard" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="history" element={<History />} />
          </Route>
          <Route path="/admin" element={<RootLayout />}>
            <Route path="permission" element={<Permission />} />
            <Route path="setting-accounts" element={<SettingAccount />} />
            <Route path="box-chat" element={<BoxChat />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
