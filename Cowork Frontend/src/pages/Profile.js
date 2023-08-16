import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./profile.scss";
import { putService } from "../services/service";
import { toast } from "react-toastify";

function Profile() {
  const [next, setNext] = useState(false);
  const naviagte = useNavigate();
  const user = JSON.parse(localStorage.getItem("coWorkUser"));

  const [us, setUs] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setUs({
      name: user?.name,
      email: user?.email,
    });
  }, []);

  const handleEdit = async () => {
    const res = await putService("editUser", us);
    if (res?.data?.success) {
      const data = {
        name: res?.data?.data?.name,
        email: res?.data?.data?.email,
        type: res?.data?.data?.type,
        _id: res?.data?.data?._id,
      };
      localStorage.setItem("coWorkUser", JSON.stringify(data));
      toast.success("profile updated.");
    }
  };
  return (
    <>
      <Header />
      <div className="profile_main">
        <div>
          <center>
            <h1>Manage Profile</h1>
          </center>
          <div>
            {!next ? (
              <>
                <input placeholder="Name" value={user?.name} disabled></input>
                <input placeholder="Email" value={user?.email} disabled></input>
                {user?.type === "lessor" ? (
                  <div className="lessor_buttons">
                    <button onClick={() => naviagte("/userListing")}>
                      Your listings
                    </button>
                    <button onClick={() => naviagte("/awaitingConfirmation")}>
                      Awaiting confirmation
                    </button>
                    <button onClick={() => setNext(true)}>Update Info</button>
                  </div>
                ) : (
                  <div className="lessor_buttons">
                    <button onClick={() => naviagte("/bookings")}>
                      Your bookings
                    </button>
                    <button onClick={() => setNext(true)}>Update Info</button>
                  </div>
                )}
              </>
            ) : (
              <>
                <input
                  placeholder={us?.name}
                  type="text"
                  onChange={(e) => setUs({ ...us, name: e.target.value })}
                ></input>
                <input
                  placeholder={us?.email}
                  type="email"
                  onChange={(e) => setUs({ ...us, email: e.target.value })}
                ></input>
                <input
                  placeholder="*********"
                  type="password"
                  onChange={(e) => setUs({ ...us, password: e.target.value })}
                ></input>
                <div>
                  <button onClick={() => handleEdit()} className="updatoooo">
                    Update
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
