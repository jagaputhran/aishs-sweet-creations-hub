import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCw, ZoomIn, ZoomOut, Camera } from 'lucide-react';
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

  const getCakeColor = (flavor: string) => {
    if (flavor?.includes('Chocolate')) return '#8B4513';
    if (flavor?.includes('Strawberry')) return '#FFB6C1';
    if (flavor?.includes('Blueberry')) return '#6495ED';
    if (flavor?.includes('Vanilla')) return '#F5DEB3';
    return '#FFD700';
  };

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

            {/* AR Overlay - 3D Cake Representation */}
            {!isLoading && !error && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    {/* Crosshair lines */}
                    <div className="absolute w-8 h-0.5 bg-white opacity-50 left-1/2 -translate-x-1/2"></div>
                    <div className="absolute w-0.5 h-8 bg-white opacity-50 top-1/2 -translate-y-1/2"></div>
                    
                    {/* 3D Cake Model Placeholder */}
                    <motion.div
                      animate={{
                        scale: [scale, scale * 1.02, scale],
                        rotate: rotation
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 0.3 }
                      }}
                      className="relative w-48 h-48"
                      style={{
                        transform: `scale(${scale}) rotate(${rotation}deg)`,
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                      }}
                    >
                      {/* Simplified 3D Cake Visualization */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Shadow */}
                        <div 
                          className="absolute bottom-0 w-40 h-8 rounded-full opacity-30 blur-xl"
                          style={{ backgroundColor: 'black' }}
                        ></div>
                        
                        {/* Cake Base (3D effect with layers) */}
                        <div className="relative">
                          {/* Bottom layer */}
                          <div 
                            className="w-32 h-16 rounded-lg border-4 border-white/30 relative"
                            style={{
                              backgroundColor: getCakeColor(flavor),
                              background: `linear-gradient(135deg, ${getCakeColor(flavor)} 0%, ${getCakeColor(flavor)}dd 100%)`,
                              transform: 'perspective(400px) rotateX(15deg)',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.3)'
                            }}
                          >
                            {/* Frosting effect */}
                            <div className="absolute -top-2 left-0 right-0 h-3 bg-white/80 rounded-t-lg"></div>
                          </div>
                          
                          {/* Top layer */}
                          <div 
                            className="w-24 h-12 rounded-lg border-4 border-white/30 absolute -top-10 left-1/2 -translate-x-1/2"
                            style={{
                              backgroundColor: getCakeColor(flavor),
                              background: `linear-gradient(135deg, ${getCakeColor(flavor)}ee 0%, ${getCakeColor(flavor)}bb 100%)`,
                              transform: 'perspective(400px) rotateX(15deg)',
                              boxShadow: '0 5px 20px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.3)'
                            }}
                          >
                            {/* Frosting */}
                            <div className="absolute -top-2 left-0 right-0 h-2 bg-white/80 rounded-t-lg"></div>
                            {/* Candle */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-6 bg-pink-300 rounded-sm">
                              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3">
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                                  transition={{ duration: 0.5, repeat: Infinity }}
                                  className="w-full h-full bg-yellow-400 rounded-full blur-sm"
                                ></motion.div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Emoji overlay */}
                          <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-6xl opacity-90">
                            {getCakeEmoji(cakeType)}
                          </div>
                        </div>
                      </div>

                      {/* Info card */}
                      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-center whitespace-nowrap">
                        <p className="text-sm font-semibold">{cakeType}</p>
                        <p className="text-xs opacity-80">{flavor} • {theme}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Placement Guide */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm">
                  📱 Move your phone to place the cake
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {/* Rotate */}
                <Button
                  onClick={() => setRotation(r => r + 45)}
                  variant="outline"
                  size="icon"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  <RotateCw className="w-5 h-5" />
                </Button>

                {/* Zoom Out */}
                <Button
                  onClick={() => setScale(s => Math.max(0.5, s - 0.2))}
                  variant="outline"
                  size="icon"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  <ZoomOut className="w-5 h-5" />
                </Button>

                {/* Capture Photo */}
                <Button
                  onClick={capturePhoto}
                  size="icon"
                  className="w-16 h-16 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg"
                >
                  <Camera className="w-8 h-8" />
                </Button>

                {/* Zoom In */}
                <Button
                  onClick={() => setScale(s => Math.min(2, s + 0.2))}
                  variant="outline"
                  size="icon"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  <ZoomIn className="w-5 h-5" />
                </Button>

                {/* Close */}
                <Button
                  onClick={onClose}
                  variant="outline"
                  size="icon"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Instructions */}
              <div className="text-center mt-4 space-y-2">
                <p className="text-white text-xs opacity-80">
                  Use controls to rotate, zoom, and capture photo
                </p>
                <p className="text-white text-xs opacity-60">
                  Scale: {(scale * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ARCakePreview;
