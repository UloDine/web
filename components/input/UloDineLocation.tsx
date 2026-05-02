import React from "react";

function UloDineLocation({
  region = "local",
}: {
  region: "local" | "state" | "country";
}) {
  void region;
  return <div>UloDineLocation</div>;
}

export default UloDineLocation;
