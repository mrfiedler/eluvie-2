
import { BarChart3, Bell, Award, Sliders, Paintbrush } from 'lucide-react';

const features = [
  {
    icon: <BarChart3 className="h-10 w-10 text-eluvie-gold" />,
    title: "Visual Dashboards",
    description: "See your finances by month, project, or client with beautifully designed dashboards that make sense at a glance."
  },
  {
    icon: <Bell className="h-10 w-10 text-eluvie-teal" />,
    title: "Smart Alerts",
    description: "Get notified about overdue payments, ending subscriptions, and important financial events before they become problems."
  },
  {
    icon: <Award className="h-10 w-10 text-eluvie-blue" />,
    title: "Gamified Progress",
    description: "Earn badges and achievements for maintaining good financial habits, making money management feel rewarding."
  },
  {
    icon: <Sliders className="h-10 w-10 text-eluvie-purple" />,
    title: "Simplified Reports",
    description: "Generate crystal-clear financial reports that help you understand your business without needing an accounting degree."
  },
  {
    icon: <Paintbrush className="h-10 w-10 text-eluvie-gold" />,
    title: "Customizable Experience",
    description: "Adjust everything from invoice designs to dashboard widgets to match your creative style and workflow needs."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section bg-gray-50 relative overflow-hidden">
      <div className="absolute top-20 -left-40 w-96 h-96 bg-eluvie-blue/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Feature Highlights</h2>
          <p className="text-lg text-gray-600">
            Discover the tools that make Eluvie the perfect financial companion for creative professionals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
            >
              <div className="flex items-start">
                <div className="mr-5">
                  <div className="p-2 bg-white rounded-lg shadow-sm">{feature.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Feature showcase */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">Financial control with creative freedom</h3>
                <p className="text-gray-600 mb-8">
                  Eluvie combines powerful financial tools with an interface that feels familiar to creative professionals. No more switching between clunky banking apps and spreadsheets.
                </p>
                
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">All your finances in one beautiful interface</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Time-saving automations for repetitive tasks</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Integrated with popular creative tools</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 bg-gradient-to-br from-eluvie-gold/30 via-eluvie-teal/30 to-eluvie-blue/30">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="bg-white rounded-xl shadow-lg p-4 max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Monthly Overview</h4>
                      <div className="text-sm text-gray-500">Aug 2023</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Income</span>
                          <span className="font-medium">$12,450</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Expenses</span>
                          <span className="font-medium">$4,230</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Subscriptions</span>
                          <span className="font-medium">$870</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-500">Net Profit</div>
                          <div className="text-xl font-bold text-green-600">$8,220</div>
                        </div>
                        <div className="flex items-center text-green-600 text-sm font-medium">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          16% from July
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
