import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Location from "./pages/Location";
import Property from "./pages/Property";
import HelpGuide from "./pages/HelpGuide";
import Listing from "./pages/Listing.jsx";
import ListingForm from "./pages/ListingForm";
import Pricing from "./pages/Pricing.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import LessorListing from "./pages/LessorListing";
import AwaitingConfirmation from "./pages/AwaitingConfirmation";
import Bookings from "./pages/Bookings";
import BookingDetail from "./pages/BookingDetail";
import ListingDetail from "./pages/ListingDetail";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/location" element={<Location />}></Route>
        <Route path="/property/:id" element={<Property />}></Route>
        <Route path="/helpGuide" element={<HelpGuide />}></Route>
        <Route path="/listing" element={<Listing />}></Route>
        <Route path="/listingform" element={<ListingForm />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/userListing" element={<LessorListing />}></Route>
        <Route
          path="/awaitingConfirmation"
          element={<AwaitingConfirmation />}
        ></Route>
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route path="/booking/:id" element={<BookingDetail />}></Route>
        <Route path="/listing/:id" element={<ListingDetail />}></Route>
      </Routes>
    </>
  );
}

export default App;
