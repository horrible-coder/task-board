import "./Navbar.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import apis from "../../api";
import { useHistory } from "react-router";
import { setUser } from "../../redux/users/actions";

export interface Props {}

const Navbar: React.FC<Props> = () => {
  const username = useSelector((state: any) => state.username.username);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    await apis
      .logoutUser()
      .then((res) => {
        window.alert(res.data.message);
        dispatch(setUser(""));
        history.push("/login");
      })
      .catch((err) => window.alert(err));
  };

  return (
    <div className="navbar">
      {/* <div className="navbarItemsLeft">
        <input type="text" placeholder="Search" />
      </div> */}
      <div className="navbarItemsRight">
        <ul>
          <li>{username}</li>
          <ExitToAppIcon onClick={handleLogout} />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
