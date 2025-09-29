import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function useVoiceSearch(setCity) {
  const [listening, setListening] = useState(false);
  const [micPermission, setMicPermission] = useState("unknown"); // "unknown" | "granted" | "denied" | "prompt"
  const recognitionRef = useRef(null);

  // 🔍Detect mic permission on mount
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "microphone" })
        .then((status) => {
          setMicPermission(status.state); // "granted" | "denied" | "prompt"
          status.onchange = () => {
            setMicPermission(status.state);
          };
        })
        .catch(() => {
          console.warn("Mic permission check not supported in this browser.");
        });
    } else {
      console.warn("Permissions API not supported in this browser.");
    }
  }, []);

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("❌ Your browser does not support voice search.");
      return;
    }

    //  Stop if already listening
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    //  Start new recognition
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    try {
      recognition.start();
      setListening(true);
      setMicPermission("granted"); // assume granted once user interacts
    } catch (err) {
      console.error("SpeechRecognition start failed:", err);
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCity(transcript);
    };

    recognition.onerror = (err) => {
      if (err.error === "not-allowed") {
        setMicPermission("denied");
        setListening(false);
        toast.error(
          "❌ Microphone blocked! Please enable it in your browser settings."
        );
      } else {
        toast.error("⚠️ Voice search error: " + err.error);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return {
    listening,
    micPermission,
    startVoiceSearch,
  };
}

