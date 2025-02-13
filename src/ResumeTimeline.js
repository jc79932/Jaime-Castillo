
import React, { useState } from "react";

const colorPrimary = "#3c6e71";
const colorSecondary = "#284b63";

const resumeURL = "https://drive.google.com/uc?export=download&id=1Op1Xvh2Q-sIWdV8W860-jBSSjft-fEcN"
export default function ResumeContent({ title, location, duration, description, rod, subcontractor }) {
    const [isHovered, setIsHovered] = useState(false);

    const splitArray = description.split("•");
    const preBullets = splitArray[0];
    const bullets = splitArray.map((arr, index) => {
        if (index != 0) {
            if (index == preBullets.length + 1) {
                return (
                    <li className="list-group-item">{arr}</li>
                );
            } else {
                return (
                    <li className="list-group-item fst-italic bg-transparent" style={{color: "lightgrey"}}><i className="bi-arrow-right-short"></i>{arr}</li>
                );
            }
        }
    })

    return (
        <div className="p-3 position-relative overflow-hidden" style={{  background: "linear-gradient(to bottom right,rgb(15, 15, 15), #000000)", color: "white", borderRadius: "10px"}}> {/* QUESTION: "to top left || to bottom"? */}
            <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => { window.open(resumeURL, "_blank") }}
                className="btn position-absolute end-0 top-0 py-2 px-auto m-3"
                style={{ transition: "all 0.3s ease", backgroundColor: isHovered ? "white" : `${colorPrimary}` }}>
                <i style={{transition: "all 0.3s ease"}} className={`bi bi-file-earmark-arrow-down ${isHovered ? "text-black" : "text-white"}`}></i>
            </button>
            <h2>{title}</h2>
            <div><h4 className="d-inline-block">{location}</h4><span className="small fw-light fst-italic">{subcontractor != null ? ` (Subcontracted via ${subcontractor})` : ""}</span></div>
            <h4>{duration}</h4>
            <p>{preBullets}</p>
            <ul className="list-group list-group-flush ">{bullets}</ul>
            <p className="pt-3">{splitArray[splitArray.length - 1].split("\n")[1].length != 0 ? splitArray[splitArray.length - 1].split("\n")[1] : ""}</p>
            <p><b>Reason of Leave: </b>{rod}</p>
        </div>
    );
};
