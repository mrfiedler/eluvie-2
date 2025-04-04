
import { Building, Monitor, PenTool, Code } from 'lucide-react';

const audiences = [
  {
    icon: <Building className="h-12 w-12 text-eluvie-gold" />,
    title: "Marketing Agencies",
    description: "Manage multiple client accounts, track project profitability, and automate recurring billing."
  },
  {
    icon: <Monitor className="h-12 w-12 text-eluvie-teal" />,
    title: "Social Media Managers",
    description: "Track client retainers, organize campaign budgets, and monitor subscription-based tools."
  },
  {
    icon: <PenTool className="h-12 w-12 text-eluvie-blue" />,
    title: "Design Studios",
    description: "Convert project quotes into invoices, track design software subscriptions, and manage team finances."
  },
  {
    icon: <Code className="h-12 w-12 text-eluvie-purple" />,
    title: "Freelance Developers",
    description: "Track project hours and expenses, manage client payments, and optimize your tech stack costs."
  }
];

const AudienceSection = () => {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who It's For</h2>
          <p className="text-lg text-gray-600">
            Eluvie is designed for creative professionals who understand that time spent on finances is time away from doing what they love.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-eluvie-gold/5 via-eluvie-teal/5 to-eluvie-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-5">{audience.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{audience.title}</h3>
                <p className="text-gray-600">{audience.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 max-w-2xl mx-auto">
            Whether you're a solo creator or leading a creative team, Eluvie adapts to your workflow without forcing you to adapt to it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
