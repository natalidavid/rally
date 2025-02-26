import React from "react";
import Button from "@material-ui/core/button";
import { Link } from "react-router-dom";
import "./Landing.scss";
import { ArrowRightAlt } from "@material-ui/icons";
import Hero from "./Hero";

export default function Landing() {
  return (
    <div className={"background-div"}>
      <div className={"title-div"}>
        <Hero />
        <br />
        <br />
        <div className={"circle"}></div>
        <Link to="/login">
          <Button
            variant="text"
            style={{
              color: "white",
              paddingLeft: "20px",
              paddingTop: "0px",
              fontSize: "24px",
              textTransform: "capitalize",
              fontWeight: 300,
            }}
            className={"title-button"}
            endIcon={<ArrowRightAlt />}
          >
            Enter
          </Button>
        </Link>
      </div>
      <img
        src="https://i.ibb.co/WvYkJGz/megaphone-png-img.png"
        className={"megaphone"}
        alt="Rally Icon"
      ></img>

      {/* <Link to="/login/register">
        <Button variant="contained" color="primary">Register</Button>
      </Link> */}
    </div>
  );
}
