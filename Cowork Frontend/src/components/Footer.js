import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { postService } from "../services/service";
import "./footer.scss";
import { FadeLoader } from "react-spinners";

function Footer() {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      email: email,
    };
    const result = await postService("addSubscriber", data);
    if (result?.data?.success) {
      setLoading(false);
      toast.success("you have successfully subscribed to newsletter.");
    }
  };
  return (
    <div className="footer__main">
      <h1>Subscribe to newsletter</h1>
      <p>Signup to get the latest information about news,offers and events</p>
      <div className="input_div_footer">
        {loading ? (
          <FadeLoader />
        ) : (
          <>
            <input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button onClick={handleSubmit}>submit</button>
          </>
        )}
      </div>
      <div className="footr_links">
        <Link to="/membership" className="link_footer">
          Membership
        </Link>
        <Link to="/location" className="link_footer">
          Location
        </Link>
        <Link to="/listing" className="link_footer">
          Listing
        </Link>
        <Link to="/pricing" className="link_footer">
          Pricing
        </Link>
      </div>
    </div>
  );
}

export default Footer;
