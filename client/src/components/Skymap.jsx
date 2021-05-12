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
    /**
     * A skymap componet using Aladin map
     *
     * Parameter
     * ----------
     * props : React Props
     *    props.data : list
     *        A LIST of candidates or infos
     *        Front page: a list of candidates (showCircle=true, showPoly=false)
     *        Detail page summary: a list of infos ((showCircle=true, showPoly=true))
     *        Detail page card: a list of one info (not needed for now)
     *    props.showCircle : boolean
     *        Show circle error coutours (if exists) if true
     *    props.showPloy : boolean
     *        Show polyline error coutours (if exists) if true
     */
    let fov = 180;
    let targetCenter = "0.00 0.00";
    if (props.showPoly) {
        fov = 8;
        // centered at the first event in the list
        targetCenter = "{0} {1}".replace("{0}", props.data[0].ra);
        targetCenter = targetCenter.replace("{1}", props.data[0].dec);
    }
    const Aladin = () => {
        let aladin = A.aladin("#aladin-lite-div", {
            survey: "P/DSS2/color",
            fov: fov,
            showShareControl: true,
            target: targetCenter
        });
        let EHEList = [];
        let HESEList = [];
        let GoldList = [];
        let BronzeList = [];

        let eheoverlay = A.graphicOverlay({
            name: "EHE Error circle",
            color: "#063fcf",
            lineWidth: 3
        });
        aladin.addOverlay(eheoverlay);

        let heseoverlay = A.graphicOverlay({
            name: "HESE Error circle",
            color: "#b31800",
            lineWidth: 3
        });
        aladin.addOverlay(heseoverlay);

        let bronzeoverlay = A.graphicOverlay({
            name: "HESE Bronze Error circle",
            color: "#cd7f32",
            lineWidth: 3
        });
        aladin.addOverlay(bronzeoverlay);

        let goldoverlay = A.graphicOverlay({
            name: "HESE Gold Error circle",
            color: "#d4af37",
            lineWidth: 3
        });
        aladin.addOverlay(goldoverlay);
        // add markers
        props.data.forEach((info) => {
            if (info.ra != null) {
                let desc = '<p style="color:black;"<em>Alert type:</em> ' + info.type;
                desc =
                    desc + "<br/><em>RA:</em> " + info.ra + " <em>Dec:</em> " + info.dec;
                desc = desc + "<br/><em>Trigger time:</em> " + info.time + "<br/>";
                desc =
                    desc +
                    '<br/>Report <a target="_blank" href="app/candidate/' +
                    info._id +
                    '">Link</a></p>';
                let marker = A.marker(info.ra, info.dec, {
                    popupTitle: '<b style="color:black;">' + info.name + "</b>",
                    popupDesc: desc
                });
                if (info.type === "hese-bronze") BronzeList.push(marker);
                else if (info.type === "hese-gold") GoldList.push(marker);
                else if (info.type === "ehe") EHEList.push(marker);
                else HESEList.push(marker);
                if (props.showCircle && avg50Err(info) !== 0) {
                    let circle = A.circle(info.ra, info.dec, avg50Err(info));
                    if (info.type === "hese-bronze") bronzeoverlay.add(circle);
                    else if (info.type === "hese-gold") goldoverlay.add(circle);
                    else if (info.type === "ehe") eheoverlay.add(circle);
                    else heseoverlay.add(circle);
                }
            }
        });
        // show polylines
        if (props.showPoly) {
            props.data.forEach((info) => {
                if (info.json !== undefined) {
                    if (info.json.contour50 !== undefined) {
                        // the variable is defined
                        let footprintLayer = A.graphicOverlay({
                            name: "50% contour",
                            color: "yellow",
                            lineWidth: 2
                        });
                        aladin.addOverlay(footprintLayer);
                        footprintLayer.addFootprints([A.polygon(info.json.contour50)]);
                    }
                    if (info.json.contour90 !== undefined) {
                        let footprintLayer = A.graphicOverlay({
                            name: "90% contour",
                            color: "orange",
                            lineWidth: 2
                        });
                        aladin.addOverlay(footprintLayer);
                        footprintLayer.addFootprints([A.polygon(info.json.contour90)]);
                    }
                }
            });
        }
        //console.log(props.info.infos[0].json.contour50);

        let EHELayer = A.catalog({
            name: "IceCube EHE Alerts",
            sourceSize: 12,
            color: "blue",
            onClick: "showPopup"
        });
        aladin.addCatalog(EHELayer);

        let HESELayer = A.catalog({
            name: "IceCube HESE Alerts",
            sourceSize: 12,
            color: "red",
            onClick: "showPopup"
        });
        aladin.addCatalog(HESELayer);

        let BronzeLayer = A.catalog({
            name: "IceCube HESE Bronze Alerts",
            sourceSize: 12,
            color: "green",
            onClick: "showPopup"
        });
        aladin.addCatalog(BronzeLayer);

        let GoldLayer = A.catalog({
            name: "IceCube HESE Gold Alerts",
            sourceSize: 12,
            color: "yellow",
            onClick: "showPopup"
        });
        aladin.addCatalog(GoldLayer);

        EHELayer.addSources(EHEList);
        HESELayer.addSources(HESEList);
        BronzeLayer.addSources(BronzeList);
        GoldLayer.addSources(GoldList);
        console.log("EHEList: ", EHEList);
        console.log("HESEList: ", HESEList);
        console.log("BronzeList: ", BronzeList);
        console.log("GoldList: ", GoldList);
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

// helper functions below
function avg50Err(info) {
    /**
     * A helper function calculating something like
     * avg50Err = mean(ra50plus, ra50minus, dec50plus, dec50minus)
     * the `avg50Err` will be used to draw the circle coutour
     *
     * Parameter
     * ----------
     * info : Object
     *    One candidate (candidateSchema)
     *    or one info (infoSchema)
     *
     * Return
     * -------
     * err : float
     *    The arithmetic mean value of one-side errors
     */
    let cnt = 0;
    let sum = 0.0;
    if (info.ra50plus !== undefined) {
        sum += Math.abs(info.ra50plus);
        cnt += 1;
    }
    if (info.ra50minus !== undefined) {
        sum += Math.abs(info.ra50minus); // it's negative
        cnt += 1;
    }
    if (info.dec50plus !== undefined) {
        sum += Math.abs(info.dec50plus);
        cnt += 1;
    }
    if (info.dec50minus !== undefined) {
        sum += Math.abs(info.dec50minus);
        cnt += 1;
    }
    if (cnt === 0) return 0;
    return (1.0 * sum) / cnt;
}

export default Skymap;
