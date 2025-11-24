import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Digital Craftspeople Since 2016 | Galway SEO',
  description: 'Learn about Galway SEO, Galway\'s leading digital agency. 9+ years of experience, 20+ team members, and 200+ successful projects. We craft exceptional digital experiences.',
  keywords: 'about Galway SEO, digital agency Galway, web design team, SEO experts Ireland',
}

export default function AboutPage() {
  const teamMembers = [
    { name: 'Rowan Barlow Stainsby', role: 'CEO / Managing Director' },
    { name: 'Paula Gannon', role: 'Chief Operations Officer' },
    { name: 'Hamish Davison', role: 'Chief Technical Officer' },
    { name: 'Degen Storrer', role: 'Chief SEO Officer' },
    { name: 'Edward Chan', role: 'Head of Development' },
    { name: 'Anik Deb', role: 'UI/UX Designer' },
    { name: 'Susanna Busiello', role: 'Content Team Lead' },
    { name: 'Nabanita Roy', role: 'Technical SEO Expert' },
  ]

  const values = [
    {
      title: 'Authenticity',
      description: 'The cornerstone of our agency, breathing integrity and quality into our services',
      icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>'
    },
    {
      title: 'ROI Focus',
      description: 'Understanding that return on investment is pivotal to our engagement',
      icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>'
    },
    {
      title: 'Quality Craftsmanship',
      description: 'Taking craftsmanship seriously with robust QA processes',
      icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>'
    },
    {
      title: 'Environmental Responsibility',
      description: 'Planting 1 tree per day for each client via onetreeplanted.org',
      icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    },
    {
      title: 'Client Success',
      description: 'Results-driven approach prioritizing client business growth',
      icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>'
    },
    {
      title: 'Transparency',
      description: 'Honest communication and realistic expectations',
      icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-darker relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Digital <span className="gradient-text">Craftspeople</span> Since 2016
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              We craft marketing strategies that grow your revenue. Based in Galway, Ireland, we're a full-service digital agency with a mission to drive authenticity into every project.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { value: '9+', label: 'Years Experience', delay: '0.1s' },
              { value: '20+', label: 'Team Members', delay: '0.2s' },
              { value: '200+', label: 'Projects Delivered', delay: '0.3s' },
              { value: '98%', label: 'Client Satisfaction', delay: '0.4s' },
            ].map((stat, index) => (
              <div key={index} className="text-center stat-item" style={{animationDelay: stat.delay}}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Galway SEO was founded in 2016 in Galway, Ireland, with a vision to provide authentic, results-driven digital marketing services. We're committed to craftsmanship in the digital realm, helping local businesses dominate search results.
                </p>
                <p>
                  Starting as a web design and SEO agency, we've evolved into a full-service digital marketing agency with AI-powered solutions. Our team has grown from a small team to 20+ international specialists, serving clients across Ireland and globally.
                </p>
                <p>
                  Our focus has always been on driving real results - not just providing services - with an 'Organic First' philosophy that prioritizes sustainable, long-term growth over short-term gains.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Galway SEO team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 text-center">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 text-center">
              The principles that guide everything we do
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="glass-card rounded-2xl p-8">
                  <div className="w-16 h-16 gradient-purple-blue rounded-xl flex items-center justify-center mb-6">
                    <div dangerouslySetInnerHTML={{ __html: value.icon }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 text-center">
              Meet Our <span className="gradient-text">Leadership Team</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 text-center">
              Expert leaders driving innovation and results
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="glass-card rounded-xl p-6 text-center">
                  <div className="w-20 h-20 gradient-purple-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can help your business achieve its digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Get Started
              </Link>
              <a href="tel:+353861530832" className="btn-outline text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Call +353 86 153 0832
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
