import { RouteComponentProps } from "react-router";
import Navbar from "../Navbar";
import SendPost from "./SendPosts"
import "./home.css";

const Home = ({ history }: RouteComponentProps) => {
  return (
    <div className="home-container">
      <div className="big-row-container">
        <div className="posts-container">
          <SendPost/>
        </div>
        <div className="online-users-container"></div>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
