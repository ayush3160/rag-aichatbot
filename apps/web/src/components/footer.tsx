import Link from 'next/link';
import { BarChart2, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 px-4">
            <div className="flex items-center gap-2 font-bold text-2xl">
              <BarChart2 className="h-6 w-6 text-primary" />
              <span>Conversify.Ai</span>
            </div>
            <p className="text-sm text-muted-foreground">
            Build intelligent, customisable, and rag based chatbots for your website , slack and discord
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
              {/* <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">API Reference</Link></li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
              {/* <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Conversify.Ai. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}