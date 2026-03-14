import { Satisfy } from "next/font/google"

const font = Satisfy({subsets: ["latin"], weight: "400"})

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-3xl ${font.className}`}>Inderjeet Singh</h1>
          <nav>
            <a href="#skills" className="text-lg text-gray-300 hover:text-white mr-4">Skills</a>
            <a href="#contact" className="text-lg text-gray-300 hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">Hire Inderjeet Singh</h1>
          <p className="text-xl text-gray-400">AWS DevOps & Site Reliability Engineer</p>
        </section>

        <section id="skills" className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-8">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["AWS", "Kubernetes", "Terraform", "Docker", "CI/CD"].map((skill) => (
              <span key={skill} className="bg-gray-700 text-white text-lg font-medium px-4 py-2 rounded-full">{skill}</span>
            ))}
          </div>
        </section>

        <section id="contact">
          <h2 className="text-4xl font-bold text-center mb-8">Contact Me</h2>
          <form action="/contact" method="POST" className="max-w-xl mx-auto">
            <div className="mb-4">
              <input name="name" placeholder="Name" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="mb-4">
              <input name="email" placeholder="Email" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="mb-4">
              <textarea name="message" placeholder="Message" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div className="text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">Hire Me</button>
            </div>
          </form>
        </section>
      </main>

      <footer className="bg-gray-800 p-4 mt-12">
        <div className="text-center text-gray-500">
          <p>&copy; 2026 Inderjeet Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}