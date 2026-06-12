"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

const contactInfo = [
  { icon: MapPin, label: "Studio Location", value: "Mussaffah, Abu Dhabi, UAE" },
  { icon: Mail, label: "Email Address", value: "ashiqasdesignstudio@gmail.com" },
  { icon: Phone, label: "Phone Number", value: "+971 565767353" },
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
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 md:px-12 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white rounded-[2rem] p-8 md:p-16 lg:p-20 shadow-sm space-y-16">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">Get in Touch</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">Contact</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Contact Info Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-10"
            >
              <p className="text-ash-slate leading-relaxed text-sm sm:text-base font-sans">
                Have a project in mind? We&apos;d love to hear about it. Reach out and let&apos;s start
                a conversation about how we can bring your architectural and spatial vision to life.
              </p>

              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border border-ash-fog flex items-center justify-center flex-shrink-0 bg-ash-fog">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-ash-slate mb-1 font-sans font-medium">{label}</p>
                      <p className="text-foreground text-sm sm:text-base font-medium font-sans">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-ash-fog/30 pt-8 space-y-3 font-sans">
                <p className="text-xs uppercase tracking-widest text-[#71717A] font-bold">Office Hours</p>
                <p className="text-foreground text-sm">Monday – Friday: 9:00 AM – 6:00 PM</p>
                <p className="text-ash-slate text-sm">Saturday: By appointment</p>
              </div>
            </motion.div>

            {/* Contact Form Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-ash-fog/30 bg-ash-fog/20 rounded-[1.5rem] p-8">
                  <CheckCircle className="h-16 w-16 text-primary mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Message Sent</h3>
                  <p className="text-ash-slate mb-8 font-sans">We will get back to you within 24 hours.</p>
                  <Button
                    onClick={() => setStatus("idle")}
                    className="rounded-full px-8 h-12 uppercase tracking-[0.2em] text-xs font-semibold bg-primary text-white hover:bg-primary/95 transition-all shadow-md"
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#71717A] font-sans font-bold">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="[Your Name]"
                        className="rounded-xl bg-transparent border-[#CEC8BA] focus:border-primary focus:ring-1 focus:ring-primary h-12 font-sans text-sm shadow-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#71717A] font-sans font-bold">
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
                        className="rounded-xl bg-transparent border-[#CEC8BA] focus:border-primary focus:ring-1 focus:ring-primary h-12 font-sans text-sm shadow-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs uppercase tracking-widest text-[#71717A] font-sans font-bold">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project inquiry, collaboration..."
                      className="rounded-xl bg-transparent border-[#CEC8BA] focus:border-primary focus:ring-1 focus:ring-primary h-12 font-sans text-sm shadow-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#71717A] font-sans font-bold">
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
                      className="rounded-xl bg-transparent border-[#CEC8BA] focus:border-primary focus:ring-1 focus:ring-primary font-sans text-sm resize-none shadow-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-destructive text-sm border border-destructive/30 p-4 rounded-xl bg-destructive/5 font-sans">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-primary text-white hover:bg-primary/95 rounded-full uppercase tracking-[0.2em] text-xs font-semibold h-12 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
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
    </div>
  );
}
