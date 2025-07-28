import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditorPage from "./EditorPage";
import Layout from "./Layout"; // Shared layout

function Docs() {
  return (
    <div className="p-6 text-lg leading-relaxed">
      📘 <strong>Documentation:</strong> Learn how to use the JS Visualizer effectively to master JavaScript internals, including event loop flow, call stack tracking, micro/macro tasks, and async behavior.
    </div>
  );
}

function About() {
  return (
    <div className="p-6 grid gap-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">ℹ️ About Kiran Pattar</h1>
        <p className="text-lg font-semibold">Software Architect | Product Leader | Frontend Expert</p>
        <p className="mt-2">
          I'm <strong>Kiran Pattar</strong>, a seasoned software architect with 16+ years of experience building scalable web and mobile applications. I specialize in modern frontend stacks like React, Redux, JavaScript, and Node.js.
        </p>
        <p className="mt-2">
          I've led digital transformations, architected mission-critical platforms, and improved development velocity through clean architecture and team mentorship.
        </p>
        <p className="mt-2">
          I'm also the creator of <strong>JS Visualizer</strong> — a real-time JavaScript learning tool that demystifies browser internals like the Event Loop, Call Stack, Microtask Queue, and more.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">🔧 Technical Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="list-disc list-inside">
            <li><strong>Languages:</strong> JavaScript, HTML5, CSS3, Node.js</li>
            <li><strong>Libraries/Frameworks:</strong> React, Redux, Redux-Saga, AngularJS, Webpack</li>
            <li><strong>Mobile:</strong> Cordova, jQuery Mobile</li>
          </ul>
          <ul className="list-disc list-inside">
            <li><strong>Databases:</strong> MongoDB, Cassandra</li>
            <li><strong>DevOps:</strong> Jenkins, Bamboo, AWS, Nexus, SonarQube</li>
            <li><strong>Practices:</strong> Agile, Scrum, PWA, Responsive Design</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">🚀 Key Achievements</h3>
        <ul className="list-disc list-inside grid gap-2">
          <li>
            Built and delivered innovative features that directly enhanced user experience and performance across multiple products.
          </li>
          <li>
            Played a pivotal role in helping companies conceptualize and launch new products, driving them from idea to market.
          </li>
          <li>
            Led architecture and development of highly scalable React applications in enterprise environments including BFSI, Telecom, and Data Platforms.
          </li>
          <li>
            Actively contributed to team upskilling and mentoring, ensuring long-term sustainability and excellence in code quality.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">🎯 Career Highlights</h3>
        <ul className="list-disc list-inside">
          <li>Architect @ Lumine Group (2024)</li>
          <li>Senior Architect @ Synchronoss Tech (2018–2024)</li>
          <li>Technical Leader @ Indecomm Global Services</li>
          <li>Software Engineer @ Cisco, 24/7 iLabs, TATA Elxsi, Peertone</li>
        </ul>
      </div>

    <div>
  <h3 className="text-xl font-semibold mb-2">📫 Let’s Connect</h3>
  <ul className="list-none space-y-1">
    <li>📍 Bengaluru, India</li>
    <li style={{fontSize:"20px"}} className="text-2xl font-bold text-gray-800">📧 pattar.kiran@gmail.com</li>
    <li  style={{fontColor:"orange"}}>
      🔗{" "}
      <a
        href="https://linkedin.com/in/kiranpattar"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-lg"
       
      >
        LinkedIn
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
