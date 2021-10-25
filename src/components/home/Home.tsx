import { RouteComponentProps } from "react-router";
import Navbar from "../Navbar"

const Home = ({ history }: RouteComponentProps) => {
  return <div className="home-container">
    <Navbar/>
  </div>;
};

export default Home;
