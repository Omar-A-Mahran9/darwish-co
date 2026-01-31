import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container text-center space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80">
            Let's start a conversation about your business needs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">Get in Touch</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Whether you have a specific project in mind or just want to explore how we can help, we're here to listen.
                </p>
              </div>

              <div className="grid gap-6">
                <Card className="border-none shadow-md">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Email Us</h3>
                      <p className="text-muted-foreground">fouadarwish@darwish-co.com</p>
                      <p className="text-muted-foreground text-sm">fouadarwish@gmail.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Call Us</h3>
                      <p className="text-muted-foreground">+20 110 110 1090</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Visit Us</h3>
                      <p className="text-muted-foreground">www.darwish-co.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Working Hours</h3>
                      <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-muted/30 p-8 rounded-2xl">
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">Send us a Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-primary">Name</label>
                    <Input id="name" placeholder="Your Name" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-primary">Email</label>
                    <Input id="email" type="email" placeholder="your@email.com" className="bg-background" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-primary">Subject</label>
                  <Input id="subject" placeholder="How can we help?" className="bg-background" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-primary">Message</label>
                  <Textarea id="message" placeholder="Tell us about your project..." className="min-h-[150px] bg-background" />
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6">
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
