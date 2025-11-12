"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { LiquidGlass } from '@liquidglass/react';

export default function SmartManufacturingSite() {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 text-center font-sans relative overflow-hidden">
      {/* Layer 1: Liquid Glass Animation */}
      <LiquidGlass
        className="absolute inset-0 z-0"
        {...({
          config: {
            color: '#60A5FA', // Tailwind blue-400
            speed: 0.8,
            density: 0.6,
            blur: 120,
            distortion: 0.35,
            opacity: 0.4,
            lightIntensity: 0.7,
          },
        } as any)}
      />

      {/* Layer 2: Animated Gradient Lines */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-[2px] bg-gradient-to-r from-blue-400 via-sky-300 to-transparent opacity-50"
            style={{ top: `${25 + i * 30}%` }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`vert-${i}`}
            className="absolute h-full w-[2px] bg-gradient-to-b from-sky-400 via-blue-300 to-transparent opacity-40"
            style={{ left: `${20 + i * 40}%` }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 40 + i * 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="flex justify-between items-center w-full px-10 py-6 backdrop-blur-md z-10">
        <h1 className="text-xl font-semibold text-blue-900 tracking-wide">SmartManufacture</h1>
        <Button onClick={() => setOpen(true)} className="bg-white text-blue-700 hover:bg-blue-50 transition-transform duration-300 hover:scale-105 shadow-md">
          Join Waitlist
        </Button>
      </header>

      {/* Waitlist Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md backdrop-blur-2xl bg-white/60 border border-white/40 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-blue-800 text-xl font-semibold">Join the Revolution</DialogTitle>
          </DialogHeader>
          {success ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-green-600 text-center py-4"
            >
              Thank you! You’ve joined the revolution. 🚀
            </motion.p>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
                {loading ? 'Submitting...' : 'Join Waitlist'}
              </Button>
            </motion.form>
          )}
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 md:px-0 z-10 mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-blue-900 drop-shadow-lg tracking-tight"
        >
          Powering the Future of Smart Manufacturing
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-blue-700 mt-4 mb-10 max-w-2xl backdrop-blur-sm bg-white/20 p-4 rounded-xl"
        >
          Reimagining Indian manufacturing with AI, robotics, and intelligent systems that make factories smarter, faster, and self-learning.
        </motion.h2>

        {/* Logo Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="flex flex-col items-center bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/30">
            <p className="text-blue-900 font-semibold mb-4 tracking-wide">INSIGHT | FACTORY | SEWBOTICS | DRISTI</p>
          </Card>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="mt-12"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Button onClick={() => setOpen(true)} className="px-6 py-3 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 flex items-center gap-2 shadow-xl shadow-blue-400/40">
            Join the revolution
            <motion.span
              animate={{ x: hovered ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiArrowRight />
            </motion.span>
          </Button>
        </motion.div>
      </main>

      {/* Footer Cloud Effect */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

/*
📘 CHANGE GUIDE:
1️⃣ Install @liquidglass/react → `npm install @liquidglass/react`
2️⃣ Update Google Apps Script URL in 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'.
3️⃣ Added slow-moving gradient lines horizontally and vertically for futuristic motion.
4️⃣ Adjust duration (30–50s) for smoother or faster animation.
*/
