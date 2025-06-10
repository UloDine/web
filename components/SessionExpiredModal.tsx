"use client";

import React from "react";

const SessionExpiredModal: React.FC = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Session Expired</h2>
        <p>You’ll be logged out automatically in 10 seconds.</p>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
