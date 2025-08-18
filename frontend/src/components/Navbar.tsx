import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/button"; // from reactbits / shadcn
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold text-green-600 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          Saapadu
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="hover:text-green-500">About</a>
          <a href="#features" className="hover:text-green-500">Features</a>
          <a href="#contact" className="hover:text-green-500">Contact</a>
          <Button className="bg-green-600 text-white rounded-xl px-4">Sign In</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-green-700"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          className="flex flex-col gap-4 p-4 bg-white md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <a href="#about" className="hover:text-green-500">About</a>
          <a href="#features" className="hover:text-green-500">Features</a>
          <a href="#contact" className="hover:text-green-500">Contact</a>
          <Button className="bg-green-600 text-white rounded-xl px-4">Sign In</Button>
        </motion.div>
      )}
    </motion.nav>
  );
}
