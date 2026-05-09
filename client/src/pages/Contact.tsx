import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear field error on change
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting.", {
        icon: <AlertCircle className="w-4 h-4" />,
      });
      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    const loadingToastId = toast.loading("Sending your message…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      toast.dismiss(loadingToastId);

      if (res.ok && data.success) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you within 24 hours.",
          icon: <CheckCircle2 className="w-4 h-4" />,
          duration: 6000,
        });
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong. Please try again.", {
          icon: <AlertCircle className="w-4 h-4" />,
          duration: 5000,
        });
      }
    } catch {
      toast.dismiss(loadingToastId);
      toast.error("Network error. Please check your connection and try again.", {
        icon: <AlertCircle className="w-4 h-4" />,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                      <p className="text-muted-foreground">info@darwish-co.com</p>
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
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="p-3 bg-primary/10 rounded-full shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Visit Us</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Office T-10, 3rd Floor, RIO Mall,<br />
                        Dr. Ahmed Okasha St., off Sadat Axis,<br />
                        New Cairo 1, Cairo Governorate 11865, Egypt
                      </p>
                      <a
                        href="https://share.google/6tKphgm623sxgJe9m"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1 inline-block"
                      >
                        Open in Google Maps →
                      </a>
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
                      <p className="text-muted-foreground">Mon – Fri: 9:00 AM – 6:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-muted/30 p-8 rounded-2xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
                  <div className="w-20 h-20 rounded-full bg-chart-2/10 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-chart-2" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-heading text-2xl font-bold text-primary">Message Sent!</h2>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold text-primary mb-6">Send us a Message</h2>
                  <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-primary">
                          Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="name"
                          placeholder="Your Name"
                          className={`bg-background ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-primary">
                          Email <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className={`bg-background ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-primary">Subject</label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        className="bg-background"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-primary">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project…"
                        className={`min-h-[150px] bg-background ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
      {/* Google Maps Section */}
      <section className="py-0">
        <div className="w-full" style={{ height: "480px" }}>
          <iframe
            title="Darwish & Co. Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8!2d31.4677375!3d30.0560468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d2b0e3b3b3b%3A0x1465949206209374709!2sDarwish%26co!5e0!3m2!1sen!2seg!4v1715000000000!5m2!1sen!2seg"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Map CTA strip */}
      <section className="py-8 bg-primary/5 border-t border-primary/10">
        <div className="container max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm text-muted-foreground">
              Office T-10, 3rd Floor, RIO Mall, Dr. Ahmed Okasha St., New Cairo 1, Egypt
            </span>
          </div>
          <a
            href="https://share.google/6tKphgm623sxgJe9m"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold">
              Get Directions
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
