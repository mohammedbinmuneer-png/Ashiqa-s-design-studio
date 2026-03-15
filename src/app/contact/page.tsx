"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

const contactInfo = [
  { icon: MapPin, label: "Studio", value: "Mussaffah, Abu Dhabi, UAE" },
  { icon: Mail, label: "Email", value: "ashiqasdesignstudio@gmail.com" },
  { icon: Phone, label: "Phone", value: "+971 565767353" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">Get in Touch</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">Contact</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-10"
          >
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it. Reach out and let&apos;s start
              a conversation about how we can bring your vision to life.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                    <p className="text-foreground text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Office Hours</p>
              <p className="text-foreground text-sm">Monday – Friday: 9:00 AM – 6:00 PM</p>
              <p className="text-muted-foreground text-sm">Saturday: By appointment</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-primary/20 bg-card">
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Message Sent</h3>
                <p className="text-muted-foreground mb-8">We&apos;ll get back to you within 24 hours.</p>
                <Button
                  onClick={() => setStatus("idle")}
                  variant="outline"
                  className="rounded-none uppercase tracking-widest text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="[Your Name]"
                      className="rounded-none bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="[your@email.com]"
                      className="rounded-none bg-card border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project inquiry, collaboration..."
                    className="rounded-none bg-card border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project..."
                    className="rounded-none bg-card border-border focus:border-primary resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-destructive text-sm border border-destructive/30 p-3">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest text-sm h-12 flex items-center gap-2"
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
