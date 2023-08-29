import React, { useState } from "react";
import { Button, Icon, IconSettings, PageHeader } from '@salesforce/design-system-react';
import Notification from "../../components/Alerts/Notification";
import spinnerImage from "../../../public/images/slds_spinner_brand.gif";
import axios from "axios";
import standardSprite from "../../../public/asset/standard-sprite.svg";
import { API_HOST_URL } from "../../../constants";

const DocumentDiffChecker = () => {
    const initialNotification = { show: false, variant: "success", heading: "" };
    const [showNotification, setShowNotification] = useState(initialNotification);
    const [finalResultSection, showFinalResultSection] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const [responseData, setResponseData] = useState({
        "docxUrl": null,
        "deleteCount": 0,
        "insertCount": 0,
        "totalChangeCount": 0,
        "deletedText": [],
        "insertedText": []
    })
    // const [responseData, setResponseData] = useState(

    //     {"docxUrl":null,"deleteCount":0,"insertCount":0,"totalChangeCount":0,"deletedText":null,"insertedText":null}
    // )

    // const wordFileNameV1 = useRef("http://127.0.0.1:8090/File_Version_1.docx")
    // const wordFileNameV2 = useRef("http://127.0.0.1:8090/File_Version_2.docx")


    const [selectedSourceDocument, setSelectedSourceDocument] = useState([]);
    const [selectedTargetDocument, setSelectedTargetDocument] = useState([]);


    const triggerNotification = (notificationParams) => {
        setShowNotification(notificationParams);
        setTimeout(() => {
            setShowNotification(initialNotification)
        }, 3000)
    }

    const onSourceDocumentSelected = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedSourceDocument(event.target.files)
        }
    }

    const onTargetDocumentSelected = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedTargetDocument(event.target.files)
        }
    }

    const compareFiles = (e) => {
        e.preventDefault();
        // setIsCompared(false)
        showFinalResultSection(true)
        axios({
            method: "get",
            url: `${API_HOST_URL}/convert?path1=${selectedSourceDocument[0].name}&path2=${selectedTargetDocument[0].name}`,
        }).then((response) => {
            if(response.data){
                setIsCompared(true)
                setResponseData(response.data)
                triggerNotification({
                    show: true, variant: "success", heading: "File comparison done successfully"
                });
            }else{
                setIsCompared(true)
                triggerNotification({
                    show: true, variant: "success", heading: "File comparison done successfully"
                }); 
            }
        }).catch((error) => {
            // handle errors
            console.log(error);
            setIsCompared(false)
            showFinalResultSection(false)

            triggerNotification({
                show: true, variant: "error", heading: "Oops!! Something went wrong."
            });
        });
    }

    return <div>
        <IconSettings standardSprite={standardSprite}>

            <PageHeader

                // details={details}

                icon={

                    <Icon

                        assistiveText={{ label: "User" }}

                        category="standard"

                        name="drafts"

                    />

                }

                label="Compare Documents"

                // onRenderActions={actions}

                title="Document Diffchecker - Free"

                variant="record-home"

            />

        </IconSettings>
        <section className='slds-p-around_large'>
            <form>
                <div className="slds-grid slds-align_center slds-gutters">
                    <div className="slds-col slds-size_4-of-12" style={{ display: "flex", justifyContent: "center" }}>
                        <div className="slds-form-element slds-has-error">
                            <span className="slds-form-element__label" id="file-selector-primary-label-221" style={{ fontSize: "13px", fontWeight: "bold" }}>Word File (v1)</span>
                            <div className="slds-form-element__control">
                                <div className="slds-file-selector slds-file-selector_files">
                                    <div className="slds-file-selector__dropzone">
                                        <input type="file"
                                            onChange={onSourceDocumentSelected}
                                            className="slds-file-selector__input slds-assistive-text"
                                            id="file-upload-input-223" aria-describedby="error-224" aria-labelledby="file-selector-primary-label-221 file-selector-secondary-label222" />
                                        <label className="slds-file-selector__body" htmlFor="file-upload-input-223" id="file-selector-secondary-label222">
                                            <span className="slds-file-selector__button slds-button slds-button_neutral" style={{ fontWeight: "bold" }}>
                                                Upload Word File (v1)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                selectedSourceDocument.length > 0 ?
                                    <label className="slds-form-element__label" htmlFor="unique-id-of-input" style={{ fontWeight: "400" }}>
                                        {selectedSourceDocument[0].name}
                                    </label>
                                    : null
                            }
                        </div>
                    </div>
                    <div className="slds-col slds-size_4-of-12" style={{ display: "flex", justifyContent: "center" }}>
                        <div className="slds-form-element slds-has-error">
                            <span className="slds-form-element__label" id="file-selector-primary-label-221" style={{ fontSize: "13px", fontWeight: "bold" }}>Word File (v2)</span>
                            <div className="slds-form-element__control">
                                <div className="slds-file-selector slds-file-selector_files">
                                    <div className="slds-file-selector__dropzone">
                                        <input type="file"
                                            onChange={onTargetDocumentSelected}
                                            className="slds-file-selector__input slds-assistive-text"
                                            // accept="text/html" 
                                            id="file-upload-target-input" aria-describedby="error-224" aria-labelledby="file-selector-primary-label-221 file-selector-target" />
                                        <label className="slds-file-selector__body" htmlFor="file-upload-target-input" id="file-selector-target">
                                            <span className="slds-file-selector__button slds-button slds-button_neutral" style={{ fontWeight: "bold" }}>
                                                Upload Word File (v2)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                selectedTargetDocument.length > 0 ?
                                    <label className="slds-form-element__label" htmlFor="unique-id-of-input" style={{ fontWeight: "400" }}>
                                        {selectedTargetDocument[0].name}
                                    </label>
                                    : null
                            }
                        </div>
                    </div>
                    <div className="slds-col slds-size_4-of-12" style={{ display: "flex", justifyContent: "center" }}>
                        <div className="slds-form-element slds-has-error">
                            <Button className="slds-button slds-button--large slds-button--brand" label="Compare" type="submit"
                                onClick={compareFiles} disabled={selectedSourceDocument.length && selectedTargetDocument.length ? false : true}
                                style={{ marginTop: "30px" }} />
                        </div>
                    </div>
                </div>
                {
                    showNotification && showNotification.show ?
                        <Notification
                            variant={showNotification.variant}
                            heading={showNotification.heading}
                        /> : null
                }
            </form>
            {
                finalResultSection ?
                    <>
                        <hr />
                        <div className="slds-grid slds-align_center slds-gutters" style={{ marginTop: "20px", height: "100%" }}>
                            <div className="slds-col slds-size_6-of-12" style={{ height: "auto" }}>
                                <h2 style={{ display: "flex", justifyContent: "center", color: "#0176d3", fontWeight: "bold", fontSize: "16px" }}>Comparison Result</h2>
                                {
                                    isCompared ?
                                        responseData.docxUrl ?
                                            <div style={{ margin: "20% 20%" }}>
                                                <a href={responseData.docxUrl}><Button className="slds-button slds-button--large slds-button--brand">Click here to download the result document</Button></a>
                                            </div>
                                            : <div style={{ fontWeight: "500", marginTop: "70px", display: "flex", justifyContent: "center" }}>No changes found</div>
                                        :
                                        <div className="slds-spinner--large" style={{ margin: "auto", paddingTop: "20%" }}>
                                            <img src={spinnerImage} alt="Loading..." />
                                        </div>
                                }
                            </div>
                            <div className="slds-col slds-size_6-of-12">
                                <h2 style={{ display: "flex", justifyContent: "center", color: "#0176d3", fontWeight: "bold", fontSize: "16px" }}>Summary</h2>
                                {
                                    isCompared ?
                                        responseData.totalChangeCount > 0 ?
                                            <div>
                                                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                                    <div style={{ width: "500px", fontSize: "15px", fontWeight: "400", display: "flex", flexDirection: "column", rowGap: 10 }}>
                                                        <div>
                                                            Total no. of changes found:  <span style={{ fontWeight: "bold" }}>{responseData.totalChangeCount}</span>
                                                        </div>
                                                        <div>
                                                            No. of Additions:   <span style={{ fontWeight: "bold", color: "blue" }}>{responseData.insertCount}</span>
                                                        </div>
                                                        <div>
                                                            No. of Deletions:    <span style={{ fontWeight: "bold", color: "red" }}>{responseData.deleteCount}</span>
                                                        </div>
                                                        <div>
                                                            Insertions done:    <ul style={{ fontWeight: "bold", whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{responseData.insertedText.map((text, index) => <li key={index} style={{ color: "blue" }}>{text}</li>)}</ul>
                                                        </div>
                                                        <div>
                                                            Deletions done:    <ul style={{ fontWeight: "bold", whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{responseData.deletedText.map((text, index) => <li key={index} style={{ color: "red" }}>{text}</li>)}</ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : <div style={{ fontWeight: "500", marginTop: "70px", display: "flex", justifyContent: "center" }}>No changes found</div>
                                        :
                                        <div className="slds-spinner--large" style={{ margin: "auto", paddingTop: "20%" }}>
                                            <img src={spinnerImage} alt="Loading..." />
                                        </div>
                                }
                            </div>
                        </div>
                    </> : null

            }
        </section>

    </div>

};

export default DocumentDiffChecker;