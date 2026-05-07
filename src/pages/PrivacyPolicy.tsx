import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Info, Database, Share2, LogOut, Trash2, UserX, Lock, RefreshCw, CheckCircle, Mail } from 'lucide-react'

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = '2026-05-07'

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-slate-800">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-brand-primary hover:text-brand-dark transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-primary" />
            <span className="font-bold text-slate-900 tracking-tight">Privacy Center</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-500">
            Effective as of {lastUpdated} • Read time: 6 mins
          </p>
        </div>
      </header>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-1 hidden md:block">
            <div className="sticky top-32 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Contents</h3>
              <nav className="flex flex-col gap-2">
                <a href="#intro" className="text-slate-600 hover:text-brand-primary transition-colors text-sm font-medium">Introduction</a>
                <a href="#collection" className="text-slate-600 hover:text-brand-primary transition-colors text-sm font-medium">Collection & Use</a>
                <a href="#third-party" className="text-slate-600 hover:text-brand-primary transition-colors text-sm font-medium">Third Party Access</a>
                <a href="#opt-out" className="text-slate-600 hover:text-brand-primary transition-colors text-sm font-medium">Opt-Out Rights</a>
                <a href="#retention" className="text-slate-600 hover:text-brand-primary transition-colors text-sm font-medium">Data Retention</a>
                <a href="#children" className="text-slate-600 hover:text-brand-primary transition-colors text-sm font-medium">Children</a>
                <a href="#security" className="text-slate-600 hover:text-brand-primary transition-colors text-sm font-medium">Security</a>
                <a href="#changes" className="text-slate-600 hover:text-brand-primary transition-colors text-sm font-medium">Changes</a>
                <a href="#contact" className="text-slate-600 hover:text-brand-primary transition-colors text-sm font-medium">Contact Us</a>
              </nav>
            </div>
          </aside>

          {/* Main Policy Text */}
          <div className="md:col-span-3 space-y-12">
            {/* Introduction */}
            <section id="intro" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Privacy Policy</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                This privacy policy applies to the Mileage Tracking app (hereby referred to as "Application") for mobile devices that was created by Computerlogs (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".
              </p>
            </section>

            {/* Information Collection and Use */}
            <section id="collection" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Information Collection and Use</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Application collects information when you download and use it. This information may include information such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4 mb-6">
                <li>Your device's Internet Protocol address (e.g. IP address)</li>
                <li>The pages of the Application that you visit, the time and date of your visit, the time spent on those pages</li>
                <li>The time spent on the Application</li>
                <li>The operating system you use on your mobile device</li>
              </ul>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                <p className="text-slate-600 text-sm italic">
                  The Application does not gather precise information about the location of your mobile device.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                <p className="text-slate-600 text-sm italic">
                  The Application does not use Artificial Intelligence (AI) technologies to process your data or provide features.
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information. The information that the Service Provider request will be retained by them and used as described in this privacy policy.
              </p>
            </section>

            {/* Third Party Access */}
            <section id="third-party" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <Share2 className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Third Party Access</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Service Provider may disclose User Provided and Automatically Collected Information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>as required by law, such as to comply with a subpoena, or similar legal process;</li>
                <li>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
                <li>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
              </ul>
            </section>

            {/* Opt-Out Rights */}
            <section id="opt-out" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <LogOut className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Opt-Out Rights</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
              </p>
            </section>

            {/* Data Retention Policy */}
            <section id="retention" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Data Retention Policy</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at <a href="mailto:support.mileage@gmail.com" className="text-brand-primary hover:underline font-medium">support.mileage@gmail.com</a> and they will respond in a reasonable time.
              </p>
            </section>

            {/* Children */}
            <section id="children" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <UserX className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Children</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Service Provider does not knowingly collect personally identifiable information from children. The Service Provider encourages all children to never submit any personally identifiable information through the Application and/or Services. The Service Provider encourage parents and legal guardians to monitor their children's Internet usage and to help enforce this Policy by instructing their children never to provide personally identifiable information through the Application and/or Services without their permission.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If you have reason to believe that a child has provided personally identifiable information to the Service Provider through the Application and/or Services, please contact the Service Provider (<a href="mailto:support.mileage@gmail.com" className="text-brand-primary hover:underline font-medium">support.mileage@gmail.com</a>) so that they will be able to take the necessary actions. You must also be at least 16 years of age to consent to the processing of your personally identifiable information in your country (in some countries we may allow your parent or guardian to do so on your behalf).
              </p>
            </section>

            {/* Security */}
            <section id="security" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Security</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.
              </p>
            </section>

            {/* Changes */}
            <section id="changes" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Changes</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
              </p>
            </section>

            {/* Your Consent */}
            <section id="consent" className="scroll-mt-24 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <CheckCircle className="w-5 h-5" />
                <h2 className="text-xl font-bold text-slate-900">Your Consent</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
              </p>
            </section>

            {/* Contact Us */}
            <section id="contact" className="scroll-mt-24 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at <a href="mailto:support.mileage@gmail.com" className="text-brand-primary hover:underline font-bold">support.mileage@gmail.com</a>.
              </p>
              <a 
                href="mailto:support.mileage@gmail.com" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/25"
              >
                <Mail className="w-4 h-4" />
                Email Support
              </a>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 Computerlogs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default PrivacyPolicy
