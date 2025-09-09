import React from "react";
import Navbar from "../Common/Navbar";
import { Outlet } from "react-router";
import Footer from "../Common/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex-grow">
        <div className="text-gray-600">
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                fontSize: "18px",
                padding: "16px",
                borderRadius: "10px",
              },
              success: {
                style: {
                  background: "#4ade80",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#f87171",
                  color: "#fff",
                },
              },
            }}
          />

          <nav>
            <Navbar />
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;