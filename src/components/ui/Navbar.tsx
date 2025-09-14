"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <navbar className="fixed inset-x-0 p-4 z-50 top-0 dark:bg-black backdrop-blur-md">
      <div className="mx-auto px-4 max-w-7xl sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="hidden md:flex items-center space-x-8 text-sm sm:text-base lg:text-lg font-medium">
            <Link
              href="#about"
              className="nav-link text-gray-300 hover:text-white transition"
            >
              About
            </Link>
            <Link
              href="#education"
              className="nav-link text-gray-300 hover:text-white transition"
            >
              Education
            </Link>
            <Link
              href="#projects"
              className="nav-link text-gray-300 hover:text-white transition"
            >
              Projects
            </Link>
            <Link
              href="#skills"
              className="nav-link text-gray-300 hover:text-white transition"
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="nav-link text-gray-300 hover:text-white transition"
            >
              Contact
            </Link>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              Resume/CV
            </a>
          </div>
        </div>
      </div>
    </navbar>
  );
}
