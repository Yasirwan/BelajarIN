import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../Redux/dashboard/action";

//Component imports
import Navbar from "../../Components/Sidebar/Navbar";
import SalesDiv from "../../Components/SalesDiv/SalesDiv";
import Header from "../../Components/Header/Header";

// Icons import
import { PiKeyReturnThin, PiCurrencyCircleDollarLight } from "react-icons/pi";
import { FiShoppingCart } from "react-icons/fi";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { BsTruck, BsClipboardMinus, BsDownload } from "react-icons/bs";
import { AiOutlineTag, AiOutlineLineChart } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { BiLogOut, BiUserVoice } from "react-icons/bi";
import { PiStudentDuotone } from "react-icons/pi";
import { AiOutlineQuestion } from "react-icons/ai";
import { TbLayoutGridAdd, TbUsers, TbBrandSpeedtest } from "react-icons/tb";
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

//CSS imports
import "react-vertical-timeline-component/style.min.css";
import { Tooltip } from "antd";
import "./Home.css";

//Image imports
import demo from "../../Assets/cartoon.svg";
import heroImage from '/img/hero.png';

//Data imports
import { barData, pieData, COLORS } from "../../data.js";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const { dashboard } = useSelector((store) => store.dashboard);

  //overview data
  const overviewData = [
    {
      icon: <RiAdminLine />,
      title: "Admins",
      number: dashboard?.admins?.length || 0,
    },
    {
      icon: <BiUserVoice />,
      title: "Teachers",
      number: dashboard?.tutors?.length || 0,
    },
    {
      icon: <PiStudentDuotone />,
      title: "Students",
      number: dashboard?.students?.length || 0,
    },
    {
      icon: <TbLayoutGridAdd />,
      title: "Contents",
      number: dashboard?.contents?.length || 0,
    },
    {
      icon: <TbBrandSpeedtest />,
      title: "Quizzes",
      number: dashboard?.quizzes?.length || 0,
    },
    {
      icon: <AiOutlineQuestion />,
      title: "Doubts",
      number: dashboard?.doubts?.length || 0,
    },
  ];

  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar>
        <div className="main">
          {/* Header */}
          <Header Title={"Overview"} Address={"Default"} />

          {/* overview section */}
          <div className="overview">
            <div className="overview-left">
              <div>
                <h2> Welcome to Studee</h2>
                <p>Transforming Education, Empowering Futures</p>
              </div>
              <div>
                <button>Get Started !</button>
              </div>
              <img src={heroImage}/>
            </div>
            <div className="overview-right">
              {overviewData?.map(({ icon, title, number }, i) => {
                return (
                  <SalesDiv Icon={icon} Title={title} Number={number} key={i} />
                );
              })}
            </div>
          </div>

          {/* Bar nd Pie Chart */}
          <div className="charts">
            <div className="lineChart">
              <div className="chartHead">
                <p>Top Score</p>
              </div>
              <div className="chartBox">
                <div className="chartOne">
                  <ResponsiveContainer>
                    <BarChart width={200} height={300} data={barData}>
                      <XAxis dataKey="name" />
                      <Tooltip />
                      <Legend
                        verticalAlign="top"
                        wrapperStyle={{ lineHeight: "40px" }}
                      />
                      <ReferenceLine y={0} stroke="#000" />
                      <Bar dataKey="Earning" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="chartTwo">
                  <div>
                    <BsDownload />
                    <div>
                      <p>Income</p>
                      <h4>$22,678</h4>
                    </div>
                    <p>+$456</p>
                  </div>
                  <div>
                    <LiaHandHoldingUsdSolid />
                    <div>
                      <p>Expense</p>
                      <h4>$12,057</h4>
                    </div>
                    <p>+$256</p>
                  </div>
                  <div>
                    <PiCurrencyCircleDollarLight />
                    <div>
                      <p>Cashback</p>
                      <h4>8,475</h4>
                    </div>
                    <p>+$256</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pieChart">
              <div className="chartHead">
                <p>Announcement</p>
              </div>
              <div className="pieBox">
                <ResponsiveContainer>
                  <PieChart width={800} height={400}>
                    <Pie
                      data={pieData}
                      innerRadius={80}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pieData">
                  <span>100</span>
                  <p>Total Profit</p>
                </div>
              </div>
            </div>
          </div>
          <div className="homeFooter">
          © 2024 studee | All Rights Reserved | Created by salsa💖
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
