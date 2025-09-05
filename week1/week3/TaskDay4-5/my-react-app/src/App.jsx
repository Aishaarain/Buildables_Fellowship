export default function App() {
  return (
    <div className="min-h-screen flex font-sans bg-gray-950 text-gray-200">
      
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col space-y-6 max-sm:hidden">
        <h2 className="text-xl font-bold text-indigo-400"> Links</h2>
        <ul className="space-y-3">
          <li><a href="#" className="block hover:text-indigo-400">Dashboard</a></li>
          <li><a href="#" className="block hover:text-indigo-400">Projects</a></li>
          <li><a href="#" className="block hover:text-indigo-400">Team</a></li>
          <li><a href="#" className="block hover:text-indigo-400">Settings</a></li>
        </ul>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">About</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
             Similique veritatis magnam cupiditate, ratione fugit culpa. Vel consequuntur sit fugiat at.
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
  
        <nav className="bg-gray-900 text-gray-200 p-4 flex justify-between items-center border-b border-gray-800">
          <h1 className="text-2xl font-extrabold tracking-wide text-indigo-400">MySite</h1>
          <ul className="hidden md:flex space-x-6">
            <li><a href="#" className="hover:text-purple-400">Home</a></li>
            <li><a href="#" className="hover:text-purple-400">Services</a></li>
            <li><a href="#" className="hover:text-purple-400">Contact</a></li>
          </ul>
        </nav>

        <header className="flex flex-col items-center justify-center flex-1 text-center px-6 py-16 bg-gray-950">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Welcome to <span className="text-indigo-500">MySite</span>
          </h2>
          <p className="text-gray-400 text-lg mb-6 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
           Non, ipsam laborum, quam quaerat cupiditate molestias nisi quo nostrum ratione mollitia velit sit sequi natus, incidunt ducimus quae tempore quasi iste.
          </p>
          <button className="px-8 py-3 rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition">
            Get Started 
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12 max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-800">
            <h3 className="text-xl font-semibold text-indigo-400 mb-3"> Dark UI</h3>
            <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-800">
            <h3 className="text-xl font-semibold text-purple-400 mb-3"> Responsive</h3>
            <p className="text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem sequi velit culpa.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-800">
            <h3 className="text-xl font-semibold text-pink-400 mb-3"> Stylish</h3>
            <p className="text-gray-400">
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi nulla ab?
            </p>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 text-center p-6 border-t border-gray-800 mt-auto">
          {new Date().getFullYear()} MySite. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
