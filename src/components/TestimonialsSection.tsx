
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "Eluvie feels like a creative studio, not a bank app. Managing my design business finances has never been more intuitive.",
    author: "Sophia Martinez",
    role: "Graphic Design Studio Owner",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    content: "Managing finances feels less painful – and even fun. The gamification makes me actually want to stay on top of my invoices.",
    author: "Marcus Chen",
    role: "Freelance Developer",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    content: "I've tried every finance app out there. Eluvie is the only one that feels like it was made for my creative agency workflow.",
    author: "Natasha Singh",
    role: "Digital Marketing Agency",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    content: "The visual dashboards give me insights my accountant never could. I finally understand my business's financial health.",
    author: "Carlos Rodriguez",
    role: "Video Production Studio",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section bg-gray-800 relative overflow-hidden">
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Creatives Are Saying</h2>
          <p className="text-lg text-gray-400">
            Don't just take our word for it. Here's what creative professionals like you think about Eluvie.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-xl p-6 shadow-md border border-gray-700 relative"
            >
              <div className="flex space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gray-600" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 italic">{testimonial.content}</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full mr-4 border border-gray-700" 
                />
                <div>
                  <div className="font-medium text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="absolute top-4 right-6 opacity-10">
                <svg className="h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300">
            <span>Read more testimonials</span>
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
