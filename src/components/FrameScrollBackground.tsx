"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FrameScrollBackgroundProps {
  onLoadComplete?: () => void;
}

export default function FrameScrollBackground({ onLoadComplete }: FrameScrollBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const totalFrames = 240;
  const frameWidth = 848;
  const frameHeight = 478;

  // Track scroll animation frame
  const animationFrameRef = useRef<{ frame: number }>({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = scrollContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle canvas resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawActiveFrame(animationFrameRef.current.frame);
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cover drawing algorithm
    const drawActiveFrame = (index: number) => {
      const roundedIndex = Math.round(index);
      if (roundedIndex === lastDrawnFrameRef.current) return;
      const img = imagesRef.current[roundedIndex];
      if (!img || !img.complete) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const canvasRatio = canvasWidth / canvasHeight;
      const imageRatio = frameWidth / frameHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imageRatio) {
        drawHeight = canvasWidth / imageRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imageRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      lastDrawnFrameRef.current = index;
    };

    // Preload frames in background
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Load first frame immediately as a poster
    const posterImg = new Image();
    posterImg.src = `/frames/frame_00000.jpg`;
    posterImg.onload = () => {
      images[0] = posterImg;
      imagesRef.current[0] = posterImg;
      drawActiveFrame(0);
      
      // Now load the rest
      loadRemainingFrames();
    };
    posterImg.onerror = () => {
      console.error("Failed to load poster frame 0.");
      loadRemainingFrames();
    };

    const handleImageLoad = (idx: number, loadedImg: HTMLImageElement) => {
      imagesRef.current[idx] = loadedImg;
      loadedCount++;
      
      const progress = Math.round((loadedCount / (totalFrames - 1)) * 100);
      setLoadProgress(progress);
      
      if (loadedCount >= totalFrames - 1) {
        setIsLoaded(true);
        if (onLoadComplete) onLoadComplete();
      }
    };

    const loadRemainingFrames = () => {
      for (let i = 0; i < totalFrames; i++) {
        if (i === 0) continue; // already loaded poster
        
        const img = new Image();
        img.src = `/frames/frame_${String(i).padStart(5, "0")}.jpg`;
        
        img.onload = () => {
          images[i] = img;
          handleImageLoad(i, img);
        };

        img.onerror = () => {
          const fallbackImg = imagesRef.current[i - 1] || posterImg;
          handleImageLoad(i, fallbackImg);
        };
      }
    };

    // Bind GSAP ScrollTrigger to scrub through frames ONLY in the Hero zone (3.5 viewports)
    const scrollObj = animationFrameRef.current;
    const tl = gsap.to(scrollObj, {
      frame: totalFrames - 1,
      ease: "none",
      scrollTrigger: {
        trigger: "html",
        start: "top top",
        end: () => `+=${window.innerHeight * 3.5}`, // scrub animation over 3.5 viewports
        scrub: 0.2, // fine scrubbing for smoothness
        onUpdate: () => {
          drawActiveFrame(scrollObj.frame);
        },
      },
    });

    // Fade out the entire background container as user scrolls past the Hero zone
    const fadeTl = gsap.to(container, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "html",
        start: () => `+=${window.innerHeight * 3.0}`, // start fading at 3.0 viewport height
        end: () => `+=${window.innerHeight * 3.5}`,   // fully faded out at 3.5 height
        scrub: true,
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tl.kill();
      fadeTl.kill();
    };
  }, [onLoadComplete]);

  // Recalculate ScrollTrigger markers after the loading overlay hides
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <>
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg">
          <div className="flex flex-col items-center space-y-6">
            {/* Elegant Monogram Outline Loader */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full text-gold animate-pulse-glow" viewBox="0 0 100 100">
                <path
                  d="M40,20 L60,20 L60,70 Q60,80 50,80 Q40,80 40,70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="200"
                  strokeDashoffset="0"
                />
                <path
                  d="M40,50 Q60,50 60,65 Q60,80 40,80 L35,80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="200"
                  strokeDashoffset="0"
                />
              </svg>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="font-display text-2xl tracking-[0.2em] text-gold-light uppercase">
                Larkspire Studios
              </h2>
              <p className="text-xs text-text-muted tracking-[0.3em] uppercase">
                Loading Cinematic Space {loadProgress}%
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-48 h-[2px] bg-bg-alt border border-white/5 relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-accent transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Scroll Background Wrapper */}
      <div 
        ref={scrollContainerRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: isLoaded ? 1 : 0, zIndex: 0 }}
      >
        {/* Canvas Video Frames Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none object-cover"
          style={{ opacity: 0.75 }}
        />

        {/* Vignette Overlay for Depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle, transparent 20%, rgba(10, 10, 10, 0.75) 75%, rgba(10, 10, 10, 1) 100%)",
          }}
        />
      </div>
    </>
  );
}
