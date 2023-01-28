import React, { useEffect, useState } from "react";
import LandHeader from "../LandingPage/LandHeader";
import "./index.css";
import ReactHTMLparser from "react-html-parser";
import axios from "axios";
import { Avatar, Spin, Tooltip } from "antd";
import {
  useNavigate,
  useParams,
  unstable_HistoryRouter,
} from "react-router-dom";
import moment from "moment";
import { AuthModal } from "../Modals/AuthModal";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import HomeHeader from "../HomePage/HomeHeader";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const Index = ({ userDetails }) => {
  const [loading, setLoading] = useState(false);
  const [singleB, setSingleB] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = React.useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/api/stories/${id}`)
        .then((res) => {
          console.log(res.data.data);
          setSingleB(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [id]);

  const addToList = async () => {
    console.log(userDetails);
    if (user) {
      const body = {
        userid: userDetails?._id,
      };
      await axios
        .post(`/api/user/list/${id}`, body)
        .then((res) => {
          console.log("list added successfully");
          navigate("/me/lists");
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } else {
      setModal(true);
    }
  };

  const deleteFromList = async () => {
    if (id) {
      await axios
        .delete(`/api/stories/${id}`)
        .then((res) => {
          console.log(res.data.data);
          alert("Story deleted successfully");
          navigate("/me/stories");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  // console.log(userDetails);
  // if (user) {
  //   const body = {
  //     userid: userDetails?._id,
  //   };
  //   await axios
  //     .post(`/api/user/list/${id}`, body)
  //     .then((res) => {
  //       console.log("list added successfully");
  //       navigate("/me/lists");
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data.message);
  //     });
  // } else {
  //   setModal(true);
  // }
  //     console.log(userDetails);
  //   };

  return (
    <>
      {user ? <LandHeader /> : <HomeHeader backgroundColor={"#fff"} />}

      <Spin spinning={loading}>
        <div className="singleBlog">
          <h1
            className="singleBlog__title"
            style={{ fontFamily: " Lato, sans-serif", fontSize: "32px" }}
          >
            {ReactHTMLparser(singleB?.title)}
          </h1>
          {singleB?.userDetails && (
            <div className="singleBlog_author">
              <div className="singleBlog_left">
                <div className="author-details">
                  <div>
                    <Avatar
                      size={"large"}
                      src={singleB?.userDetails[0]?.photoURL}
                    />
                  </div>
                  <div className="author-name">
                    <strong>{singleB?.userDetails[0]?.displayName}</strong>
                    <span>
                      {moment(singleB?.created_at).format("DD MMM, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="singleBlog_right">
                <Tooltip title="Save">
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={addToList}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      class="px"
                    >
                      <path
                        d="M18 2.5a.5.5 0 0 1 1 0V5h2.5a.5.5 0 0 1 0 1H19v2.5a.5.5 0 1 1-1 0V6h-2.5a.5.5 0 0 1 0-1H18V2.5zM7 7a1 1 0 0 1 1-1h3.5a.5.5 0 0 0 0-1H8a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V7z"
                        fill="#292929"
                      ></path>
                    </svg>
                  </span>
                </Tooltip>
                <Tooltip title="delete">
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={deleteFromList}
                >
                  <svg
                    width="16px"
                    height="16px"
                    viewBox="0 0 1024 1024"
                    class="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z"
                      fill="#231815"
                    />
                    <path
                      d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z"
                      fill="#231815"
                    />
                  </svg>
                </span>
              </Tooltip>
              </div>
            </div>
          )}
          <div className="singleBlog__body">
            {ReactHTMLparser(singleB?.content)}
          </div>
        </div>
      </Spin>
      <AuthModal
        signInPopup={async () => await signInWithPopup(auth, provider)}
        open={modal}
        setOpen={setModal}
      />
    </>
  );
};

export default Index;
