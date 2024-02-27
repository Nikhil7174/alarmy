import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/reducers/auth";
import { Navbar } from "../components/Navbar";
import { CreateAlarm } from "../components/CreateAlarm";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(0);

  return (
    <div>
      <Navbar />
      <div
        id="alarm-container"
        className="relative min-h-fit p-10 m-10 mx-24 border-8 flex flex-col"
      >
        <div id="create" className="absolute bottom-0 right-0">
          <CreateAlarm />
        </div>
      </div>
    </div>
  );
};
