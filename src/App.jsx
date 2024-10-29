// Import Modules
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import APIServer from "./API/customAPI";
import { actionUser } from "./redux/actionRedux";

// Import Components
// ------------ Layout --------------
const RootLayout = lazy(() => import("./layout/RootLayout"));

// ------------ Pages --------------
const Login = lazy(() => import("./page/Login"));
const Register = lazy(() => import("./page/Register"));
const Dashboard = lazy(() => import("./page/Dashboard"));

// ------------ Components --------------
const Loading = lazy(() => import("./UI/Loading"));

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
        const { isLoggedIn, accessToken } = res.data;

        // If client not logged in => keep going
        if (res.status === 200 && !isLoggedIn) return;

        // If client was logged in and lost accessToken => update new accessToken
        if (res.status === 201 && isLoggedIn) {
          return dispatch(
            actionUser.save({
              accessToken: accessToken,
              isLoggedIn: isLoggedIn,
            })
          );
        }
      } catch (error) {
        const { data, status } = error.response;

        if (status === 500) {
          alert(data.message);
          return false;
        }

        if (status === 401) {
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
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route path="/dashboard" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
