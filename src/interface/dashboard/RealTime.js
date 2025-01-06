import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

function RealTime() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // Nettoyage du timer à la fin
  }, []);

  return <Typography>Heure : {time}</Typography>;
}

export default RealTime;
