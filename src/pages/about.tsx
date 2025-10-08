import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center my-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            About EventNaija
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your central hub for tech events across Nigeria.
          </p>
        </section>
        <section className="max-w-3xl mx-auto">
          <p className="mb-4">
            EventNaija is a community-driven platform dedicated to aggregating and showcasing technology-focused events, meetups, and conferences happening all over Nigeria. Our mission is to foster a more connected and informed tech ecosystem by making it easy for enthusiasts, professionals, and students to discover opportunities for learning, networking, and collaboration.
          </p>
          <p className="mb-4">
            Whether you're looking for a local meetup to share your passion, a workshop to sharpen your skills, or a major conference to connect with industry leaders, EventNaija aims to be the go-to resource for all tech event information in the country.
          </p>
          <p>
            This platform is open source and built by the community, for the community. If you're interested in contributing, please check out our GitHub repository.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;