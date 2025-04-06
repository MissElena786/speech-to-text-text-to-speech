// import { MenuItem, Select } from "@mui/material";
// import React, { useState, useEffect } from "react";

// export default function TextToSpeech() {
//     const [text, setText] = useState("");
//     const [voices, setVoices] = useState([]);
//     const [selectedVoice, setSelectedVoice] = useState(null);

//     useEffect(() => {
//         const loadVoices = () => {
//             const synth = window.speechSynthesis;
//             const voiceList = synth.getVoices();
//             setVoices(voiceList);
//             if (voiceList.length > 0) setSelectedVoice(voiceList[0].name);
//         };

//         loadVoices();
//         window.speechSynthesis.onvoiceschanged = loadVoices;
//     }, []);

//     const handleSpeak = () => {
//         if (!text || !selectedVoice) return;
//         const synth = window.speechSynthesis;
//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.voice = voices.find((v) => v.name === selectedVoice);
//         synth.speak(utterance);
//     };

//     return (
//         <div className="p-6 w-full mx-auto flex justify-center items-center h-screen">
//             <div className="max-w-2xl min-w-xl w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
//                 <div className="flex justify-between gap-8 mb-[10px]">
//                     <h2 className=" mb-4 text-xl  font-[500] text-center">Text to Speech <span className="text-sky-600 font-[600] text-shadow-[2px]">Converter</span></h2>
//                     <div className="mb-4 text-center bg-gray-100 rounded-[4px] text-[14px]">
//                         <Select
//                             id="language"
//                             value={selectedVoice || ""}
//                             onChange={(e) => setSelectedVoice(e.target.value)}
//                             sx={{
//                                 fontSize: "13px",
//                                 minWidth: "150px",
//                                 // maxWidth: "150px",
//                                 height: "36px",
//                                 backgroundColor: "#f3f4f6",
//                                 "& .MuiSelect-select": {
//                                     padding: "5px 10px",
//                                     display: "flex",
//                                     alignItems: "center",
//                                 },
//                                 "& fieldset": { border: "none" },
//                                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
//                             }}
//                             MenuProps={{
//                                 PaperProps: {
//                                     sx: {
//                                         maxHeight: 250,
//                                         "& .MuiMenuItem-root": {
//                                             fontSize: "12px",
//                                             padding: "5px 10px",
//                                         },
//                                     },
//                                 },
//                             }}
//                         >
//                             {voices.map((voice, index) => (
//                                 <MenuItem key={index} value={voice.name}>
//                                     {voice.name} ({voice.lang})
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </div>

//                 </div>


//                 <textarea
//                     className="w-full p-2 border rounded mb-4 text-[14px] outline-none focus:ring-[0.50px] text-[#787777] font-[400] focus:ring-blue-500 border-none bg-[#f3f1f1] resize-none"
//                     rows="4"
//                     placeholder="Enter text to voice..."
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                 />



//                 <div className="flex justify-center items-center my-4">
//                     <span className="loading loading-bars loading-xl"></span>
//                     <span className="loading loading-bars loading-xl"></span>
//                     <span className="loading loading-bars loading-xl"></span>

//                     <span className="loading loading-bars loading-xl"></span>
//                 </div>

//                 <div className="flex justify-center items-center" >
//                     <button
//                         onClick={handleSpeak}
//                         // className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         className="bg-blue-500 text-white px-4 py-2 rounded-[4px] hover:bg-blue-600 mb-4 text-shadow-md font-[500] leading-[26px] transform transition-all min-w-[200px]"

//                     >
//                         🔈 Voice
//                     </button>
//                 </div>
//             </div>

//         </div>

//     );
// }


// import { MenuItem, Select } from "@mui/material";
// import React, { useState, useEffect, useRef } from "react";
// import GraphicEqIcon from '@mui/icons-material/GraphicEq';
// import StopCircleIcon from '@mui/icons-material/StopCircle';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// export default function TextToSpeech() {
//     const [text, setText] = useState("");
//     const [voices, setVoices] = useState([]);
//     const [selectedVoice, setSelectedVoice] = useState(null);
//     const [isSpeaking, setIsSpeaking] = useState(false);
//     const [isPaused, setIsPaused] = useState(false);

//     const utteranceRef = useRef(null);

//     useEffect(() => {
//         const loadVoices = () => {
//             const synth = window.speechSynthesis;
//             const voiceList = synth.getVoices();
//             setVoices(voiceList);
//             if (voiceList.length > 0) setSelectedVoice(voiceList[0].name);
//         };

//         loadVoices();
//         window.speechSynthesis.onvoiceschanged = loadVoices;
//     }, []);

//     const handleSpeak = () => {
//         if (!text || !selectedVoice) return;

//         // Reset previous speech
//         window.speechSynthesis.cancel();

//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.voice = voices.find((v) => v.name === selectedVoice);

//         utterance.onstart = () => {
//             setIsSpeaking(true);
//             setIsPaused(false);
//         };

//         utterance.onend = () => {
//             setIsSpeaking(false);
//             setIsPaused(false);
//             utteranceRef.current = null;
//         };

//         utterance.onerror = () => {
//             setIsSpeaking(false);
//             setIsPaused(false);
//             utteranceRef.current = null;
//         };

//         utteranceRef.current = utterance;
//         window.speechSynthesis.speak(utterance);
//     };

//     const handlePause = () => {
//         if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
//             window.speechSynthesis.pause();
//             setIsPaused(true);
//         }
//     };

//     const handleResume = () => {
//         if (window.speechSynthesis.paused) {
//             window.speechSynthesis.resume();
//             setIsPaused(false);
//         }
//     };

//     const isSpeakingOrPaused = isSpeaking || isPaused;

//     return (
//         <div className="p-6 w-full mx-auto flex justify-center items-center h-screen">
//             <div className="max-w-2xl min-w-xl w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
//                 <div className="flex justify-between gap-8 mb-[10px]">
//                     <h2 className=" mb-4 text-xl  font-[500] text-center">
//                         Text to Speech <span className="text-sky-600 font-[600] text-shadow-[2px]">Converter</span>
//                     </h2>
//                     <div className="mb-4 text-center bg-gray-100 rounded-[4px] text-[14px]">
//                         <Select
//                             id="language"
//                             value={selectedVoice || ""}
//                             onChange={(e) => setSelectedVoice(e.target.value)}
//                             sx={{
//                                 fontSize: "13px",
//                                 minWidth: "150px",
//                                 height: "36px",
//                                 backgroundColor: "#f3f4f6",
//                                 "& .MuiSelect-select": {
//                                     padding: "5px 10px",
//                                     display: "flex",
//                                     alignItems: "center",
//                                 },
//                                 "& fieldset": { border: "none" },
//                                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
//                             }}
//                             MenuProps={{
//                                 PaperProps: {
//                                     sx: {
//                                         maxHeight: 250,
//                                         "& .MuiMenuItem-root": {
//                                             fontSize: "12px",
//                                             padding: "5px 10px",
//                                         },
//                                     },
//                                 },
//                             }}
//                         >
//                             {voices.map((voice, index) => (
//                                 <MenuItem key={index} value={voice.name}>
//                                     {voice.name} ({voice.lang})
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </div>
//                 </div>

//                 <textarea
//                     className="w-full p-2 border rounded mb-4 text-[14px] outline-none focus:ring-[0.50px] text-[#787777] font-[400] focus:ring-blue-500 border-none bg-[#f3f1f1] resize-none"
//                     rows="4"
//                     placeholder="Enter text to voice..."
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                 />

//                 {isSpeakingOrPaused && (
//                     <div className="flex justify-center items-center my-4 gap-2 flex-col">
//                         <div>
//                             {isPaused ? (
//                                 <>
//                                     <GraphicEqIcon className="text-gray-400" />
//                                     <GraphicEqIcon className="text-gray-400" />
//                                     <GraphicEqIcon className="text-gray-400" />
//                                 </>
//                             ) : (
//                                 <>
//                                     <span className="loading loading-bars loading-md"></span>
//                                     <span className="loading loading-bars loading-md"></span>
//                                     <span className="loading loading-bars loading-md"></span>
//                                 </>
//                             )}
//                         </div>


//                         <div className="flex gap-2">

//                             {isSpeaking && !isPaused && (
//                                 <button
//                                     onClick={handlePause}
//                                     title="Stop Speaking"
//                                     className="cursor-pointer"

//                                 >
//                                     <StopCircleIcon className="text-gray-600 hover:scale-110 transition-transform" fontSize="large" />
//                                 </button>

//                             )}

//                             {isPaused && (
//                                 <button
//                                     onClick={handleResume}
//                                     title="Resume Speaking"
//                                     className="cursor-pointer"
//                                 >
//                                     <PlayCircleOutlineIcon className="text-slate-600 hover:scale-110 transition-transform" fontSize="large" />
//                                 </button>
//                             )}
//                         </div>


//                     </div>
//                 )}



//                 <div className="flex justify-center items-center gap-4">
//                     <button
//                         onClick={handleSpeak}
//                         disabled={isSpeaking && !isPaused}
//                         className={`px-4 py-2 rounded-[4px] mb-4  font-[500] leading-[26px] transition-all text-shadow-md min-w-[200px] cursor-pointer
//                             ${(isSpeaking && !isPaused) ? "bg-blue-300 text-white cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
//                     >
//                         🔈 Voice
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }



// import { MenuItem, Select } from "@mui/material";
// import React, { useState, useEffect, useRef } from "react";
// import GraphicEqIcon from '@mui/icons-material/GraphicEq';
// import StopCircleIcon from '@mui/icons-material/StopCircle';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// export default function TextToSpeech() {
//     const [text, setText] = useState("");
//     const [voices, setVoices] = useState([]);
//     const [selectedVoice, setSelectedVoice] = useState(null);
//     const [isSpeaking, setIsSpeaking] = useState(false);
//     const [isPaused, setIsPaused] = useState(false);
//     const [isBusy, setIsBusy] = useState(false); // additional lock state

//     const utteranceRef = useRef(null);

//     useEffect(() => {
//         const synth = window.speechSynthesis;

//         const loadVoices = () => {
//             const voiceList = synth.getVoices();
//             setVoices(voiceList);
//             if (voiceList.length > 0) {
//                 setSelectedVoice(voiceList[0].name);
//             }
//         };

//         loadVoices();
//         if (synth.onvoiceschanged !== undefined) {
//             synth.onvoiceschanged = loadVoices;
//         }

//         return () => {
//             synth.onvoiceschanged = null;
//         };
//     }, []);

//     const resetSpeechState = () => {
//         window.speechSynthesis.cancel();
//         setIsSpeaking(false);
//         setIsPaused(false);
//         setIsBusy(false);
//         utteranceRef.current = null;
//     };

//     const handleSpeak = () => {
//         if (!text || !selectedVoice) return;

//         try {
//             resetSpeechState();
//             const utterance = new SpeechSynthesisUtterance(text);
//             const selected = voices.find(v => v.name === selectedVoice);
//             if (selected) utterance.voice = selected;

//             utterance.onstart = () => {
//                 setIsSpeaking(true);
//                 setIsPaused(false);
//                 setIsBusy(false);
//             };

//             utterance.onend = () => {
//                 resetSpeechState();
//             };

//             utterance.onerror = (e) => {
//                 console.error("Speech error:", e.error);
//                 resetSpeechState();
//             };

//             utteranceRef.current = utterance;
//             window.speechSynthesis.speak(utterance);
//         } catch (err) {
//             console.error("Failed to speak:", err);
//             resetSpeechState();
//         }
//     };

//     const handlePause = () => {
//         try {
//             if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
//                 window.speechSynthesis.pause();
//                 setIsPaused(true);
//             }
//         } catch (err) {
//             console.error("Pause failed:", err);
//         }
//     };

//     const handleResume = () => {
//         try {
//             if (window.speechSynthesis.paused) {
//                 window.speechSynthesis.resume();
//                 setIsPaused(false);
//             }
//         } catch (err) {
//             console.error("Resume failed:", err);
//         }
//     };

//     const handleVoiceChange = (newVoice) => {
//         resetSpeechState();
//         setSelectedVoice(newVoice);
//     };

//     const isSpeakingOrPaused = isSpeaking || isPaused;

//     return (
//         <div className="p-6 w-full mx-auto flex justify-center items-center h-screen">
//             <div className="max-w-2xl min-w-xl w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
//                 <div className="flex justify-between gap-8 mb-[10px]">
//                     <h2 className=" mb-4 text-xl  font-[500] text-center">
//                         Text to Speech <span className="text-sky-600 font-[600] text-shadow-[2px]">Converter</span>
//                     </h2>
//                     <div className="mb-4 text-center bg-gray-100 rounded-[4px] text-[14px]">
//                         <Select
//                             id="language"
//                             value={selectedVoice || ""}
//                             onChange={(e) => handleVoiceChange(e.target.value)}
//                             disabled={isSpeakingOrPaused}
//                             sx={{
//                                 fontSize: "13px",
//                                 minWidth: "150px",
//                                 height: "36px",
//                                 backgroundColor: "#f3f4f6",
//                                 "& .MuiSelect-select": {
//                                     padding: "5px 10px",
//                                     display: "flex",
//                                     alignItems: "center",
//                                 },
//                                 "& fieldset": { border: "none" },
//                                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
//                             }}
//                             MenuProps={{
//                                 PaperProps: {
//                                     sx: {
//                                         maxHeight: 250,
//                                         "& .MuiMenuItem-root": {
//                                             fontSize: "12px",
//                                             padding: "5px 10px",
//                                         },
//                                     },
//                                 },
//                             }}
//                         >
//                             {voices.map((voice, index) => (
//                                 <MenuItem key={index} value={voice.name}>
//                                     {voice.name} ({voice.lang})
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </div>
//                 </div>

//                 <textarea
//                     className="w-full p-2 border rounded mb-4 text-[14px] outline-none focus:ring-[0.50px] text-[#787777] font-[400] focus:ring-blue-500 border-none bg-[#f3f1f1] resize-none"
//                     rows="4"
//                     placeholder="Enter text to voice..."
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                 />

//                 {/* Visualization + Controls */}
//                 {isSpeakingOrPaused && (
//                     <div className="flex justify-center items-center my-4 gap-2 flex-col">
//                         <div>
//                             {isPaused ? (
//                                 <>
//                                     <GraphicEqIcon className="text-gray-400" />
//                                     <GraphicEqIcon className="text-gray-400" />
//                                     <GraphicEqIcon className="text-gray-400" />
//                                 </>
//                             ) : (
//                                 <>
//                                     <span className="loading loading-bars loading-md"></span>
//                                     <span className="loading loading-bars loading-md"></span>
//                                     <span className="loading loading-bars loading-md"></span>
//                                 </>
//                             )}
//                         </div>

//                         <div className="flex gap-2">
//                             {isSpeaking && !isPaused && (
//                                 <button onClick={handlePause} title="Pause" className="cursor-pointer">
//                                     <StopCircleIcon className="text-gray-600 hover:scale-110 transition-transform" fontSize="large" />
//                                 </button>
//                             )}
//                             {isPaused && (
//                                 <button onClick={handleResume} title="Resume" className="cursor-pointer">
//                                     <PlayCircleOutlineIcon className="text-slate-600 hover:scale-110 transition-transform" fontSize="large" />
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 <div className="flex justify-center items-center gap-4">
//                     <button
//                         onClick={handleSpeak}
//                         disabled={(isSpeaking && !isPaused) || isBusy}
//                         className={`px-4 py-2 rounded-[4px] mb-4 font-[500] leading-[26px] transition-all text-shadow-md min-w-[200px] 
//                             ${(isSpeaking && !isPaused) ? "bg-blue-300 text-white cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
//                     >
//                         🔈 Voice
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState, useRef } from "react";
import { MenuItem, Select } from "@mui/material";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import toast from "react-hot-toast";
import { apiKey } from "../utils.js/apiKey";

export default function TextToSpeech() {
    const [text, setText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState({
        lang: "en-us",
        voice: "Linda",
    });
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const audioRef = useRef(null);


    const voiceOptions = [
        { lang: "en-us", voice: "John", label: "English (US) - Male" },
        { lang: "en-us", voice: "Linda", label: "English (US) - Female" },
        { lang: "en-gb", voice: "Brian", label: "English (UK) - Male" },
        { lang: "en-gb", voice: "Amy", label: "English (UK) - Female" },
        { lang: "en-in", voice: "Amit", label: "English (India) - Male" },
        { lang: "hi-in", voice: "Lekha", label: "Hindi (India) - Female" },

    ];

    const handleSpeak = async () => {
        if (!text.trim()) {
            toast.error("Please enter text to speak!");
            return;
        }
        // Stop any ongoing speech
        handleStop();

        const url = `https://api.voicerss.org/?key=${apiKey}&hl=${selectedVoice.lang}&v=${selectedVoice.voice}&src=${encodeURIComponent(
            text
        )}&c=MP3`;

        const audio = new Audio(url);
        audioRef.current = audio;

        setIsSpeaking(true);
        setIsPaused(false);

        audio.onended = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };

        audio.onerror = () => {
            console.error("Error playing audio");
            setIsSpeaking(false);
            setIsPaused(false);
        };

        try {
            await audio.play();
        } catch (error) {
            console.error("Playback error:", error);
            toast.error("something went wrong");
            setIsSpeaking(false);
        }
    };

    const handlePause = () => {
        if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
            setIsPaused(true);
        }
    };

    const handleResume = () => {
        if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play();
            setIsPaused(false);
        }
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }
        setIsSpeaking(false);
        setIsPaused(false);
    };

    const handleVoiceChange = (e) => {
        const voiceObj = voiceOptions.find((v) => v.voice === e.target.value);
        if (voiceObj) {
            handleStop(); // stop current audio if any
            setSelectedVoice(voiceObj);
        }
    };

    const isSpeakingOrPaused = isSpeaking || isPaused;

    return (
        <div className="p-6 w-full mx-auto flex justify-center items-center h-screen">
            <div className="max-w-2xl min-w-xl w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between gap-8 mb-[10px]">
                    <h2 className=" mb-4 text-xl  font-[500] text-center">
                        Text to Speech <span className="text-sky-600 font-[600] text-shadow-[2px]">Converter</span>
                    </h2>
                    <div className="mb-4 text-center bg-gray-100 rounded-[4px] text-[14px]">
                        <Select
                            id="voice"
                            value={selectedVoice.voice}
                            onChange={handleVoiceChange}
                            sx={{
                                fontSize: "13px",
                                minWidth: "180px",
                                height: "36px",
                                backgroundColor: "#f3f4f6",
                                "& .MuiSelect-select": {
                                    padding: "5px 10px",
                                    display: "flex",
                                    alignItems: "center",
                                },
                                "& fieldset": { border: "none" },
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
                            {voiceOptions.map((option, index) => (
                                <MenuItem key={index} value={option.voice}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <textarea
                    className="w-full p-2 border rounded mb-4 text-[14px] outline-none focus:ring-[0.50px] text-[#787777] font-[400] focus:ring-blue-500 border-none bg-[#f3f1f1] resize-none"
                    rows="4"
                    placeholder="Enter text to voice..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                {isSpeakingOrPaused && (
                    <div className="flex justify-center items-center my-4 gap-2 flex-col">
                        <div>
                            {isPaused ? (
                                <>
                                    <GraphicEqIcon className="text-gray-400" />
                                    <GraphicEqIcon className="text-gray-400" />
                                    <GraphicEqIcon className="text-gray-400" />
                                </>
                            ) : (
                                <>
                                    <span className="loading loading-bars loading-md"></span>
                                    <span className="loading loading-bars loading-md"></span>
                                    <span className="loading loading-bars loading-md"></span>
                                </>
                            )}
                        </div>

                        <div className="flex gap-2">
                            {isSpeaking && !isPaused && (
                                <div className="relative group cursor-pointer">
                                    <button
                                        onClick={handlePause}
                                        title="Pause"
                                        className="cursor-pointer"
                                    >
                                        <StopCircleIcon className="text-gray-600 hover:scale-110 transition-transform" fontSize="large" />
                                    </button>
                                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                                        Pause
                                    </div>
                                </div>
                            )}

                            {isPaused && (
                                <div className="relative group cursor-pointer">
                                    <button
                                        onClick={handleResume}
                                        title="Resume"
                                        className="cursor-pointer"
                                    >
                                        <PlayCircleOutlineIcon className="text-slate-600 hover:scale-110 transition-transform" fontSize="large" />
                                    </button>
                                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                                        Resume
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={handleSpeak}
                        disabled={isSpeaking && !isPaused}
                        className={`px-4 py-2 rounded-[4px] mb-4 font-[500] leading-[26px] transition-all text-shadow-md min-w-[200px] cursor-pointer
                            ${(isSpeaking && !isPaused)
                                ? "bg-blue-300 text-white cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    >
                        🔈 Speack
                    </button>
                </div>
            </div>
        </div>
    );
}


