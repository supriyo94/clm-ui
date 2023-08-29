import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer, IconSettings } from '@salesforce/design-system-react';

export default function Notification({ variant = "success", heading = "hello", details = "", duration = 3000 }) {
    return (
        // <IconSettings iconPath="/assets/icons">
        <ToastContainer className={`cl-notification-container`}>
            <Toast
                labels={{
                    heading: heading,
                    details: details
                }}
                variant={variant}
            />
        </ToastContainer>
        // </IconSettings>
    );
}
