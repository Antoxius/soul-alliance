export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SOUL Alliance. All rights reserved - Antoxius
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            <a 
              href="https://discord.gg/PmaJPDryEU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-700 transition-colors text-sm"
            >
              Discord
            </a>
            <a 
              href="mailto:Antoxiusalfa@gmail.com"
              className="text-gray-400 hover:text-red-700 transition-colors text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
