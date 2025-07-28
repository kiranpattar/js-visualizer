import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditorPage from "./EditorPage";
import Layout from "./Layout";
import eventLoop from "../images/event-loop.png";

function Docs() {
  return (
    <div className="p-8 max-w-5xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4">📘 JavaScript Visualizer Documentation</h2>
      <p className="text-lg mb-6">
        Learn how to use the <strong>JS Visualizer</strong> to master JavaScript internals like the event loop, call stack, micro/macro tasks, and async behavior.
      </p>
      
      <div className="mb-6">
        <img
          src={eventLoop}
          style={{width:"50%"}}
          alt="Event Loop Infographic"
          className="rounded-xl shadow-md w-full max-w-xl mx-auto"
        />
      </div>

      <div className="space-y-6 text-base leading-relaxed">
        <section>
          <h3 className="text-xl font-semibold">🧠 Call Stack</h3>
          <p>
            The <strong>Call Stack</strong> is like a to-do list for JavaScript. It keeps track of function calls using a <strong>LIFO</strong> (Last In, First Out) structure.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">🌀 Event Loop</h3>
          <p>
            Constantly monitors the call stack and handles async tasks. If the stack is empty, it moves callbacks from the <strong>queue</strong> to be executed.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">⏳ Web APIs</h3>
          <p>
            Browser features like <code>setTimeout</code> and <code>fetch</code>. These run outside the JS engine and return control via callbacks.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">📥 Callback Queue</h3>
          <p>
            Stores callback functions after APIs finish. Once the call stack is empty, these are executed in order.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">⚡ Microtask Queue</h3>
          <p>
            Stores promises and `queueMicrotask` callbacks. Gets priority over the callback queue—executed immediately after the stack clears.
          </p>
        </section>

        <p className="mt-8 text-lg">
          Together, these components make JavaScript <strong>single-threaded yet asynchronous</strong> — enabling smooth user experiences and background operations.
        </p>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="p-8 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6">ℹ️ About Kiran Pattar</h1>

      <p className="text-lg font-semibold">Software Architect | Product Leader | Frontend Expert</p>
      <p className="mt-4 text-base">
        I’m <strong>Kiran Pattar</strong>, a software architect with 16+ years of experience in building high-performance, scalable applications using modern web technologies.
      </p>
      <p className="mt-2">
        Creator of <strong>JS Visualizer</strong> — a powerful learning tool to explore JavaScript internals like the Event Loop and Call Stack.
      </p>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">🔧 Technical Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ul className="list-disc list-inside">
            <li><strong>Languages:</strong> JavaScript, HTML5, CSS3, Node.js</li>
            <li><strong>Frameworks:</strong> React, Redux, Redux-Saga, AngularJS</li>
            <li><strong>Mobile:</strong> Cordova, jQuery Mobile</li>
          </ul>
          <ul className="list-disc list-inside">
            <li><strong>Databases:</strong> MongoDB, Cassandra</li>
            <li><strong>DevOps:</strong> Jenkins, AWS, Bamboo, SonarQube</li>
            <li><strong>Practices:</strong> Agile, Scrum, Responsive Design</li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">🚀 Key Achievements</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Delivered UX-driven features across enterprise-scale applications.</li>
          <li>Launched new products from idea to market in leadership roles.</li>
          <li>Architected large React codebases across BFSI and telecom domains.</li>
          <li>Mentored teams on scalable architecture and clean code practices.</li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">🎯 Career Highlights</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Architect @ Lumine Group (2024)</li>
          <li>Senior Architect @ Synchronoss (2018–2024)</li>
          <li>Technical Leader @ Indecomm</li>
          <li>Engineer @ Cisco, 24/7 iLabs, TATA Elxsi, Peertone</li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">📫 Let’s Connect</h3>
        <ul className="list-none space-y-2">
          <li>📍 Bengaluru, India</li>
          <li className="text-xl font-bold text-orange-600">📧 pattar.kiran@gmail.com</li>
          <li>
            🔗{" "}
            <a
              href="https://linkedin.com/in/kiranpattar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-lg"
            >
              LinkedIn Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EditorPage />} />
          <Route path="docs" element={<Docs />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Main;
