import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Lock, Zap } from 'lucide-react';
import { VideoBackground } from '@/components/video-background';
import { Footer } from '@/components/footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
            <header className="relative top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <nav className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-2xl px-3">
                        <BarChart2 className="h-6 w-6 text-primary" />
                        <span>Conversify.Ai</span>
                    </div>
                    <div className="flex items-center gap-5 px-5">
                        <Link href="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="relative">
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                    {/* <VideoBackground /> */}
                    <div className="container relative z-10 py-32">
                        <div className="flex flex-col items-center text-center gap-8">
                            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                Effortless AI Chat
                                <br />
                                Anywhere You Need It
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-[600px]">
                                Build intelligent, customisable, and rag based chatbots for your website , slack and discord
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button size="lg" className="gap-2">
                                    Start Free Trial <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button size="lg" variant="outline" className="gap-2">
                                    Book A Call
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="relative px-5">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="h-10 w-10" />,
                                title: "Intelligent",
                                description: "Extract data from your docs website with ease"
                            },
                            {
                                icon: <Lock className="h-10 w-10" />,
                                title: "Secure by Default",
                                description: "We are open source and secure by default"
                            },
                            {
                                icon: <BarChart2 className="h-10 w-10" />,
                                title: "Real-time Analytics",
                                description: "Comprehensive insights about the queries and responses"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-card">
                                {feature.icon}
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className='py-10 px-10'>
                    <div className='flex'>
                        <div>
                            <h1 className='text-2xl md:text-3xl font-bold'>Build Bots Without Code</h1>
                            <p className='text-muted-foreground'>No technical expertise is required. Our intuitive interface lets you set up, customize, and launch your chatbot with ease. With Converse.Ai, anyone can create a dynamic and responsive AI assistant in minutes.</p>
                        </div>
                        <div>
                            <img src='/next.svg' alt='placeholder' />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}