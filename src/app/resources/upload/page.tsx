import React from "react";
import RequireAuth from "../../../components/RequireAuth";
import ResourceUploadForm from "../../../components/ResourceUploadForm";

export default function UploadPage() {
  return (
    <RequireAuth>
      <div className="container mx-auto px-4 py-8">
        <ResourceUploadForm />
      </div>
    </RequireAuth>
  );
}
