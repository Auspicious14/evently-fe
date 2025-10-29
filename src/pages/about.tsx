
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">About EventNaija</h1>
          <Card className="p-8">
            <div className="prose max-w-none">
              <p className="text-lg text-muted-foreground mb-4">
                EventNaija is Nigeria's premier platform for discovering and sharing tech events. 
                We're building a community where tech enthusiasts, entrepreneurs, and innovators 
                can connect through conferences, workshops, meetups, and hackathons.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To make tech events more accessible and discoverable across Nigeria, fostering 
                connections and growth in the tech ecosystem.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">What We Do</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Curate tech events from across Nigeria</li>
                <li>• Provide a platform for event organizers to reach their audience</li>
                <li>• Connect tech enthusiasts with opportunities to learn and network</li>
                <li>• Integrate with social media to surface community-driven events</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Involved</h2>
              <p className="text-muted-foreground">
                Whether you're organizing an event or looking to attend, EventNaija is your 
                go-to resource. Submit your events, upvote your favorites, and stay connected 
                with Nigeria's vibrant tech community.
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
