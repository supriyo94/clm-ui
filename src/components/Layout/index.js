import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import Home from "../../pages/Home";
import NoPage from "../../components/NoPage";
import CreateContract from "../../pages/CreateContract";
import DocumentDiffChecker from "../../pages/DocumentDiffChecker";
import DocumentDiffCheckerPaid from "../../pages/DocumentDiffCheckerPaid";
export default function Layout() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Home />} />
          <Route path="/create-contract" element={<CreateContract />} />
          <Route
            exact
            path="/document-diff-checker"
            element={<DocumentDiffChecker />}
          />
          <Route
            exact
            path="/document-diff-checker-paid"
            element={<DocumentDiffCheckerPaid />}
          />
          {/* //path="/create-contract" */}
          <Route path="/*" element={<NoPage />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* </Route> */}
        </Routes>
        <Outlet />
      </BrowserRouter>
    </>
  );
}
