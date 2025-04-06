'use client';

import { Check, Mail, MapPin, Phone } from 'lucide-react';

const JoinSection = () => {
  return (
    <section id="join" className="section-padding bg-racing-red">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              JOIN THE TEAM
            </h2>
            <div className="h-1 w-24 bg-racing-red mb-8"></div>

            <p className="text-lg text-white/80 mb-8">
              Whether you're an experienced racer or just starting out, we're
              always looking for passionate individuals to join our teams. Apex
              Forge provides opportunities for both track racing and simracing
              enthusiasts.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-white">
                Why join us?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    Access to professional coaching and development
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    State-of-the-art equipment and facilities
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    Compete in national and international events
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    Be part of a passionate community of racers
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Contact us</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="text-white mr-3 h-5 w-5" />
                  <a
                    href="mailto:team@auriga-racing.be"
                    className="text-white/80 hover:text-racing-red transition-colors"
                  >
                    team@auriga-racing.be
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="text-white mr-3 h-5 w-5" />
                  <a
                    href="tel:+32474793924"
                    className="text-white/80 hover:text-racing-red transition-colors"
                  >
                    +32 474 79 39 24
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-white mr-3 h-5 w-5" />
                  <span className="text-white/80">
                    Auriga ASBL
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Apply to Join
            </h3>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                />
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  I'm interested in*
                </label>
                <select
                  id="interest"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="track">Track Racing</option>
                  <option value="sim">SimRacing</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Racing Experience
                </label>
                <select
                  id="experience"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                >
                  <option value="">Select an option</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="experienced">Experienced (3-5 years)</option>
                  <option value="professional">Professional (5+ years)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Tell us about yourself
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                  placeholder="Share your racing background, achievements, or why you want to join our team..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Submit Application
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting this form, you agree to our Privacy Policy and
                Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
