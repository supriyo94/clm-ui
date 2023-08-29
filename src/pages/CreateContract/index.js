import React, { useEffect, useState } from "react"
import axios from "axios"
import ContractHeader from "../../components/CreateContract/ContractHeader"
import CreationModal from "../../components/CreateContract/CreationModal"
import Notification from "../../components/Alerts/Notification";
import useForm from "../../hooks/useForm";
import { API_HOST_URL } from "../../../constants";

const initialNotification = { show: false, variant: "success", heading: "" };
export default function CreateContract() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState([]);
    const [values, setValues, handleInputChange] = useForm({});
    const [showNotification, setShowNotification] = useState(initialNotification);
    const [mergeFormFields, setMergeFormFields] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [contractPath, setContractPath] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const resetToDefaults = () => {
        setSelectedTemplate([]);
        setValues({});
        setMergeFormFields([]);
        setShowLoading(false);
        setErrors([]);
        setContractPath(null)
    }
    const createFormFields = (inpfieldsarr) => {
        const formvalues = {};
        const temp = inpfieldsarr.map(item => {
            formvalues[item] = "";
            return {
                name: item,
                label: item.replace(/_+/g, " "),
                type: "text",
                required: false
            }
        })
        setValues(formvalues);
        setMergeFormFields(temp);

    }
    const triggerNotification = (notificationParams) => {
        setShowNotification(notificationParams);
        setTimeout(() => {
            setShowNotification(initialNotification)
        }, 3000)
    }
    const toggleOpen = () => {
        if (isOpen) {
            resetToDefaults();
        }
        setIsOpen((preState) => !preState)
    }
    const onUploadTemplate = (event) => {
        event.preventDefault();
        setErrors([]);
        if (selectedTemplate.length === 0) {
            setErrors(["Please select template file to upload."]);
            return
        }
        setShowLoading(true);
        const file = selectedTemplate[0];
        // create a new FormData object and append the file to it
        const formData = new FormData();
        formData.append("file", file);
        axios({
            method: "post",
            url: API_HOST_URL + "/validateTemplate",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            setShowLoading(false);
            triggerNotification({
                show: true, variant: "success", heading: "Template validated successfully."
            });
            createFormFields(response.data.bridgeParams);
        }).catch(function (error) {
            setShowLoading(false);
            // for testing only
            if (error && error.response && error.response.data && error.response.data.errorMessage) {
                if (Array.isArray(error.response.data.errorMessage)) {
                    setErrors(error.response.data.errorMessage);
                } else {
                    setErrors([error.response.data.errorMessage]);
                }
                triggerNotification({
                    show: true, variant: "error",
                    heading: "Oops!! Template validation failed."
                });
            } else {
                //handle error
                triggerNotification({
                    show: true, variant: "error",
                    heading: "Oops!! Template is invalid or contain errors."
                });
            }
            console.log("in error")
            console.log(error);

        })
    }

    const onCreateContractClick = (event) => {
        event.preventDefault();
        let stringrequest = Object.entries(values).map(x => x.join(":")).join(",");
        let payloaddata = {
            documentName: selectedFileName,
            bridgeParams: stringrequest
        }
        axios({
            method: "post",
            url: API_HOST_URL + "/createComplexDocumet",
            data: payloaddata,
            headers: { "Content-Type": "application/json" },//application/json
        }).then((response) => {
            console.log("in success")
            console.log(response.data.documentLocation)
            setContractPath(response.data.documentLocation)
            triggerNotification({
                show: true, variant: "success", heading: "Contract created successfully."
            });
        }).catch(function (error) {
            //handle error
            triggerNotification({
                show: true, variant: "error", heading: "Failed to create contract."
            });
            console.log("in error")
            console.log(error);
        })
    }

    useEffect(() => {
        if (selectedTemplate && selectedTemplate.length > 0) {
            setSelectedFileName(selectedTemplate[0].name || "")
        }
    }, [selectedTemplate])

    // responseArr
    return (<>
        <ContractHeader createClick={toggleOpen} />
        <CreationModal
            toggleOpen={toggleOpen}
            isOpen={isOpen}
            onUploadTemplate={onUploadTemplate}
            setSelectedTemplate={setSelectedTemplate}
            selectedTemplate={selectedTemplate}
            // formFields={formFields}
            mergeFormFields={mergeFormFields}
            formvalues={values}
            handleInputChange={handleInputChange}
            onCreateContractClick={onCreateContractClick}
            showLoading={showLoading}
            contractPath={contractPath}
            errors={errors}
            setErrors={setErrors}
        />
        {
            showNotification && showNotification.show ?
                <Notification
                    variant={showNotification.variant}
                    heading={showNotification.heading}
                />
                : null
        }
    </>)
}