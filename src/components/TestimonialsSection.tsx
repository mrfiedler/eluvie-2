
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Eluvie feels like a creative studio, not a bank app. Perfect for my design agency.",
    author: "Sofia Martinez",
    role: "Design Studio Owner",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "Managing finances feels less painful – and even fun. The gamification keeps me organized.",
    author: "Alex Johnson",
    role: "Freelance Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "I've tried everything, but Eluvie is the first financial tool that speaks my language as a creative.",
    author: "Mia Chen",
    role: "Social Media Manager",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">From Our Creative Community</h2>
          <p className="text-lg text-gray-600">
            Hear what creative professionals say about managing finances with Eluvie.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="flex overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 relative">
                      <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-0">
                        <div className="text-6xl text-eluvie-gold/20 font-serif">"</div>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author} 
                            className="h-16 w-16 rounded-full border-2 border-white shadow-md"
                          />
                        </div>
                        <p className="text-xl md:text-2xl font-medium mb-6 relative z-10">
                          "{testimonial.quote}"
                        </p>
                        <div className="mt-2">
                          <div className="font-semibold">{testimonial.author}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-eluvie-blue' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
