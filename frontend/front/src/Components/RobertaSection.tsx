"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Award } from "lucide-react";

export default function RobertaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w mx-auto my-8 overflow-hidden rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
            <div className="w-full md:w-2/5 p-6 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: imageLoaded ? 1 : 0,
                  scale: imageLoaded ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
                className="relative w-full aspect-[3/4] max-w-xs"
              >
                <Image
                  src="/assets/roberta2.jpg"
                  alt="Roberta, nuestra mejor clienta"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-xl"
                  onLoadingComplete={() => setImageLoaded(true)}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-purple-800 via-transparent to-transparent opacity-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <span className="text-purple-800 font-semibold">
                    #RobertaApproved
                  </span>
                </motion.div>
              </motion.div>
            </div>
            <div className="w-full md:w-3/5 p-6 bg-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Badge
                  variant="secondary"
                  className="mb-3 text-base px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  Nuestra Estrella
                </Badge>
                <h2 className="text-3xl font-mono font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Conozca a Roberta
                </h2>
                <p className="text-lg mb-3 text-gray-700 leading-relaxed">
                  Nuestra mejor clienta y crítica más exigente de productos de
                  limpieza
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  Roberta asegura que todos nuestros productos sean seguros para
                  hogares con mascotas. ¡Si Roberta lo aprueba, sabes que es
                  bueno!
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                      onClick={handleLike}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likes > 0 ? "text-red-500 fill-red-500" : ""
                        }`}
                      />
                      <span>{likes}</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                      onClick={() => setShowQuote(!showQuote)}
                    >
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span>Ver testimonio</span>
                    </Button>
                  </motion.div>
                </div>
                <AnimatePresence>
                  {showQuote && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-purple-100 p-4 rounded-lg mb-4"
                    >
                      <p className="text-purple-800 italic text-sm">
                        Los productos que pruebo no solo limpian, ¡hacen que mi
                        hogar brille con seguridad para mis mascotas! Cada
                        producto pasa por mi rigurosa evaluación, asegurando que
                        sean efectivos y seguros para toda la familia,
                        incluyendo a nuestros amigos peludos.
                      </p>
                      <p className="text-purple-600 font-semibold mt-2 text-sm">
                        - Roberta
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  ))}
                  <span className="text-gray-600 ml-2 text-base">(5.0)</span>
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
