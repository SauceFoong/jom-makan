import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { useUser } from "../firebase/auth/useUser";

const Nav = () => {
  const { user, logout } = useUser();
  //   if (user) {
  //     console.log(user);
  //     return (
  //       <div>
  //         <h1>{user.name}</h1>
  //         <h3>{user.email}</h3>
  //       </div>
  //     );
  //   } else
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
      </ul>

      <div className={navStyles.nav_right}>
        {user ? <span onClick={() => logout()}>Log out</span> : ""}
      </div>
    </nav>
  );
};

export default Nav;
