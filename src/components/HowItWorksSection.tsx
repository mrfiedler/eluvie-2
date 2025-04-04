
import { LineChart, CreditCard, BadgeCheck, Calendar } from 'lucide-react';

const features = [
  {
    icon: <LineChart className="h-10 w-10 text-eluvie-gold" />,
    title: "Track income & expenses",
    description: "Easily track money flowing in and out, categorize expenses, and stay on top of your creative business finances."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-eluvie-teal" />,
    title: "Budgets to invoices",
    description: "Create project budgets and automatically convert them into client invoices with just a few clicks."
  },
  {
    icon: <Calendar className="h-10 w-10 text-eluvie-blue" />,
    title: "Monitor subscriptions",
    description: "Never lose track of subscription renewals, free trials, or recurring software costs for your creative tools."
  },
  {
    icon: <BadgeCheck className="h-10 w-10 text-eluvie-purple" />,
    title: "Get rewarded",
    description: "Earn badges, streaks, and rewards for staying financially organized and maintaining healthy business practices."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section relative overflow-hidden bg-gray-50 py-24">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-eluvie-teal/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Eluvie Works</h2>
          <p className="text-lg text-gray-600">
            A financial platform that understands creative workflows, making money management delightfully simple.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card flex flex-col items-center text-center">
              <div className="mb-5 rounded-full bg-white p-3 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-eluvie-gold/20 to-eluvie-teal/20 rounded-bl-[100px]"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-semibold mb-4">Simplified workflows for creative minds</h3>
                <p className="text-gray-600 mb-6">
                  We've designed every feature to fit seamlessly into your creative process, not disrupt it. Financial tasks become intuitive and quick.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-eluvie-gold mr-2"></div>
                    <span className="text-sm">Team collaboration</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-eluvie-teal mr-2"></div>
                    <span className="text-sm">Client management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-eluvie-blue mr-2"></div>
                    <span className="text-sm">Visual reporting</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Creative workspace" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
