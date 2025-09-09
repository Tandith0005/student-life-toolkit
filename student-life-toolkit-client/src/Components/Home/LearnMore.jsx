import React from "react";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaSignInAlt,
  FaRocket,
  FaSmile,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaChartLine className="text-4xl mb-4 text-rose-500" />,
      title: "Track Your Progress",
      description:
        "Monitor your academic performance with intuitive visualizations and detailed analytics to stay on top of your goals.",
      action: "Login to view your progress",
      actionColor: "text-rose-500",
    },
    {
      icon: <FaMoneyBillWave className="text-4xl mb-4 text-green-500" />,
      title: "Manage Your Budget",
      description:
        "Keep your finances in check with our student-friendly budgeting tools that help you track expenses and save money.",
      action: "Sign in to start budgeting",
      actionColor: "text-green-500",
    },
    {
      icon: <FaCalendarCheck className="text-4xl mb-4 text-purple-500" />,
      title: "Organize Your Schedule",
      description:
        "Never miss a deadline again! Plan your classes, assignments, and study sessions with our smart scheduling system.",
      action: "Join now to get organized",
      actionColor: "text-purple-500",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-rose-500">-----</span> Everything You Need to
            Succeed <span className="text-rose-500">-----</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform brings all your student tools together in one place,
            making it easier than ever to stay on top of your academic life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-50"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                {feature.description}
              </p>
              <p
                onClick={() => navigate("/login")}
                className={`font-medium text-center flex items-center justify-center cursor-pointer ${feature.actionColor}`}
              >
                <FaSignInAlt className="mr-2" />
                {feature.action}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
          <div className="max-w-3xl mx-auto">
            <FaRocket className="text-5xl mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Student Experience?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who are already enjoying a more
              organized and productive academic life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 transition duration-300 flex items-center justify-center cursor-pointer"
              >
                <FaSignInAlt className="mr-2" />
                Login to Get Started
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  window.scrollTo(0, 0);
                }}
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition duration-300 flex items-center justify-center cursor-pointer"
              >
                <FaSmile className="mr-2" />
                Explore Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
