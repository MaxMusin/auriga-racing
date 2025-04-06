'use client';

import Header from '@/components/Header';
import { Calendar, Clock, Flag, MapPin } from 'lucide-react';
import Image from 'next/image';

const UpcomingEventsSection = () => {
  const upcomingEvents = [
    {
      id: 1,
      event: 'FUNCUP Championship 2024',
      date: 'June 15-16, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'Spa-Francorchamps, Belgium',
      image:
        '/images/auriga-racing-car.jpg',
      type: 'track',
    },
    {
      id: 2,
      event: 'World SimRacing League - Round 3',
      date: 'May 28, 2024',
      time: '8:00 PM - 10:00 PM',
      location: 'Virtual Nürburgring',
      image:
        '/images/auriga-racing-car.jpg',
      type: 'sim',
    },
    {
      id: 3,
      event: 'European Track Days Cup',
      date: 'July 12-13, 2024',
      time: '10:00 AM - 6:00 PM',
      location: 'Monza, Italy',
      image:
        '/images/auriga-racing-car.jpg',
      type: 'track',
    },
    {
      id: 4,
      event: 'Digital Racing Championship - Season 5',
      date: 'June 5, 2024',
      time: '9:00 PM - 11:00 PM',
      location: 'Virtual Silverstone',
      image:
        '/images/auriga-racing-car.jpg',
      type: 'sim',
    },
  ];

  return (
    <section id="events" className="section-padding bg-card clip-diagonal">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Header title="Upcoming events" subtitle="What's next" centered />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us at these upcoming trackdays and simracing events where
            Auriga Racing will compete
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-background rounded-lg overflow-hidden shadow-md card-hover"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  fill
                  src={event.image}
                  alt={event.event}
                  className="w-full h-full object-cover"
                  priority
                />
                <div
                  className={`absolute bottom-0 left-0 py-1 px-3 text-xs font-semibold ${
                    event.type === 'track' ? 'bg-racing-red' : 'bg-racing-blue'
                  } text-white`}
                >
                  {event.type === 'track' ? 'Track' : 'SimRacing'}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 line-clamp-1">
                  {event.event}
                </h3>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="btn-primary inline-flex items-center">
            <Flag className="mr-2 h-5 w-5" />
            Full Racing Calendar
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
