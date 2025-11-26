import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCw, ZoomIn, ZoomOut, Camera, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface ARCakePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  cakeType: string;
  flavor: string;
  theme: string;
}

const ARCakePreview: React.FC<ARCakePreviewProps> = ({
  isOpen,
  onClose,
  cakeType,
  flavor,
  theme
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if device supports camera
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device');
      }

      // Request camera access (rear camera preferred for AR)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use rear camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      setIsLoading(false);
      toast({
        title: "AR Mode Activated! 📱",
        description: "Point your camera where you'd like to place the cake"
      });
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please grant camera permissions.');
      setIsLoading(false);
      toast({
        title: "Camera Error 📷",
        description: "Please allow camera access to use AR preview",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        // Download the image
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cake-ar-preview-${Date.now()}.jpg`;
            a.click();
            URL.revokeObjectURL(url);
            
            toast({
              title: "Photo Saved! 📸",
              description: "AR preview has been downloaded"
            });
          }
        }, 'image/jpeg');
      }
    }
  };

  const getCakeEmoji = (type: string) => {
    if (type?.includes('Cake')) return '🎂';
    if (type?.includes('Cupcake')) return '🧁';
    if (type?.includes('Pastries')) return '🥐';
    if (type?.includes('Cookie')) return '🍪';
    if (type?.includes('Brownie')) return '🍫';
    return '🎂';
  };

  // Realistic cake color gradients
  const getCakeColors = (flavor: string) => {
    if (flavor?.includes('Chocolate')) return {
      base: 'linear-gradient(135deg, #6F4E37 0%, #8B4513 50%, #5C4033 100%)',
      frosting: 'linear-gradient(135deg, #A0522D 0%, #8B4513 50%, #654321 100%)',
      accent: '#D2691E',
      shadow: 'rgba(101, 67, 33, 0.4)'
    };
    if (flavor?.includes('Strawberry')) return {
      base: 'linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 50%, #FFC0CB 100%)',
      frosting: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 50%, #FF1493 100%)',
      accent: '#FF69B4',
      shadow: 'rgba(255, 105, 180, 0.4)'
    };
    if (flavor?.includes('Blueberry')) return {
      base: 'linear-gradient(135deg, #E6E6FA 0%, #9370DB 50%, #8A2BE2 100%)',
      frosting: 'linear-gradient(135deg, #9370DB 0%, #8A2BE2 50%, #4B0082 100%)',
      accent: '#9370DB',
      shadow: 'rgba(147, 112, 219, 0.4)'
    };
    if (flavor?.includes('Vanilla')) return {
      base: 'linear-gradient(135deg, #FFFACD 0%, #FFF8DC 50%, #FFE4B5 100%)',
      frosting: 'linear-gradient(135deg, #FFFFFF 0%, #FFFACD 50%, #F5F5DC 100%)',
      accent: '#FFD700',
      shadow: 'rgba(255, 215, 0, 0.3)'
    };
    return {
      base: 'linear-gradient(135deg, #FFE4B5 0%, #FFDAB9 50%, #FFB347 100%)',
      frosting: 'linear-gradient(135deg, #FFE4E1 0%, #FFDAB9 50%, #FFB6C1 100%)',
      accent: '#FFB347',
      shadow: 'rgba(255, 179, 71, 0.4)'
    };
  };

  const cakeColors = getCakeColors(flavor);
  const cakeEmoji = getCakeEmoji(cakeType);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black"
        >
          {/* Camera View */}
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
                  <p className="text-lg">Activating AR Camera...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center text-white p-6">
                  <p className="text-xl mb-4">📷 {error}</p>
                  <Button onClick={onClose} variant="outline">
                    Close
                  </Button>
                </div>
              </div>
            )}

            {/* Video Stream */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Hidden canvas for photo capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* AR Overlay - Professional 3D Cake */}
            {!isLoading && !error && (
              <div className="absolute inset-0 pointer-events-none">
                {/* 3D Cake Visualization */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1200px',
                  }}
                  animate={{
                    scale: [scale, scale * 1.01, scale],
                    y: [-5, 5, -5],
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div 
                    className="relative"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `scale(${scale}) rotateY(${rotation}deg) rotateX(-10deg)`,
                    }}
                  >
                    {/* Base Plate */}
                    <div
                      className="w-64 h-4 rounded-full absolute -bottom-8"
                      style={{
                        background: 'linear-gradient(135deg, #E5E5E5 0%, #FFFFFF 50%, #D3D3D3 100%)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2), inset 0 2px 6px rgba(255,255,255,0.8)',
                        transform: 'translateZ(-15px) rotateX(75deg)',
                      }}
                    />

                    {/* Bottom Layer - Realistic Cake */}
                    <div
                      className="w-56 h-24 rounded-3xl relative overflow-hidden"
                      style={{
                        background: cakeColors.base,
                        boxShadow: `
                          0 30px 60px ${cakeColors.shadow},
                          inset 0 -10px 20px rgba(0,0,0,0.15),
                          inset 0 10px 20px rgba(255,255,255,0.2)
                        `,
                        transform: 'translateZ(0px)',
                        border: '3px solid rgba(255,255,255,0.15)'
                      }}
                    >
                      {/* Cake Texture */}
                      <div className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `
                            repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, transparent 4px, transparent 8px),
                            repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, transparent 4px, transparent 8px)
                          `
                        }}
                      />
                      {/* Top Highlight */}
                      <div className="absolute top-0 left-0 right-0 h-10 rounded-t-3xl"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)'
                        }}
                      />
                      {/* Frosting Drip */}
                      <div className="absolute -top-2 left-0 right-0 h-6 rounded-t-3xl overflow-hidden"
                        style={{
                          background: cakeColors.frosting,
                          boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.1)',
                        }}
                      >
                        {/* Drip details */}
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-3 w-6 rounded-b-full"
                            style={{
                              background: cakeColors.frosting,
                              left: `${i * 14}%`,
                              top: '60%',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Middle Layer */}
                    <div
                      className="w-48 h-20 rounded-3xl relative mx-auto -mt-4 overflow-hidden"
                      style={{
                        background: cakeColors.base,
                        boxShadow: `
                          0 25px 50px ${cakeColors.shadow},
                          inset 0 -8px 16px rgba(0,0,0,0.15),
                          inset 0 8px 16px rgba(255,255,255,0.2)
                        `,
                        transform: 'translateZ(30px)',
                        border: '3px solid rgba(255,255,255,0.15)'
                      }}
                    >
                      <div className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, transparent 4px, transparent 8px)`
                        }}
                      />
                      <div className="absolute top-0 left-0 right-0 h-8 rounded-t-3xl"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)'
                        }}
                      />
                      <div className="absolute -top-2 left-0 right-0 h-5 rounded-t-3xl"
                        style={{
                          background: cakeColors.frosting,
                          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4)',
                        }}
                      >
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-2.5 w-5 rounded-b-full"
                            style={{
                              background: cakeColors.frosting,
                              left: `${i * 16}%`,
                              top: '60%',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Top Layer */}
                    <div
                      className="w-40 h-16 rounded-3xl relative mx-auto -mt-4 overflow-hidden"
                      style={{
                        background: cakeColors.base,
                        boxShadow: `
                          0 20px 40px ${cakeColors.shadow},
                          inset 0 -6px 12px rgba(0,0,0,0.15),
                          inset 0 6px 12px rgba(255,255,255,0.2)
                        `,
                        transform: 'translateZ(60px)',
                        border: '3px solid rgba(255,255,255,0.15)'
                      }}
                    >
                      <div className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, transparent 4px, transparent 8px)`
                        }}
                      />
                      <div className="absolute top-0 left-0 right-0 h-6 rounded-t-3xl"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)'
                        }}
                      />
                      {/* Top Frosting */}
                      <div className="absolute -top-3 left-0 right-0 h-6 rounded-full"
                        style={{
                          background: cakeColors.frosting,
                          boxShadow: `
                            inset 0 3px 6px rgba(255,255,255,0.5),
                            0 4px 10px ${cakeColors.shadow}
                          `
                        }}
                      />
                    </div>

                    {/* Decorative Pearls/Sprinkles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3.5 h-3.5 rounded-full"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${cakeColors.accent}, ${cakeColors.accent}dd)`,
                          boxShadow: `
                            0 3px 6px rgba(0,0,0,0.3),
                            inset 1px 1px 2px rgba(255,255,255,0.6)
                          `,
                          top: `${25 + (i * 10)}%`,
                          left: i % 2 === 0 ? '8%' : '88%',
                          transform: `translateZ(${70 + (i * 6)}px)`,
                        }}
                        animate={{
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}

                    {/* Realistic Candles */}
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="absolute -top-12"
                        style={{
                          left: `${32 + (i * 18)}%`,
                          transform: `translateZ(90px)`,
                        }}
                      >
                        {/* Candle Body */}
                        <div className="w-3 h-12 rounded-full relative"
                          style={{
                            background: 'linear-gradient(90deg, #FF6B9D 0%, #FFB6C1 40%, #FFA07A 60%, #FF6B9D 100%)',
                            boxShadow: `
                              inset -2px 0 4px rgba(0,0,0,0.25),
                              inset 2px 0 4px rgba(255,255,255,0.4),
                              0 6px 12px rgba(0,0,0,0.2)
                            `
                          }}
                        >
                          {/* Wick */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-gray-900" />
                        </div>
                        {/* Realistic Flame */}
                        <motion.div
                          className="absolute -top-6 left-1/2 -translate-x-1/2"
                          animate={{
                            scale: [1, 1.2, 0.95, 1.15, 1],
                            y: [0, -3, 1, -2, 0],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          {/* Outer Glow */}
                          <div className="absolute inset-0 w-5 h-7 rounded-full blur-lg"
                            style={{
                              background: 'radial-gradient(circle, rgba(255,200,0,0.9) 0%, rgba(255,100,0,0.5) 40%, transparent 70%)',
                            }}
                          />
                          {/* Flame Shape */}
                          <div className="relative w-4 h-6"
                            style={{
                              background: 'linear-gradient(to top, #FFD700 0%, #FFA500 25%, #FF8C00 50%, #FF6347 75%, #FF4500 100%)',
                              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                              boxShadow: '0 0 15px rgba(255,165,0,0.9), 0 0 25px rgba(255,100,0,0.6)',
                            }}
                          >
                            {/* Inner Highlight */}
                            <div className="absolute top-2 left-1.5 w-1.5 h-3 rounded-full bg-yellow-100 opacity-70 blur-sm" />
                          </div>
                        </motion.div>
                      </div>
                    ))}

                    {/* Category Badge */}
                    <motion.div
                      className="absolute -top-20 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full shadow-2xl border-3"
                      style={{
                        transform: 'translateZ(120px) translateX(-50%)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
                        backdropFilter: 'blur(10px)',
                        borderColor: cakeColors.accent,
                        borderWidth: '3px',
                        boxShadow: `0 8px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.8) inset`
                      }}
                      animate={{
                        y: [0, -6, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                    >
                      <span className="text-3xl filter drop-shadow-lg">{cakeEmoji}</span>
                    </motion.div>

                    {/* Enhanced Shadow */}
                    <div
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-80 h-16 rounded-full blur-3xl"
                      style={{
                        background: `radial-gradient(ellipse, ${cakeColors.shadow} 0%, rgba(0,0,0,0.3) 30%, transparent 70%)`,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Professional Info Card */}
                <motion.div
                  className="absolute bottom-32 left-4 right-4 rounded-2xl shadow-2xl overflow-hidden"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <div 
                    className="backdrop-blur-xl p-6 border-2"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)',
                      borderColor: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg"
                        style={{
                          background: cakeColors.frosting,
                        }}
                      >
                        {cakeEmoji}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl">Your Custom Creation</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          AR Preview Mode
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className="rounded-xl p-3 border-2"
                        style={{
                          background: 'rgba(255,255,255,0.7)',
                          borderColor: 'rgba(0,0,0,0.05)',
                        }}
                      >
                        <span className="text-xs text-gray-500 font-medium block mb-1">Type</span>
                        <p className="font-bold text-gray-900">{cakeType}</p>
                      </div>
                      <div 
                        className="rounded-xl p-3 border-2"
                        style={{
                          background: 'rgba(255,255,255,0.7)',
                          borderColor: 'rgba(0,0,0,0.05)',
                        }}
                      >
                        <span className="text-xs text-gray-500 font-medium block mb-1">Flavor</span>
                        <p className="font-bold text-gray-900">{flavor}</p>
                      </div>
                      <div 
                        className="col-span-2 rounded-xl p-3 border-2"
                        style={{
                          background: 'rgba(255,255,255,0.7)',
                          borderColor: 'rgba(0,0,0,0.05)',
                        }}
                      >
                        <span className="text-xs text-gray-500 font-medium block mb-1">Theme</span>
                        <p className="font-bold text-gray-900">{theme}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Placement Guide */}
                <motion.div
                  className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-xl"
                  style={{
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(10px)',
                  }}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-white text-sm font-medium">📱 Move your phone to place the cake</p>
                </motion.div>
              </div>
            )}

            {/* Enhanced Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent pointer-events-auto">
              <motion.div
                className="max-w-md mx-auto space-y-3"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {/* Primary Actions */}
                <div className="flex items-center justify-between gap-3">
                  <Button
                    onClick={() => setRotation(r => r + 45)}
                    size="lg"
                    className="flex-1 bg-white/15 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/25 hover:scale-105 transition-all shadow-xl"
                  >
                    <RotateCw className="w-5 h-5 mr-2" />
                    Rotate
                  </Button>

                  <Button
                    onClick={capturePhoto}
                    size="lg"
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-2xl hover:scale-110 transition-all"
                  >
                    <Camera className="w-10 h-10" />
                  </Button>

                  <Button
                    onClick={onClose}
                    size="lg"
                    className="flex-1 bg-white/15 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/25 hover:scale-105 transition-all shadow-xl"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Close
                  </Button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setScale(s => Math.max(0.5, s - 0.15))}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/10 backdrop-blur-sm border-white/25 text-white hover:bg-white/20 transition-all"
                  >
                    <ZoomOut className="w-4 h-4 mr-2" />
                    Zoom Out
                  </Button>
                  
                  <div className="px-4 py-2 bg-white/15 backdrop-blur-md rounded-lg border border-white/25">
                    <span className="text-white font-bold text-sm">{(scale * 100).toFixed(0)}%</span>
                  </div>

                  <Button
                    onClick={() => setScale(s => Math.min(2.5, s + 0.15))}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/10 backdrop-blur-sm border-white/25 text-white hover:bg-white/20 transition-all"
                  >
                    <ZoomIn className="w-4 h-4 mr-2" />
                    Zoom In
                  </Button>
                </div>

                {/* Instructions */}
                <div className="text-center space-y-1">
                  <p className="text-white/90 text-xs font-medium">
                    Pinch to zoom • Drag to rotate • Tap capture to save
                  </p>
                  <p className="text-white/60 text-xs">
                    Powered by Aishu's Dunkin Delicacies AR
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ARCakePreview;
