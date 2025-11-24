'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : ''
        })
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input w-full px-4 py-3 bg-darker border border-white/10 rounded-lg text-white"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="form-input w-full px-4 py-3 bg-darker border border-white/10 rounded-lg text-white"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="form-input w-full px-4 py-3 bg-darker border border-white/10 rounded-lg text-white"
          placeholder="+353 XX XXX XXXX"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-gray-300 mb-2">
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="form-input w-full px-4 py-3 bg-darker border border-white/10 rounded-lg text-white"
        >
          <option value="">Select a service</option>
          <option>Web Design & Development</option>
          <option>SEO & Organic Growth</option>
          <option>AI-Powered Marketing</option>
          <option>Content Marketing</option>
          <option>PPC & Google Ads</option>
          <option>Social Media Marketing</option>
          <option>Brand Identity</option>
          <option>E-commerce Marketing</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="form-input w-full px-4 py-3 bg-darker border border-white/10 rounded-lg text-white"
          placeholder="Tell us about your project..."
        ></textarea>
      </div>

      {status === 'success' && (
        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-400">
          Thank you! We'll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
          Something went wrong. Please try again or call us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full text-white px-8 py-4 rounded-lg font-semibold text-lg disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
