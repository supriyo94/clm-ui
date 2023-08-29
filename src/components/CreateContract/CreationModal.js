import React, { useEffect, useState } from "react";
import {
  IconSettings,
  Modal,
  Button,
  Input,
  Spinner,
} from "@salesforce/design-system-react";
import utilitySprite from "../../../public/asset/utility-sprite.svg";
// const temp = [
//   {
//     name: "customerName",
//     label: "Customer Name",
//     type: "text",
//     value: "",
//     error: "",
//     required: true,
//   }
// ];
export default function CreationModal({
  isOpen,
  toggleOpen,
  setSelectedTemplate,
  selectedTemplate,
  onUploadTemplate,
  onCreateContractClick,
  formvalues,
  mergeFormFields,
  handleInputChange,
  showLoading,
  contractPath,
  errors,
  setErrors
}) {
  const [showMergeFieldsForm, setShowMergeFieldsForm] = useState(false);
  const onTemplateChange = (event) => {
    setErrors([]);
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      setSelectedTemplate(event.target.files);
    } else {
      setSelectedTemplate([]);
      // (true);
    }
  };

  return (
    <IconSettings utilitySprite={utilitySprite}>
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleOpen}
          heading="Create New Contract"
          size="large"
          className="cl-modal"
          dismissOnClickOutside={false}
          tagline={
            (mergeFormFields.length > 0) && (selectedTemplate.length && selectedTemplate[0].name) ?
              <span>
                Selected Template: {selectedTemplate[0].name}
              </span>
              : null
          }
        >
          {mergeFormFields.length === 0 ? (
            <section
              className={`slds-p-around_large ${showMergeFieldsForm ? "cl-d-none" : ""
                }`}
            >
              <form onSubmit={onUploadTemplate}>
                <div className="slds-grid slds-gutters slds-wrap">
                  <div className="slds-col slds-size_1-of-1">
                    <div className="slds-form-element slds-has-error">
                      <span
                        className="slds-form-element__label"
                        id="file-selector-primary-label-221"
                      >
                        Contract Template
                      </span>
                      <div className="slds-form-element__control">
                        <div className="slds-file-selector slds-file-selector_files">
                          <div className="slds-file-selector__dropzone">
                            <input
                              type="file"
                              onChange={onTemplateChange}
                              className="slds-file-selector__input slds-assistive-text"
                              // accept="text/html"
                              id="file-upload-input-223"
                              aria-describedby="error-224"
                              aria-labelledby="file-selector-primary-label-221 file-selector-secondary-label222"
                            />
                            <label
                              className="slds-file-selector__body"
                              htmlFor="file-upload-input-223"
                              id="file-selector-secondary-label222"
                            >
                              <span className="slds-file-selector__button slds-button slds-button_neutral">
                                {/* <svg className="slds-button__icon slds-button__icon_left" aria-hidden="true">
                                            <use xlink: href="/assets/icons/utility-sprite/svg/symbols.svg#upload"></use>
                                        </svg> */}
                                Select Template File
                              </span>
                              {/* <span className="slds-file-selector__text slds-medium-show">or Drop Files</span> */}
                            </label>
                          </div>
                        </div>
                      </div>
                      {selectedTemplate.length > 0 ? (
                        <div className="slds-form-element__help cl-text-gray">
                          {selectedTemplate[0].name}
                        </div>
                      ) : null}
                      {/* file validation */}
                      {/* {showFileTypeError ? (
                        <div className="slds-form-element__help" id="error-224">
                          Please attach file to upload
                        </div>
                      ) : null} */}
                    </div>
                  </div>
                  <div className="slds-col slds-size_1-of-1 slds-clearfix cl-px-4">
                    <div className="slds-float_right">
                      <Button type="submit"
                        disabled={showLoading}
                        variant="brand"
                      >
                        Validate Template
                        {/* <Spinner
                          size="small"
                          variant="base"
                          assistiveText={{ label: 'Main Frame Loading...' }}
                        /> */}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          ) : null}
          {/* // ${showMergeFieldsForm ? "" : "cl-d-none"} */}
          {
            contractPath ?
              <section className={`slds-p-around_large`}>
                <div className="slds-grid slds-gutters slds-wrap">
                  <div className="slds-col slds-size_1-of-1">
                    {/* <div className="cl-text-gray cl-text-center cl-p-2">Selected Template: {selectedTemplate[0].name}</div> */}
                    {
                      contractPath ?
                        <div className="cl-text-gray cl-text-center cl-p-2">Please <a href={contractPath}>Click here</a> to download contract document.</div> : null
                    }
                  </div>
                </div>
              </section>
              : null
          }
          {!contractPath && mergeFormFields.length > 0 ? (
            <section className={`slds-p-around_large`}>
              <form onSubmit={onCreateContractClick}>
                <div className="slds-grid slds-gutters slds-wrap">
                  <div className="slds-col slds-size_1-of-1 cl-mb-2">
                    <div className="slds-text-heading_medium cl-mb-2 cl-text-capitalize">Input merge fields to generate contract :</div>
                  </div>
                  {mergeFormFields.length
                    ? mergeFormFields.map((item, index) => {
                      return (
                        <div
                          className="slds-col slds-size_1-of-2 cl-mb cl-text-capitalize"
                          key={mergeFormFields.name + "_" + index}
                        >
                          <Input
                            label={item.label}
                            name={item.name}
                            required={item.required}
                            errorText={""}
                            value={formvalues[item.name]}
                            // placeholder={item.label}
                            onChange={handleInputChange}
                          />
                        </div>
                      );
                    })
                    : null}
                  <div className="slds-col slds-size_1-of-1 slds-clearfix cl-py-4">
                    <div className="slds-float_right">
                      <Button type="submit" disabled={showLoading} variant="brand">
                        Create Contract
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          ) : null}
          {
            errors && errors.length ?
              <section className={`slds-p-around_large`}>
                <div className="slds-grid slds-gutters slds-wrap">
                  <div className="slds-col slds-size_1-of-1">
                    {
                      errors.map((item) => (
                        <div className="slds-form-element__help cl-text-error">
                          {item}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </section>
              : null
          }
        </Modal>
      </div>
    </IconSettings>
  );
}
