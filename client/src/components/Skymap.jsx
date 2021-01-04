import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.25em 1em;
  margin: 1em;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.main};
`;
const A = window.A;

function Skymap(props) {
    const Aladin = () => {
        let aladin = A.aladin("#aladin-lite-div", {
            survey: "P/DSS2/color",
            fov: 60
        });
        // var markerList = [];
        // for (var i = 0; i < props.canidateList.length; i++) {
        //   var info = props.canidateList[i];
        //   var marker = A.marker(info.ra, info.dec, {
        //     popupTitle: info.name,
        //     popupDesc: info.type
        //   });
        // }
        // var markerLayer = A.catalog();
        // aladin.addCatalog(markerLayer);
        // markerLayer.addSources(markerList);
    };

    useEffect(() => {
        Aladin();
    }, []);

    return (
        <Wrapper>
            <h2>This area is for the skymap.</h2>
            <div
                id="aladin-lite-div"
                style={{ width: "700px", height: "400px" }}
            ></div>
        </Wrapper>
    );
}

export default Skymap;
