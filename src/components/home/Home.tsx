import { RouteComponentProps } from "react-router";
import Navbar from "../Navbar"
import "./home.css"

const Home = ({ history }: RouteComponentProps) => {
  return <div className="home-container">
    <Navbar/>
  </div>;
};

export default Home;
