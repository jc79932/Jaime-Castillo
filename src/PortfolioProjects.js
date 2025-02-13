import React, { useState, useEffect } from "react";
const colorSecondary = "#284b63";
export default function ProjectBlock({ title, description, url, cover, sendURL }) {
    const idName = title.match(/[a-zA-Z0-9._-]+/g)?.join('') || ''
    const [isHovered, setIsHovered] = useState(false);


    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={()=>
                {
                    setIsHovered(true)
                    setTimeout(() => {
                        setIsHovered(false)
                    }, 5000);
                }}
            className="position-relative portfolio-block-margin" style={{ transition:"all 0.5s ease", transform: isHovered ? "scale(1.05)" : "", backgroundColor: "#ffffff", color: "#000000", borderRadius: "10px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundImage: `url(${cover})` }}>
            <div className={`position-absolute top-0 portfolio-block-timeout ${isHovered ? "portfolio-block-timeout-active" : ""}`}></div>
            <div className="position-absolute top-50 start-50 translate-middle w-100 h-100" style={{ transition:"all 0.5s ease", opacity: isHovered ? "1" : "0", backgroundColor: `${!isHovered ? "#00000000" : "#00000088"}`, borderRadius: "10px" }}>
                <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 d-flex flex-column justify-content-center">
                    <button onClick={()=>{sendURL(url)}} style={{backgroundColor: `${isHovered ? colorSecondary : "#00000000"}`}} className={`btn fw-semibold my-0 text-white m-auto ${isHovered ? "d-inline-block" : "d-none"}`}>Open preview</button>
                    <button onClick={() => { window.open(url, "_blank") }} style={{backgroundColor: "#00000000"}} className={`btn my-0 text-white m-auto ${isHovered ? "d-inline-block" : "d-none"}`}><span className="small">Visit website <i className="ms-1 bi bi-box-arrow-up-right"></i></span></button>

                </div>
            </div>
            <h4 className="fw-light text-white position-absolute bottom-0 m-0 w-100 p-1 text-center" style={{  transition:"all 0.25s ease", backgroundColor: `${isHovered ? "#00000000" : "#00000088"}`,zIndex: "2" }}>{title}</h4>

            {/* <h2>{title}</h2>
            <div><h4 className="d-inline-block">{location}</h4><span className="small fw-light fst-italic">{subcontractor != null ? ` (Subcontracted via ${subcontractor})` : ""}</span></div>
            <h4>{duration}</h4>
            <p>{preBullets}</p>
            <ul className="list-group">{bullets}</ul>
            <p className="pt-3">{splitArray[splitArray.length - 1].split("\n")[1].length != 0 ? splitArray[splitArray.length - 1].split("\n")[1] : ""}</p>
            <p><b>Reason of Leave: </b>{rod}</p> */}
        </div>
    );
};
