"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface PrivateProfile {
  name: string;
}

// call github api through backend.

export default function PrivateRecap() {
  const [profile, setProfile] = useState<PrivateProfile | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>("");
}
