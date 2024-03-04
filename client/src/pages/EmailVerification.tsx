//@ts-nocheck
// EmailVerification.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const EmailVerification = () => {
  const { id, token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/api/user/verify/${id}/${token}`);
        setVerificationStatus(response.data);
      } catch (error) {
        console.error(
          "Email verification failed:",
          error.response?.data || "Unknown error"
        );
        setVerificationStatus("Email verification failed");
      }
    };

    verifyEmail();
  }, [id, token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{verificationStatus}</p>
    </div>
  );
};
