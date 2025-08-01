import { Cog } from "lucide-react";
import { NextRequest, NextResponse } from "next/server"; 
import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const lat = 39.9526;
        const lon = -75.1652;
        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Error in fetching air pollution data ", error);
        return new Response("Error in fetching air pollution data", { status: 500 });
    }
}