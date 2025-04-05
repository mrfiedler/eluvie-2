
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: "Solo Criativo",
    price: "Free",
    description: "Perfect for freelancers just starting out.",
    features: [
      "5 clients",
      "Basic invoicing",
      "Simple expense tracking",
      "Manual subscription tracking",
      "Limited reports"
    ],
    notIncluded: [
      "Budget to invoice conversion",
      "Gamification features",
      "Multi-user access",
      "Priority support"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline"
  },
  {
    name: "Estúdio em Movimento",
    price: "R$29",
    description: "Ideal for small studios and growing professionals.",
    features: [
      "Unlimited clients",
      "Advanced invoicing",
      "Automated expense categorization",
      "Subscription tracking & alerts",
      "Budget to invoice conversion",
      "Basic gamification",
      "Exportable reports"
    ],
    notIncluded: [
      "Multi-user access",
      "Priority support"
    ],
    buttonText: "Start 14-day Trial",
    buttonVariant: "default",
    popular: true
  },
  {
    name: "Agência Flow",
    price: "R$89",
    description: "For agencies and larger creative teams.",
    features: [
      "Everything in Estúdio",
      "Multi-user access (up to 10)",
      "Team performance insights",
      "Client portal access",
      "Full gamification features",
      "Custom branding",
      "Priority support",
      "API access"
    ],
    notIncluded: [],
    buttonText: "Start 14-day Trial",
    buttonVariant: "outline"
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section bg-gray-800 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-400">
            Choose the plan that fits your creative journey. No hidden fees, no complicated tiers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-gray-900 rounded-xl p-8 border border-gray-700 relative ${
                plan.popular ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Popular
                </div>
              )}
              
              <div className="mb-5">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.price !== "Free" && <span className="ml-1 text-gray-400">/month</span>}
                </div>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
              </div>
              
              <div className="border-t border-gray-700 my-6"></div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
                
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-start opacity-50">
                    <X className="h-5 w-5 text-gray-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.buttonVariant === "default" ? "default" : "outline"} 
                className={`w-full ${
                  plan.buttonVariant === "default" 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-gray-700 text-white bg-transparent hover:bg-gray-800"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            All plans include secure cloud storage, regular updates, and basic support.<br />
            Need something custom? <a href="#" className="text-blue-400 hover:underline">Contact our sales team</a> for enterprise options.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
