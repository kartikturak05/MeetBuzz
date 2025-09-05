import TestimonialCarousel from "@/components/testimonial";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon, Users, Zap, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Smart Event Creation",
    description: "Build flexible meeting types with custom duration and settings",
  },
  {
    icon: Clock,
    title: "Intelligent Availability",
    description: "Set complex availability rules and buffer times automatically",
  },
  {
    icon: Users,
    title: "Team Coordination",
    description: "Coordinate group meetings and manage team calendars effortlessly",
  },
  {
    icon: LinkIcon,
    title: "Branded Experience",
    description: "Share professional booking pages with your custom branding",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Get real-time updates and reminders for all your meetings",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee",
  },
];

const workflow = [
  { 
    step: "Create Account", 
    description: "Join MeetBuzz in under 60 seconds with our quick setup" 
  },
  {
    step: "Configure Preferences",
    description: "Set your availability, meeting types, and notification preferences",
  },
  {
    step: "Share & Connect",
    description: "Send your personalized MeetBuzz link via email, social, or website",
  },
  {
    step: "Meet & Grow",
    description: "Focus on what matters while we handle all the scheduling magic",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-32 gap-12 mb-32 pt-8">
        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-extrabold pb-4 gradient-title leading-tight">
              Transform How You 
              <span className="text-emerald-600"> Meet</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              MeetBuzz revolutionizes your scheduling workflow. Create meaningful connections, 
              eliminate back-and-forth emails, and let your clients book time with you 
              in just one click.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={"/dashboard"}>
              <Button size="lg" className="text-lg bg-emerald-600 hover:bg-emerald-700 px-8">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg aspect-square">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-3xl transform rotate-6 opacity-20"></div>
            <Image
              src="/poster.jpg"
              alt="MeetBuzz scheduling platform"
              fill
              className="object-contain relative z-10 rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-32 px-6 lg:px-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-emerald-700">
            Everything You Need to Schedule Smarter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to save you time and create better meeting experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            return (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-emerald-100 rounded-full w-fit group-hover:bg-emerald-200 transition-colors">
                    <feature.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl text-emerald-700 mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-32 px-6 lg:px-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-emerald-700">
            Loved by Professionals Worldwide
          </h2>
          <p className="text-xl text-gray-600">
            Join 50,000+ users who've transformed their scheduling workflow
          </p>
        </div>
        <TestimonialCarousel />
      </div>

      {/* How It Works Section */}
      <div className="mb-32 px-6 lg:px-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-emerald-700">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600">
            Four simple steps to scheduling success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflow.map((step, index) => (
            <div className="text-center relative" key={index}>
              {index < workflow.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-transparent transform -translate-x-8"></div>
              )}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-bold text-xl">{index + 1}</span>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-emerald-700">{step.step}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-6 lg:mx-32 mb-16">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Buzz with Better Meetings?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of professionals who've eliminated scheduling chaos and focus on what really matters - great conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/dashboard'}>
              <Button size='lg' variant='secondary' className='text-emerald-700 text-lg px-8 hover:bg-white'>
                Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5"/>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}