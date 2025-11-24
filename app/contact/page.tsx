import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Get Your Free Consultation | Galway SEO',
  description: 'Get in touch with Galway SEO in Galway. Call +353 86 153 0832 or email hello@galwayseo.ai for web design, SEO, and digital marketing services.',
  keywords: 'contact Galway SEO, digital agency Galway contact, web design quote, SEO consultation',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-darker relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Ready to transform your digital presence? Get in touch with our team and let's discuss your project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="glass-card rounded-2xl p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                      <a href="tel:+353861530832" className="text-gray-400 hover:text-primary transition text-lg">
                        +353 86 153 0832
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="glass-card rounded-2xl p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                      <a href="mailto:hello@galwayseo.ai" className="text-gray-400 hover:text-primary transition text-lg">
                        hello@galwayseo.ai
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="glass-card rounded-2xl p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                      <p className="text-gray-400">
                        Galway/Oranmore<br />
                        County Galway, Ireland
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="glass-card rounded-2xl p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Business Hours</h3>
                      <p className="text-gray-400">
                        Monday - Friday: 9:00 AM - 6:00 PM GMT<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Common Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: 'How quickly can you respond to inquiries?',
                  answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly at +353 86 153 0832.'
                },
                {
                  question: 'Do you offer free consultations?',
                  answer: 'Yes! We offer free initial consultations to discuss your project needs and how we can help. This allows us to understand your goals and provide accurate recommendations.'
                },
                {
                  question: 'What information should I include in my inquiry?',
                  answer: 'Please include details about your business, what services you\'re interested in, your goals, timeline, and budget range. This helps us provide the most relevant recommendations.'
                },
                {
                  question: 'Can I visit your office?',
                  answer: 'Yes, we\'re based in Galway/Oranmore. We welcome in-person meetings by appointment. Please contact us to schedule a time that works for you.'
                },
              ].map((item, index) => (
                <div key={index} className="glass-card rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{item.question}</h3>
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
