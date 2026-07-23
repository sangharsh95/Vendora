import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-[70vh] mx-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-slate-800 mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-medium text-slate-700 mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create or modify your account,
              request on-demand services, contact customer support, or otherwise communicate with us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-slate-700 mb-3">2. How We Use Your Information</h2>
            <p>
              We may use the information we collect about you to provide, maintain, and improve our services,
              including to facilitate payments, send receipts, provide products and services you request (and send
              related information), develop new features, provide customer support, and develop safety features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-slate-700 mb-3">3. Sharing of Information</h2>
            <p>
              We may share the information we collect about you as described in this Statement or as described at
              the time of collection or sharing, including with third-party service providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-slate-700 mb-3">4. Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse and
              unauthorized access, disclosure, alteration and destruction.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
