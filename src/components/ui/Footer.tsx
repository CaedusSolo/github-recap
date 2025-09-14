"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black backdrop-blur-md shadow-lg border-t border-gray-800 py-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-500/10 blur-3xl opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Links */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 text-sm sm:text-base lg:text-lg font-medium text-gray-300">
          <Link href="#about" className="hover:text-pink-400 transition">
            About
          </Link>
          <Link href="#education" className="hover:text-pink-400 transition">
            Education
          </Link>
          <Link href="#projects" className="hover:text-pink-400 transition">
            Projects
          </Link>
          <Link href="#skills" className="hover:text-pink-400 transition">
            Skills
          </Link>
          <Link href="#contact" className="hover:text-pink-400 transition">
            Contact
          </Link>
          <Link
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            Resume/CV
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-200 text-sm">
          © {new Date().getFullYear()} YT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
