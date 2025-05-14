import React from "react";
import RequireAuth from "../../../components/RequireAuth";
import ResourceUploadForm from "../../../components/ResourceUploadForm";

export default function UploadPage() {
  return (
    <RequireAuth>
      <div className="p-4">
        <ResourceUploadForm />
      </div>
    </RequireAuth>
  );
}
