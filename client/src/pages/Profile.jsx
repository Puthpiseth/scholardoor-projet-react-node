import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileContainer from "../components/Profile-container";
import Articles from "../components/Articles";
import '../styles/pages/profile.scss';

function Profile() {
  return (
    <>
      <Navbar />
      <ProfileContainer />
      <Articles/>
      <Footer />
    </>
  );
}

export default Profile;
