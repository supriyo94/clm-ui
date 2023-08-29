import React from "react"
import { Link } from "react-router-dom"
export default function Home() {
    return (<div className="slds-var-p-around_x-large cl-text-center">
        <h1 className="slds-text-heading_large slds-var-p-bottom_x-large">
            Welcome to CLM
        </h1>
        <div class="slds-text-body_medium">
            <h3 class="slds-text-heading_small slds-var-p-bottom_medium">
                Provides solutions for Contract Lifecycle Management
            </h3>
            <ul>
                <li><Link to="create-contract">Click here</Link> to generate contract documents from HTML templates.</li>
                <li><Link to="document-diff-checker">Click here</Link> compare and find the differences in the word documents.</li>
            </ul>
        </div>
    </div>)
}