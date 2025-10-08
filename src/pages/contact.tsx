import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center my-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We'd love to hear from you.
          </p>
        </section>
        <section className="max-w-3xl mx-auto">
          <p className="mb-4 text-center">
            For any inquiries, feedback, or suggestions, please feel free to reach out to us. You can connect with us through our social media channels or send us an email.
          </p>
          <div className="text-center">
            <p className="mb-2">
              <strong>Email:</strong> <a href="mailto:info@eventnaija.com" className="text-blue-500 hover:underline">info@eventnaija.com</a>
            </p>
            <p>
              <strong>Twitter/X:</strong> <a href="https://twitter.com/your-community-handle" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">@EventNaija</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;