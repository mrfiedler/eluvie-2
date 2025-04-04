
import { Building, Monitor, PenTool, Code } from 'lucide-react';

const audiences = [
  {
    icon: <Building className="h-12 w-12 text-blue-400" />,
    title: "Marketing Agencies",
    description: "Manage multiple client accounts, track project profitability, and automate recurring billing."
  },
  {
    icon: <Monitor className="h-12 w-12 text-purple-400" />,
    title: "Social Media Managers",
    description: "Track client retainers, organize campaign budgets, and monitor subscription-based tools."
  },
  {
    icon: <PenTool className="h-12 w-12 text-cyan-400" />,
    title: "Design Studios",
    description: "Convert project quotes into invoices, track design software subscriptions, and manage team finances."
  },
  {
    icon: <Code className="h-12 w-12 text-indigo-400" />,
    title: "Freelance Developers",
    description: "Track project hours and expenses, manage client payments, and optimize your tech stack costs."
  }
];

const AudienceSection = () => {
  return (
    <section className="section bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Who It's For</h2>
          <p className="text-lg text-gray-400">
            Eluvie is designed for creative professionals who understand that time spent on finances is time away from doing what they love.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <div 
              key={index} 
              className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-5">{audience.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{audience.title}</h3>
                <p className="text-gray-400">{audience.description}</p>
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
