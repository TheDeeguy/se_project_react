import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <div className="sidebaruser-container">
        <p className="sidebarusername">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="sidebaravatar" />
      </div>
    </aside>
  );
}
