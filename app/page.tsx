import Link from 'next/link'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Galway's Leading Digital Agency Since 2016</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Digital <span className="gradient-text">Craftspeople</span> Building Your Future
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              We craft exceptional digital experiences through web design, SEO, marketing, and AI-powered solutions. Organic first, results always.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/contact" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg w-full sm:w-auto">
                Start Your Project
              </Link>
              <Link href="/services" className="btn-outline text-white px-8 py-4 rounded-lg font-semibold text-lg w-full sm:w-auto">
                View Our Services
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="stat-item" style={{animationDelay: '0.1s'}}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">9+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="stat-item" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">20+</div>
                <div className="text-gray-400">Team Members</div>
              </div>
              <div className="stat-item" style={{animationDelay: '0.3s'}}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">200+</div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div className="stat-item" style={{animationDelay: '0.4s'}}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">98%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-darker">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Full-service digital solutions crafted to elevate your brand and drive measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="glass-card service-card rounded-2xl p-8"
                style={{animationDelay: `${0.1 * (index + 1)}s`}}
              >
                <div className="w-16 h-16 gradient-purple-blue rounded-xl flex items-center justify-center mb-6">
                  <div dangerouslySetInnerHTML={{ __html: service.icon }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.name}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <span className="text-primary hover:text-secondary transition font-semibold inline-flex items-center">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                Why Choose <span className="gradient-text">Kraft Agency</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Since 2016, we've been crafting digital solutions that deliver real results. Based in Galway/Oranmore, Ireland, our team of 20+ specialists brings together creativity, technical expertise, and strategic thinking.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: 'Organic First Approach',
                    description: 'We prioritize sustainable, long-term growth through organic strategies that build lasting value.'
                  },
                  {
                    title: 'AI-Powered Innovation',
                    description: 'Leverage cutting-edge AI technology to automate processes and gain competitive advantages.'
                  },
                  {
                    title: 'Full-Service Partner',
                    description: 'One team, complete solutions. From strategy to execution, we handle it all.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="animated-border rounded-2xl p-8">
                <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Team collaboration at Kraft Agency"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '200+', label: 'Projects Completed' },
                    { value: '9+', label: 'Years Experience' },
                    { value: '20+', label: 'Team Members' },
                    { value: '98%', label: 'Client Satisfaction' },
                  ].map((stat, index) => (
                    <div key={index} className="glass-card rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-darker">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from the businesses we've helped grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card rounded-2xl p-8">
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>
                <div>
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
                Let's Build Something <span className="gradient-text">Amazing</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Ready to transform your digital presence? Get in touch with our team and let's discuss your project.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="glass-card rounded-2xl p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <div dangerouslySetInnerHTML={{ __html: info.icon }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                      <div className="text-gray-400">{info.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const services = [
  {
    name: 'Web Design & Development',
    slug: 'web-design-development',
    description: 'Custom websites that convert. From concept to launch, we build responsive, fast, and beautiful web experiences.',
    icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
  },
  {
    name: 'SEO & Organic Growth',
    slug: 'seo-services',
    description: 'Organic first, always. We help you rank higher, drive qualified traffic, and dominate your local market.',
    icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>'
  },
  {
    name: 'AI-Powered Marketing',
    slug: 'ai-marketing',
    description: 'Harness the power of AI to automate, optimize, and innovate. Custom AI integrations for modern businesses.',
    icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>'
  },
  {
    name: 'Content Marketing',
    slug: 'content-marketing',
    description: 'Strategic content that engages your audience and drives conversions through storytelling and value.',
    icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'
  },
  {
    name: 'PPC & Google Ads',
    slug: 'ppc-google-ads',
    description: 'ROI-focused paid advertising campaigns that maximize your ad spend and drive qualified leads.',
    icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  },
  {
    name: 'Social Media Marketing',
    slug: 'social-media-marketing',
    description: 'Build engaged communities and drive brand awareness across all major social platforms.',
    icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>'
  },
]

const testimonials = [
  {
    text: "SEO and digital marketing does not happen overnight. For me I can tell you working with Hamish Davison has been an absolutely great investment into my SEO and online success.",
    author: "Client Review",
    role: "Verified Trustpilot Review"
  },
  {
    text: "The website they built for us is absolutely stunning and performs incredibly. Our bounce rate dropped by 50% and conversions are up over 200%. Best investment we've made in our business.",
    author: "Sarah Murphy",
    role: "Founder, Coastal Retail"
  },
  {
    text: "Their AI automation solutions saved us 40 hours per week and significantly reduced costs. The team really understands modern technology and how to apply it to solve real business problems.",
    author: "David Walsh",
    role: "Director, TechStart Ireland"
  }
]

const contactInfo = [
  {
    title: 'Call Us',
    content: <a href="tel:+353861530832" className="hover:text-primary transition">+353 86 153 0832</a>,
    icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>'
  },
  {
    title: 'Email Us',
    content: <a href="mailto:hello@kraftagency.ie" className="hover:text-primary transition">hello@kraftagency.ie</a>,
    icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
  },
  {
    title: 'Visit Us',
    content: 'Galway/Oranmore, County Galway, Ireland',
    icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
  },
  {
    title: 'Business Hours',
    content: 'Monday - Friday: 9:00 AM - 6:00 PM GMT',
    icon: '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  }
]
