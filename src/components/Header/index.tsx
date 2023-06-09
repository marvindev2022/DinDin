import "./styles.css";
import Logo from "../../assets/logo.svg";
import Profile from "../../assets/profile.svg";
import Logout from "../../assets/logout.svg";
import { useNavigate } from "react-router-dom";
import { clear, getItem } from "../../utils/storage";
interface HeaderProp {
  setOpenModalProfile: React.Dispatch<React.SetStateAction<boolean>>
}
function Header({ setOpenModalProfile }: HeaderProp): JSX.Element {
  const navigate = useNavigate();
  const userName = getItem("userName");

  function handleLogout() {
    clear();
    navigate("/");
  }

  return (
    <header>
      <div className="width-limit content-header">
        <img src={Logo} alt="Logo" />
        <div className="container-sign-out">
          <div onClick={() => setOpenModalProfile(true)} className="profile-area">
            <img src={Profile} alt="Profile" />
            <strong>{userName}</strong>
            <img
              src={Logout}
              alt="Logout"
              className="sign-out"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
