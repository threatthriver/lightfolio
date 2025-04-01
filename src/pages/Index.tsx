
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Footer from '@/components/landing/Footer';
import { AuthProvider } from '@/context/AuthContext';

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Features />
          
          {/* Testimonials Section */}
          <section id="testimonials" className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by innovative teams</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  See what our users are saying about how Lightfolio has transformed their workflow.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <span className="text-primary font-medium">JM</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Jessica Martinez</h4>
                      <p className="text-sm text-muted-foreground">Product Designer at Acme Inc.</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Lightfolio has completely transformed how our design team collaborates. The flexibility between documents and databases is exactly what we needed."
                  </p>
                </div>
                
                {/* Testimonial 2 */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <span className="text-primary font-medium">RK</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Ryan Kim</h4>
                      <p className="text-sm text-muted-foreground">Technical Writer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "As someone who writes technical documentation daily, Lightfolio's clean interface and powerful organization tools have been a game changer."
                  </p>
                </div>
                
                {/* Testimonial 3 */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <span className="text-primary font-medium">SJ</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Project Manager at TechCorp</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "We've tried many project management tools, but Lightfolio strikes the perfect balance between flexibility and structure. Our team loves it!"
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-accent/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Start for free, upgrade when you need more features.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Free</h3>
                    <p className="text-muted-foreground mb-4">Perfect for getting started</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Up to 5 pages</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Basic document editor</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>1 database</span>
                      </li>
                    </ul>
                  </div>
                  <div className="px-6 pb-6">
                    <Button className="w-full" variant="outline">
                      Get Started
                    </Button>
                  </div>
                </div>
                
                {/* Pro Plan */}
                <div className="bg-card border-2 border-primary rounded-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                    Popular
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Pro</h3>
                    <p className="text-muted-foreground mb-4">For individuals and small teams</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">$12</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Unlimited pages</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Advanced editor features</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>10 databases</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>5GB file storage</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Priority support</span>
                      </li>
                    </ul>
                  </div>
                  <div className="px-6 pb-6">
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </div>
                </div>
                
                {/* Team Plan */}
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Team</h3>
                    <p className="text-muted-foreground mb-4">For larger teams and companies</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">$24</span>
                      <span className="text-muted-foreground">/user/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Everything in Pro</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Unlimited databases</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>20GB file storage</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Advanced permissions</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>24/7 dedicated support</span>
                      </li>
                    </ul>
                  </div>
                  <div className="px-6 pb-6">
                    <Button className="w-full" variant="outline">
                      Contact Sales
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Index;
