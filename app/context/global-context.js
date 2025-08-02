"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});

    const fetchForecast = async() => {
        try {
            const res = await axios.get("api/weather");
            setForecast(res.data);
            // console.log(res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };

    const fetchAirQuality = async() => {
        try {
            const res = await axios.get("api/pollution");
            setAirQuality(res.data);
            // console.log(res.data);
        } catch (error) {
            console.log("Error fetching pollution data: ", error.message);
        }
    };

    const fetchFiveDayForecast = async() => {
        try {
            const res = await axios.get("api/fiveday");
            setFiveDayForecast(res.data);
        } catch (error) {
            console.log("Error fetching data, ", error.message);
        }
    };

    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
        fetchFiveDayForecast();
    }, []);

    return (
        <GlobalContext.Provider value={{
          forecast,
          airQuality,
          fiveDayForecast
        }}>
            <GlobalContextUpdate.Provider>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);