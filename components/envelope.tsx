"use client"

import type React from "react"
import { useState, useRef, useEffect, useId} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"

interface EnvelopeProps {
  title: string
  colorHex: string
  message: string
  stampImage?: string
}

// Helper function to darken a hex color by a percentage
const darkenHexColor = (hex: string, percent = 15): string => {
  hex = hex.replace("#", "")
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)
  const darkenAmount = percent / 100
  const dr = Math.floor(r * (1 - darkenAmount))
  const dg = Math.floor(g * (1 - darkenAmount))
  const db = Math.floor(b * (1 - darkenAmount))
  return `#${dr.toString(16).padStart(2, "0")}${dg.toString(16).padStart(2, "0")}${db.toString(16).padStart(2, "0")}`
}

// Get text color based on background color brightness
const getTextColor = (hex: string) => {
  const hexColor = hex.replace("#", "")
  const r = Number.parseInt(hexColor.substring(0, 2), 16)
  const g = Number.parseInt(hexColor.substring(2, 4), 16)
  const b = Number.parseInt(hexColor.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? "text-gray-800" : "text-white"
}

// Component for the expanded letter modal
const LetterModal = ({
  message,
  isVisible,
  onClose,
}: {
  message: string
  isVisible: boolean
  onClose: () => void
}) => {
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setContentVisible(true)
      }, 400)
      return () => clearTimeout(timer)
    } else {
      setContentVisible(false)
    }
  }, [isVisible])

  // Only render the modal if we're in the browser
  if (typeof window === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[100] bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-[92%] max-w-[800px] mx-auto bg-[#f8f5e6] rounded-lg p-10 sm:p-12 md:p-14 overflow-y-auto max-h-[85vh]"
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{
              scale: [0.5, 0.7, 1.05, 1],
              y: [50, 20, -10, 0],
              opacity: 1,
            }}
            exit={{ scale: 0.5, y: 50, opacity: 0 }}
            transition={{
              duration: 0.8,
              times: [0, 0.3, 0.7, 1],
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(to bottom, #f8f5e6, #f0ead8)",
              boxShadow:
                "0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.7)",
            }}
          >
            {/* Paper texture */}
            <div
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#00000008 1px, transparent 1px)",
                backgroundSize: "4px 4px",
              }}
            />

            {/* Paper edge details */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-b from-black/10 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-t from-black/10 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-r from-black/10 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-l from-black/10 to-transparent"></div>
            </div>

            {/* Folded paper effect that animates to unfolded */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="absolute top-1/3 left-0 w-full h-[1px] bg-[#00000015]"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              ></motion.div>
              <motion.div
                className="absolute top-2/3 left-0 w-full h-[1px] bg-[#00000015]"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              ></motion.div>
            </motion.div>

            {/* Letter content with improved typography */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: contentVisible ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative z-10"
            >

              <div className="font-serif text-md md:text-md leading-relaxed text-gray-700 whitespace-pre-line max-w-[65ch] mx-auto">
                {message}
              </div>

              <div className="mt-12 text-md md:text-md text-right font-serif italic text-gray-700">
                With love,
                <div className="text-md md:text-md mt-0 font-italic text-gray-700">Your Name</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export function Envelope({ title, colorHex, message, stampImage }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [flapOpen, setFlapOpen] = useState(false)
  const [paperVisible, setPaperVisible] = useState(false)
  const [paperExpanded, setPaperExpanded] = useState(false)
  const envelopeRef = useRef<HTMLDivElement>(null)

  // Generate color variants
  const baseColor = colorHex
  const darkerColor = darkenHexColor(colorHex, 15)
  const evenDarkerColor = darkenHexColor(colorHex, 25)


  // Generate unique IDs for SVG gradients
  const envelopeId = useId();

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (envelopeRef.current && !envelopeRef.current.contains(e.target as Node) && paperExpanded) {
        closeEnvelope()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [paperExpanded])

  const toggleEnvelope = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isAnimating) return

    if (!isOpen) {
      openEnvelope()
    } else {
      closeEnvelope()
    }
  }

  const openEnvelope = () => {
    setIsAnimating(true)

    // Step 1: Flip envelope to back
    setIsOpen(true)

    // Step 2: Open flap after envelope is flipped
    setTimeout(() => {
      setFlapOpen(true)

      // Step 3: Show paper sliding out
      setTimeout(() => {
        setPaperVisible(true)

        // Step 4: Expand paper to center screen
        setTimeout(() => {
          setPaperExpanded(true)

          // Step 5: Animation complete
          setTimeout(() => {
            setIsAnimating(false)
          }, 300)
        }, 500)
      }, 400)
    }, 600)
  }

  const closeEnvelope = () => {
    setIsAnimating(true)

    // Step 1: Hide expanded paper
    setPaperExpanded(false)

    // Step 2: Hide paper
    setTimeout(() => {
      setPaperVisible(false)

      // Step 3: Close flap
      setTimeout(() => {
        setFlapOpen(false)

        // Step 4: Flip envelope back to front
        setTimeout(() => {
          setIsOpen(false)
          setIsAnimating(false)
        }, 400)
      }, 400)
    }, 400)
  }

  const paperStyle = {
    background: "linear-gradient(to bottom, #f8f5e6, #f0ead8)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.7)",
  }

  return (
    <div
      ref={envelopeRef}
      className="relative w-full max-w-[320px] h-[220px] mx-auto perspective-1000 cursor-pointer group"
      onClick={toggleEnvelope}
    >
      <motion.div
        className="relative w-full h-full transform-style-3d"
        initial={false}
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of envelope */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-lg shadow-md p-6 flex flex-col justify-between border border-white/20"
          style={{ backgroundColor: baseColor }}
          whileHover={{ y: -5, rotate: [0, -1, 1, -1, 0] }}
          transition={{ duration: 0.3 }}
        >

        {stampImage && (
         <img
          src={`${stampImage}`}
          alt=""
          className="absolute top-3 right-3 w-20 h-20 object-contain pointer-events-none"
        />
        )}

          <div className="mt-auto">
            <h3 className={`font-serif text-lg font-medium ${getTextColor(colorHex)}`}>{title}</h3>
          </div>
        </motion.div>

        {/* Back of envelope */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-lg shadow-md overflow-hidden border border-white/20"
          style={{
            transform: "rotateY(180deg)",
            backgroundColor: baseColor,
          }}
        >
          {/* Envelope interior shadow for depth */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none z-[1]"></div>

          {/* SVG Definitions for gradients */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id={`${envelopeId}-flapGradient`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={baseColor} />
                <stop offset="100%" stopColor={darkerColor} />
              </linearGradient>
              <linearGradient id={`${envelopeId}-leftFlapGradient`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={baseColor} />
                <stop offset="100%" stopColor={darkerColor} />
              </linearGradient>
              <linearGradient id={`${envelopeId}-rightFlapGradient`} x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={baseColor} />
                <stop offset="100%" stopColor={darkerColor} />
              </linearGradient>
              <linearGradient id={`${envelopeId}-bottomFlapGradient`} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={evenDarkerColor} />
                <stop offset="100%" stopColor={darkerColor} />
              </linearGradient>
            </defs>
          </svg>

          {/* Envelope flap - remains visible when open */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[55%] origin-top z-10"
            initial={false}
            animate={{
              rotateX: flapOpen ? -170 : 0,
              y: flapOpen ? -5 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: flapOpen ? 0 : 0.2 }}
            style={{
              transformStyle: "preserve-3d",
              boxShadow: flapOpen ? "0 -4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
            }}
          >
            <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="w-full h-full drop-shadow-sm">
              <path
                d="M0,0 C20,10 35,30 50,55 C65,30 80,10 100,0 L0,0 Z"
                fill={`url(#${envelopeId}-flapGradient)`}
                className="drop-shadow-sm"
              />
            </svg>
          </motion.div>

          {/* Side flaps with consistent coloring */}
          <div className="absolute bottom-0 left-0 w-full h-full z-[1]">
            {/* Left flap */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <polygon
                points="0,100 0,0 100,100"
                fill={`url(#${envelopeId}-leftFlapGradient)`}
                className="drop-shadow-sm"
              />
            </svg>
          </div>

          {/* Right flap */}
          <div className="absolute bottom-0 right-0 w-full h-full z-[1]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <polygon
                points="0,100 100,0 100,100"
                fill={`url(#${envelopeId}-rightFlapGradient)`}
                className="drop-shadow-sm"
              />
            </svg>
          </div>

          {/* Bottom flap with consistent coloring */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 z-0">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
              <polygon points="0,50 100,50 100,0 50,25 0,0" fill={`url(#${envelopeId}-bottomFlapGradient)`} />
            </svg>
          </div>

          {/* Letter inside envelope - folded paper that slides out */}
          <AnimatePresence>
            {!paperExpanded && paperVisible && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-[5]"
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: -30,
                  opacity: 1,
                }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="w-[80%] h-[70%] bg-[#f8f5e6] rounded shadow-inner transform -translate-y-4 border border-[#00000010] overflow-hidden"
                  style={paperStyle}
                >
                  {/* Folded paper effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-0 w-full h-[1px] bg-[#00000010]"></div>
                    <div className="absolute top-2/3 left-0 w-full h-[1px] bg-[#00000010]"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Separate letter modal using portal to ensure it's centered in viewport */}
      <LetterModal message={message} isVisible={paperExpanded} onClose={closeEnvelope} />
    </div>
  )
}
