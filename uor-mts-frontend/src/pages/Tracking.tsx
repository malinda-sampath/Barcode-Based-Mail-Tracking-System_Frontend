import React from "react";
import { useState } from "react";
import TrackingHome from "../components/pageComponent/tracking/TrackingHome";
import TrackingEmailEnter from "../components/pageComponent/tracking/TrackingEmailEnter";

const Tracking: React.FC = () => {
  const [view, setView] = useState<
    "trackingHome" | "trackingEmail" | "trackingOtp" | "trackingForm"
  >("trackingHome");
  return (
    <div>
      {view === "trackingHome" && (
        <TrackingHome onProceed={() => setView("trackingEmail")} />
      )}
      {view === "trackingEmail" && <TrackingEmailEnter />}
    </div>
  );
};

export default Tracking;
