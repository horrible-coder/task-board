import "./Home.scss";
import Board from "../Board/Board";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

export interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className="Home">
      <div className="left_section">
        <Sidebar />
      </div>
      <div className="right_section">
        <Navbar />
        <Board />
      </div>
    </div>
  );
};

export default Home;
