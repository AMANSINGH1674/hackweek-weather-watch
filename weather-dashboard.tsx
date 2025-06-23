"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    localtime: string
  }
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
    }
    humidity: number
    wind_kph: number
    wind_dir: string
    pressure_mb: number
    vis_km: number
    feelslike_c: number
    uv: number
  }
}

export default function WeatherDashboard() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const API_KEY = "4532390e203443c899d215814252306"

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError("Please enter a city name")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(cityName)}&aqi=no`,
      )

      if (!response.ok) {
        throw new Error("City not found")
      }

      const data: WeatherData = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchWeather(city)
  }

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getWeatherBackground = (condition: string) => {
    const conditionLower = condition.toLowerCase()

    if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
      return "bg-gradient-to-br from-orange-300 via-yellow-300 to-orange-400"
    } else if (conditionLower.includes("cloud") || conditionLower.includes("overcast")) {
      return "bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500"
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle") ||
      conditionLower.includes("shower")
    ) {
      return "bg-gradient-to-br from-slate-600 via-blue-500 to-slate-700"
    } else if (conditionLower.includes("wind") || conditionLower.includes("breezy")) {
      return "bg-gradient-to-br from-amber-200 via-yellow-200 to-amber-300"
    } else if (
      conditionLower.includes("snow") ||
      conditionLower.includes("blizzard") ||
      conditionLower.includes("ice")
    ) {
      return "bg-gradient-to-br from-blue-100 via-white to-blue-200"
    } else if (conditionLower.includes("thunder") || conditionLower.includes("storm")) {
      return "bg-gradient-to-br from-purple-900 via-gray-800 to-indigo-900"
    } else if (conditionLower.includes("mist") || conditionLower.includes("fog") || conditionLower.includes("haze")) {
      return "bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400"
    } else if (conditionLower.includes("hot")) {
      return "bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400"
    } else if (conditionLower.includes("cold") || conditionLower.includes("freezing")) {
      return "bg-gradient-to-br from-blue-300 via-cyan-200 to-blue-400"
    }

    // Default background
    return "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  }

  const getSpaceBackground = () => {
    return `
      bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
      before:absolute before:inset-0 before:bg-[radial-gradient(white_1px,transparent_1px)] before:[background-size:50px_50px] before:opacity-20
      after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)] 
      after:bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]
      after:bg-[radial-gradient(circle_at_40%_40%,rgba(120,219,255,0.2),transparent_50%)]
    `
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ease-in-out p-4 relative overflow-hidden ${
        weatherData ? getWeatherBackground(weatherData.current.condition.text) : getSpaceBackground()
      }`}
    >
      {/* Animated stars for space background */}
      {!weatherData && (
        <>
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-40 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-60 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-40 w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-800"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-400"></div>
        </>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${weatherData ? "text-gray-900" : "text-white"}`}>Weather Watch</h1>
          <p className={`${weatherData ? "text-gray-600" : "text-gray-300"}`}>
            Get real-time weather information for any city
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${weatherData ? "text-gray-900" : "text-white"}`}>
              <Search className="h-5 w-5" />
              Search Weather
            </CardTitle>
            <CardDescription className={weatherData ? "text-gray-600" : "text-gray-300"}>
              Enter a city name to get current weather conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter city name (e.g., London, New York)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 focus:border-white/50"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </form>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </CardContent>
        </Card>

        {/* Weather Data Display */}
        {weatherData && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <Card className="overflow-hidden bg-white/10 backdrop-blur-md shadow-2xl border border-white/20">
              <CardHeader className="bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-md text-white border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <MapPin className="h-6 w-6" />
                      {weatherData.location.name}
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      {weatherData.location.region}, {weatherData.location.country}
                    </CardDescription>
                    <p className="text-sm text-blue-100 mt-1">{formatTime(weatherData.location.localtime)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">{Math.round(weatherData.current.temp_c)}°C</div>
                    <div className="text-lg opacity-90">{Math.round(weatherData.current.temp_f)}°F</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`https:${weatherData.current.condition.icon}`}
                    alt={weatherData.current.condition.text}
                    className="w-16 h-16"
                  />
                  <div>
                    <Badge
                      variant="secondary"
                      className="text-lg px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                    >
                      {weatherData.current.condition.text}
                    </Badge>
                    <p className="text-sm text-gray-200 mt-1">
                      Feels like {Math.round(weatherData.current.feelslike_c)}°C
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-white/10 backdrop-blur-md shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-300/30">
                      <Droplets className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Humidity</p>
                      <p className="text-2xl font-semibold text-white">{weatherData.current.humidity}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-300/30">
                      <Wind className="h-5 w-5 text-green-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Wind</p>
                      <p className="text-2xl font-semibold text-white">{weatherData.current.wind_kph} km/h</p>
                      <p className="text-xs text-gray-400">{weatherData.current.wind_dir}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 backdrop-blur-sm rounded-lg border border-purple-300/30">
                      <Gauge className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Pressure</p>
                      <p className="text-2xl font-semibold text-white">{weatherData.current.pressure_mb}</p>
                      <p className="text-xs text-gray-400">mb</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 backdrop-blur-sm rounded-lg border border-yellow-300/30">
                      <Eye className="h-5 w-5 text-yellow-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Visibility</p>
                      <p className="text-2xl font-semibold text-white">{weatherData.current.vis_km}</p>
                      <p className="text-xs text-gray-400">km</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/20 backdrop-blur-sm rounded-lg border border-orange-300/30">
                      <Thermometer className="h-5 w-5 text-orange-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">UV Index</p>
                      <p className="text-2xl font-semibold text-white">{weatherData.current.uv}</p>
                      <p className="text-xs text-gray-400">
                        {weatherData.current.uv <= 2
                          ? "Low"
                          : weatherData.current.uv <= 5
                            ? "Moderate"
                            : weatherData.current.uv <= 7
                              ? "High"
                              : weatherData.current.uv <= 10
                                ? "Very High"
                                : "Extreme"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg border border-red-300/30">
                      <Thermometer className="h-5 w-5 text-red-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Feels Like</p>
                      <p className="text-2xl font-semibold text-white">
                        {Math.round(weatherData.current.feelslike_c)}°C
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!weatherData && !loading && !error && (
          <Card className="text-center py-12 bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent>
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Search for a city to get started</h3>
              <p className="text-gray-300">
                Enter any city name in the search box above to view current weather conditions
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
