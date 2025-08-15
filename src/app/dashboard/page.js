"use client";

import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React from "react";
import { createClient } from "@supabase/supabase-js";

// --- CONFIGURATION (REPLACE WITH YOUR KEYS) ---
const firebaseConfig = {
  apiKey: "AIzaSyB2EOCCehXRCUM3UhjEwbog4WLYCIZhu20",
  authDomain: "startup-shores-33f94.firebaseapp.com",
  projectId: "startup-shores-33f94",
  storageBucket: "startup-shores-33f94.firebasestorage.app",
  messagingSenderId: "457165651825",
  appId: "1:457165651825:web:def8ace57c8d9fc7eec0d0",
  measurementId: "G-CELE4KY7YE",
};

const supabaseUrl = "https://qxmquvpvtwlhirlfwkbc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4bXF1dnB2dHdsaGlybGZ3a2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5Mjc1NzgsImV4cCI6MjA3MDUwMzU3OH0.WRlqtvAZTHQzoXytBKi36MFgLNV3e_oI-mzB9TLOM1c";

// --- INITIALIZE CLIENTS ---
// Initialize Firebase safely for Next.js App Router
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
const auth = getAuth(firebaseApp);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * A helper function to check if a user exists in Supabase and create them if not.
 * @param {object} user - The Firebase user object.
 * @param {string} fullName - The user's full name (optional, for new sign-ups).
 */
const syncUserWithSupabase = async (user, fullName = null) => {
  if (!user) return;

  try {
    // Check if user already exists in Supabase
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.uid)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116: "exact one row expected, but 0 rows returned"
      throw fetchError;
    }

    // If user does not exist, create a new record
    if (!data) {
      const newUser = {
        id: user.uid,
        email: user.email,
        full_name: fullName || user.displayName, // Use provided name or Google display name
      };
      const { error: insertError } = await supabase
        .from("users")
        .insert(newUser);
      if (insertError) {
        throw insertError;
      }
      console.log("New user created in Supabase:", newUser);
    } else {
      console.log("User already exists in Supabase:", user.uid);
    }
  } catch (error) {
    console.error("Error syncing user with Supabase:", error.message);
  }
};

// --- UI COMPONENTS ---

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.021,35.596,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);

const DashboardContent = ({ user, onSignOut }) => (
  <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-center text-gray-800">
      Welcome to your Dashboard
    </h2>
    <div className="text-center">
      <p className="text-gray-600">You are logged in as:</p>
      <p className="font-medium text-indigo-600">{user.email}</p>
      {user.displayName && (
        <p className="text-gray-500 text-sm">({user.displayName})</p>
      )}
    </div>
    <button
      onClick={onSignOut}
      className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Sign Out
    </button>
  </div>
);

const AuthComponent = () => {
  const [step, setStep] = useState("initial"); // 'initial', 'password', 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailContinue = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setStep("password");
      } else {
        setStep("signup");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error checking email:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener will handle the rest
    } catch (err) {
      setError(err.message);
      console.error("Error with Google Sign-In:", err);
      setLoading(false);
    }
  };

  const handlePasswordSignIn = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener will handle the rest
    } catch (err) {
      setError("Invalid password. Please try again.");
      console.error("Error signing in with password:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: fullName });
      // The onAuthStateChanged listener will handle syncing with Supabase
    } catch (err) {
      setError(err.message);
      console.error("Error signing up:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep("initial");
    setEmail("");
    setPassword("");
    setFullName("");
    setError("");
  };

  const renderStep = () => {
    switch (step) {
      case "password":
        return (
          <form onSubmit={handlePasswordSignIn} className="space-y-6">
            <div>
              <p className="text-sm text-gray-600">
                Welcome back! Signing in as
              </p>
              <p className="font-semibold text-gray-800">{email}</p>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
            <button
              type="button"
              onClick={resetFlow}
              className="text-xs text-indigo-600 hover:underline"
            >
              Use a different email
            </button>
          </form>
        );
      case "signup":
        return (
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <p className="text-sm text-gray-600">Create a new account for</p>
              <p className="font-semibold text-gray-800">{email}</p>
            </div>
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="sr-only">
                Password
              </label>
              <input
                id="new-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Create a Password"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {loading ? "Creating Account..." : "Agree & Continue"}
              </button>
            </div>
            <button
              type="button"
              onClick={resetFlow}
              className="text-xs text-indigo-600 hover:underline"
            >
              Use a different email
            </button>
          </form>
        );
      case "initial":
      default:
        return (
          <>
            <form onSubmit={handleEmailContinue} className="space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                  {loading ? "Checking..." : "Continue with Email"}
                </button>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-200"
              >
                <GoogleIcon />
                Sign in with Google
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {step === "signup" ? "Create your account" : "Sign in to your account"}
      </h2>
      {error && (
        <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-md">
          {error}
        </p>
      )}
      {renderStep()}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        // This is where we sync with Supabase after any successful auth event.
        // For new signups, the `displayName` might not be immediately available,
        // so we check for it. We assume `syncUserWithSupabase` can handle
        // getting the name from the user object if it exists.
        await syncUserWithSupabase(currentUser, currentUser.displayName);
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // onAuthStateChanged will handle setting user to null
    } catch (error) {
      console.error("Error signing out:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {user ? (
        <DashboardContent user={user} onSignOut={handleSignOut} />
      ) : (
        <AuthComponent />
      )}
    </div>
  );
}
