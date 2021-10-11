import React, { Fragment, useState } from "react";
import { isSameDay } from "date-fns";
import WeatherForecast from "./WeatherForecast.jsx";
import "./DrawerContent.css";

const indexes = [4, 12, 20, 28, 36];

export default function DrawerContent({ forecast, unit }) {
  const [showToday, setShowToday] = useState(true);

  return (
    <Fragment>
      {!forecast ? (
        <div className="errorMsg">
          Sorry, forecast is not available currently! <br />
          Please try again
        </div>
      ) : (
        <Fragment>
          <div className="btnWrapper">
            <button
              className={`btn ${showToday && "btnActive"}`}
              onClick={() => setShowToday(true)}
            >
              Today
            </button>
            <button
              onClick={() => setShowToday(false)}
              className={`btn ${!showToday && " btnActive"}`}
            >
              Next Days
            </button>
          </div>
          {forecast &&
            (showToday
              ? forecast.list
                  .slice(0, 4)
                  .map((forecast, i) => (
                    <WeatherForecast
                      key={i}
                      forecastInformation={forecast}
                      hourly={showToday}
                      unit={unit}
                    />
                  ))
              : indexes
                  .map((i) => {
                    const forecastTmp = forecast.list[i];
                    const shouldShow = !isSameDay(
                      new Date(forecastTmp.dt * 1000),
                      new Date()
                    );

                    if (shouldShow) {
                      return i;
                    }
                    return undefined;
                  })
                  .filter((i) => i !== undefined)
                  .slice(0, 4)
                  .map((i) => (
                    <WeatherForecast
                      key={i}
                      forecastInformation={forecast.list[i]}
                      hourly={showToday}
                      unit={unit}
                    />
                  )))}
        </Fragment>
      )}
    </Fragment>
  );
}
