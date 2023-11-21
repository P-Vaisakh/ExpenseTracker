import { Route, Routes, useNavigate } from "react-router-dom";
import NavMegaMenu from "./Components/Header";
import Landing from "./Pages/Landing";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLoginState } from "./Redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Home from "./Pages/Home";
import Login from "./Pages/Auth";
import { fetchItems } from "./Redux/itemsSlice";
import ChartDisplay from "./Pages/ChartDisplay";


export default function App() {
  const { user } = useSelector((state) => state.user);
  const { uid } = useSelector((state) => state.user.user);
  const items = useSelector((state) => state.itemsSlice.data);

  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(fetchItems(uid));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      const { displayName, uid } = userAuth;
      let obj = { displayName, uid };
      dispatch(updateLoginState(obj));
    });
    getData();
  }, [uid]);

  return (
    <>
      {uid !== "" && <NavMegaMenu />}
      <Routes>
        <Route
          path="/"
          element={uid == "" ? <Landing></Landing> : <Home></Home>}
        ></Route>
        <Route path="/chart" element={<ChartDisplay/>}></Route>
        <Route path="/register" element={<Login register></Login>}></Route>
        <Route path="/auth" element={<Login></Login>}></Route>
      </Routes>
    </>
  );
}
