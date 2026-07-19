"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Phone, PhoneOff } from "lucide-react";

type CallState = "idle" | "connecting" | "active";

export function VapiAssistant() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  const vapiRef = useRef<Vapi | null>(null);
  const [state, setState] = useState<CallState>("idle");

  useEffect(() => {
    if (!publicKey) return;

    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    vapi.on("call-start", () => setState("active"));
    vapi.on("call-end", () => setState("idle"));
    vapi.on("error", () => setState("idle"));

    return () => {
      vapi.stop();
      vapi.removeAllListeners();
    };
  }, [publicKey]);

  if (!publicKey || !assistantId) return null;

  function handleClick() {
    const vapi = vapiRef.current;
    if (!vapi) return;

    if (state === "idle") {
      setState("connecting");
      vapi.start(assistantId).catch(() => setState("idle"));
    } else {
      vapi.stop();
      setState("idle");
    }
  }

  const isActive = state === "active";
  const isConnecting = state === "connecting";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isActive ? "End call with Sarah" : "Talk to Sarah, Velcor's voice assistant"}
      className="fixed right-6 bottom-6 z-[90] flex size-14 items-center justify-center rounded-full bg-petrol-700 text-bone shadow-lg transition-colors hover:bg-petrol-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber/50"
    >
      {isActive && (
        <span className="absolute inset-0 animate-ping rounded-full bg-amber/40" aria-hidden="true" />
      )}
      {isActive ? (
        <PhoneOff className="relative size-5" aria-hidden="true" />
      ) : (
        <Phone className={`relative size-5 ${isConnecting ? "animate-pulse" : ""}`} aria-hidden="true" />
      )}
    </button>
  );
}
