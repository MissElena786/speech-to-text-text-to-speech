


import React, { useState, useRef } from "react";
import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { FormControl, MenuItem, Select } from "@mui/material";
import toast from "react-hot-toast";

export default function SpeechToText() {
    const [transcript, setTranscript] = useState("");
    const [listening, setListening] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [cooldown, setCooldown] = useState(false);

    const [language, setLanguage] = useState("en-US");
    const recognitionRef = useRef(null);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const startListening = () => {
        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }

        if (cooldown) return;

        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }

        setCooldown(true);
        setTimeout(() => setCooldown(false), 1000); // 1-second cooldown

        const recognition = new SpeechRecognition();
        recognition.lang = language;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setListening(true);
            setIsPaused(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.onresult = (event) => {
            const speech = event.results[0][0].transcript;
            setTranscript(prev => prev + ' ' + speech);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);

            switch (event.error) {
                case "network":
                    // alert("Network error: Please check your internet connection.");
                    toast.error("Network error: Please check your internet connection.");
                    break;
                case "not-allowed":
                    // alert("Microphone access was denied. Please allow microphone permissions.");
                    toast.error("Microphone access was denied. Please allow microphone permissions.");
                    break;
                case "service-not-allowed":
                    // alert("Speech recognition service is not allowed. Check browser settings.");
                    toast.error("Speech recognition service is not allowed. Check browser settings.");
                    break;
                case "no-speech":
                    // alert("No speech was detected. Please try speaking again.");
                    toast.error("No speech was detected. Please try speaking again.");
                    break;
                case "audio-capture":
                    // alert("No microphone found. Please check your device settings.");
                    toast.error("No microphone found. Please check your device settings.");
                    break;
                default:
                    // alert(`Speech recognition error: ${event.error}`);
                    toast.error("Speech recognition error: " + event.error);
            }

            setListening(false);
            setIsPaused(false);
        };


        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setIsPaused(true);
        setListening(false);
    };

    const languages = [
        { code: "en-US", label: "English (US)" },
        { code: "hi-IN", label: "Hindi (India)" },
        { code: "bn-IN", label: "Bengali (India)" },
        { code: "ta-IN", label: "Tamil (India)" },
        { code: "gu-IN", label: "Gujarati (India)" },
        { code: "kn-IN", label: "Kannada (India)" },
        { code: "ur-IN", label: "Urdu (India)" }
    ];

    return (
        <div className="p-6 mx-auto w-full h-screen flex justify-center items-center bg-[#ddd]">
            <div className="shadow-lg p-[25px] bg-white rounded-lg  max-w-xl w-2xl">

                <div className=" flex justify-between mb-[10px]">
                    <h2 className="text-xl  font-[500] text-center">Speech to Text <span className="text-yellow-600 font-[600] text-shadow-[2px]">Converter</span></h2>
                    <div className="mb-4 text-center bg-gray-100 rounded-[4px] text-[14px]">
                        <Select
                            id="language"
                            value={language}
                            label="Choose Language"
                            className="text-[14px]"
                            onChange={(e) => setLanguage(e.target.value)}
                            sx={{
                                fontSize: "13px",
                                minWidth: "150px",
                                // maxWidth: "150px",
                                height: "36px",
                                backgroundColor: "#f3f4f6",
                                "& .MuiSelect-select": {
                                    padding: "5px 10px",
                                    display: "flex",
                                    alignItems: "center",
                                },
                                "& fieldset": { border: "none" },
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        maxHeight: 250,
                                        "& .MuiMenuItem-root": {
                                            fontSize: "12px",
                                            padding: "5px 10px",
                                        },
                                    },
                                },
                            }}
                        >
                            {languages.map((lang) => (
                                <MenuItem key={lang.code} className="text-[14px]" value={lang.code}>
                                    {lang.label}
                                </MenuItem>
                            ))}
                        </Select>

                    </div>
                </div>

                {(listening || isPaused) && (
                    <div className={`bg-[#DDD] min-h-[100px] flex justify-center items-center p-4 rounded mb-4 flex-col gap-4 ${listening ? 'animate-pulse' : ''}`}>
                        <div className="w-10 p-2 rounded-full bg-yellow-500 ">
                            <MicIcon className={`text-white  ${listening ? "animate-bounce" : ""}`} />
                        </div>
                        <div className="flex gap-2">
                            {listening ? (
                                <div className="relative group cursor-pointer">
                                    <button onClick={stopListening}>
                                        <StopCircleIcon className="text-gray-600 hover:scale-110 transition-transform cursor-pointer" fontSize="large" />
                                    </button>
                                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                                        Stop Listening
                                    </div>
                                </div>

                            ) : (
                                <div className="relative group cursor-pointer">
                                    <button onClick={startListening}>
                                        <PlayCircleOutlineIcon className="text-slate-600 hover:scale-110 transition-transform cursor-pointer" fontSize="large" />
                                    </button>
                                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                                        Resume Listening
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-center items-center" >
                    {(!listening && !isPaused) && (
                        <button
                            onClick={startListening}
                            className="bg-yellow-500 text-white px-4 py-2 cursor-pointer rounded-[4px] hover:bg-yellow-600 mb-4 text-shadow-md font-[500] leading-[26px] transform transition-all"
                        >
                            🎤 Start Listening
                        </button>
                    )}
                </div>

                <div className="bg-gray-100 p-4 rounded min-h-[120px]">
                    <p className="font-[500] text-[#8e8c8c]">Recognized Speech:</p>
                    <p className="text-gray-700 mt-2 whitespace-pre-wrap max-h-[200px] overflow-y-auto text-[13px] font-[400] text-justify">{transcript || "Waiting for input..."}</p>
                </div>
            </div>
        </div>
    );
}
