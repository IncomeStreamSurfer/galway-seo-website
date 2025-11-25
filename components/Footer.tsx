import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-darker border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GS</span>
              </div>
              <span className="font-display text-xl font-bold text-white">Galway SEO</span>
            </div>
            <p className="text-gray-400 mb-4">Craftspeople in a digital sense. Building exceptional digital experiences since 2016.</p>
            <div className="flex space-x-4">
              <a href="https://x.com/kraftagency" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition" aria-label="Twitter">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="https://www.facebook.com/kraftagencylimited/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition" aria-label="Facebook">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path></svg>
              </a>
              <a href="https://www.linkedin.com/company/kraft-web-agency/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition" aria-label="LinkedIn">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/web-design-development" className="text-gray-400 hover:text-white transition">Web Design</Link></li>
              <li><Link href="/services/seo-services" className="text-gray-400 hover:text-white transition">SEO Services</Link></li>
              <li><Link href="/services/ai-marketing" className="text-gray-400 hover:text-white transition">AI Marketing</Link></li>
              <li><Link href="/services/content-marketing" className="text-gray-400 hover:text-white transition">Content Marketing</Link></li>
              <li><Link href="/services/ppc-google-ads" className="text-gray-400 hover:text-white transition">PPC & Google Ads</Link></li>
              <li><Link href="/services/social-media-marketing" className="text-gray-400 hover:text-white transition">Social Media</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/locations" className="text-gray-400 hover:text-white transition">Locations</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="tel:+353861530832" className="hover:text-white transition">+353 86 153 0832</a>
              </li>
              <li>
                <a href="mailto:hello@galwayseo.ai" className="hover:text-white transition">hello@galwayseo.ai</a>
              </li>
              <li>Galway, Ireland</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2025 Galway SEO. All rights reserved. Craftspeople in a digital sense.</p>
            <div className="flex space-x-6">
              <a href="https://kraftagency.ie/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</a>
              <a href="https://kraftagency.ie/terms" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
