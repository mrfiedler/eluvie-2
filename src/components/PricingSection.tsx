
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type PlanFeature = {
  title: string;
  solo: boolean;
  studio: boolean;
  agency: boolean;
};

const planFeatures: PlanFeature[] = [
  { title: "Unlimited clients", solo: true, studio: true, agency: true },
  { title: "Automated subscription tracking", solo: true, studio: true, agency: true },
  { title: "Budget > Invoice conversion", solo: true, studio: true, agency: true },
  { title: "Visual financial reports", solo: false, studio: true, agency: true },
  { title: "Gamification", solo: true, studio: true, agency: true },
  { title: "Multi-user access", solo: false, studio: true, agency: true },
  { title: "Team collaboration", solo: false, studio: false, agency: true },
  { title: "Advanced client management", solo: false, studio: true, agency: true },
  { title: "Exportable reports", solo: false, studio: false, agency: true },
  { title: "Priority support", solo: false, studio: false, agency: true },
];

const PricingSection = () => {
  const [annualBilling, setAnnualBilling] = useState(false);

  return (
    <section id="pricing" className="section bg-white relative overflow-hidden">
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-eluvie-purple/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">
            Choose the plan that works for your creative journey, with no hidden fees or surprises.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8">
            <div className="flex items-center justify-center space-x-3">
              <span className={`text-sm ${annualBilling ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>Monthly</span>
              <button
                onClick={() => setAnnualBilling(!annualBilling)}
                className="relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none"
                role="switch"
                aria-checked={annualBilling}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    annualBilling ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-sm flex items-center ${annualBilling ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Annual
                <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Solo Plan */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col h-full relative">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Solo Criativo</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Free</span>
                <span className="text-gray-500 ml-2">forever</span>
              </div>
              <p className="text-gray-600">Perfect for freelancers and starters beginning their creative journey.</p>
            </div>
            
            <Button className="mb-8 bg-gray-900">Start for Free</Button>
            
            <div className="space-y-4 flex-grow">
              {planFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  {feature.solo ? (
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 border border-gray-300 rounded-full mr-3 flex-shrink-0" />
                  )}
                  <span className={`${feature.solo ? 'text-gray-700' : 'text-gray-400'}`}>{feature.title}</span>
                </div>
              ))}
            </div>
            
            <div className="absolute top-4 right-4">
              <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          
          {/* Studio Plan */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8 flex flex-col h-full relative transform md:scale-105 z-10">
            <div className="absolute top-0 right-0 -mt-4 mr-4">
              <div className="bg-eluvie-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                Popular
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Estúdio em Movimento</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">${annualBilling ? '23' : '29'}</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-gray-600">Ideal for small studios and solo businesses ready to grow.</p>
            </div>
            
            <Button className="mb-8 button-gradient">Choose Studio</Button>
            
            <div className="space-y-4 flex-grow">
              {planFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  {feature.studio ? (
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 border border-gray-300 rounded-full mr-3 flex-shrink-0" />
                  )}
                  <span className={`${feature.studio ? 'text-gray-700' : 'text-gray-400'}`}>{feature.title}</span>
                </div>
              ))}
            </div>
            
            <div className="absolute top-4 right-4">
              <div className="h-2 w-2 bg-eluvie-blue rounded-full"></div>
            </div>
          </div>
          
          {/* Agency Plan */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col h-full relative">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Agência Flow</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">${annualBilling ? '71' : '89'}</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-gray-600">Complete solution for agencies and creative teams that need it all.</p>
            </div>
            
            <Button className="mb-8 bg-gray-900">Choose Agency</Button>
            
            <div className="space-y-4 flex-grow">
              {planFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  {feature.agency ? (
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 border border-gray-300 rounded-full mr-3 flex-shrink-0" />
                  )}
                  <span className={`${feature.agency ? 'text-gray-700' : 'text-gray-400'}`}>{feature.title}</span>
                </div>
              ))}
            </div>
            
            <div className="absolute top-4 right-4">
              <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
