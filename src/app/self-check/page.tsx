import React from "react";
import SelfCheckQuiz from "../../components/SelfCheckQuiz";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

export default function SelfCheckPage() {
  return (
    <div className="p-4">
      <Loader />
      {/* <ErrorMessage /> */}
      <SelfCheckQuiz />
    </div>
  );
}
