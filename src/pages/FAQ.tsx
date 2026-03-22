import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const faqs = [
  {
    category: "Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location but usually take 7-14 business days."
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive a tracking number via email. You can also track it directly on our 'Track Order' page."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy for all unworn items in their original packaging. Returns are free for domestic orders."
      },
      {
        q: "How do I start an exchange?",
        a: "To start an exchange, please visit our returns portal or contact our support team with your order number."
      }
    ]
  },
  {
    category: "Sizing & Fit",
    questions: [
      {
        q: "How do I know my size?",
        a: "We have a detailed size guide on every product page. Most of our shoes run true to size, but we recommend checking the specific fit notes for each model."
      },
      {
        q: "What if the shoes don't fit?",
        a: "Don't worry! We offer free exchanges for size issues. Just make sure the shoes are unworn and in their original box."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-primary">Support Center</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">How can we help you today?</h1>
            <p className="font-body text-muted-foreground text-lg">
              Find answers to common questions about our products, shipping, and more. Can't find what you're looking for? Reach out to our team.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {/* FAQ Accordions */}
            <div className="lg:col-span-2 space-y-12">
              {faqs.map((group, idx) => (
                <div key={idx}>
                  <h2 className="font-display text-2xl font-bold mb-6 text-foreground border-l-4 border-primary pl-4">{group.category}</h2>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {group.questions.map((faq, fIdx) => (
                      <AccordionItem 
                        key={fIdx} 
                        value={`${idx}-${fIdx}`}
                        className="border border-border rounded-xl px-6 bg-secondary/20 overflow-hidden"
                      >
                        <AccordionTrigger className="font-display font-semibold text-left hover:no-underline py-4">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="font-body text-muted-foreground pb-4 leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-gradient-card border border-border rounded-3xl p-8 sticky top-32">
                <h3 className="font-display text-xl font-bold mb-6">Contact Us</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm">Email Us</p>
                      <p className="font-body text-sm text-muted-foreground">support@stride.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm">Call Us</p>
                      <p className="font-body text-sm text-muted-foreground">+1 (555) 000-0000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm">Live Chat</p>
                      <p className="font-body text-sm text-muted-foreground">Available Mon-Fri, 9am-6pm EST</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border">
                  <Link to="/track-order">
                    <button className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold transition-all hover:shadow-glow">
                      Track Your Order
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
