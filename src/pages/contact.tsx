import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center my-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Contact the Creator
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            I'd love to hear from you.
          </p>
        </section>
        <section className="max-w-3xl mx-auto">
          <p className="mb-4 text-center">
            For any inquiries, feedback, or suggestions, please feel free to reach out to me. You can connect with me through our social media channels or send me an email.
          </p>
          <div className="text-center">
            <p className="mb-2">
              <strong>Email:</strong> <a href="mailto:uthmanabdulganiyu2019@gmail.com" className="text-blue-500 hover:underline">uthmanabdulganiyu2019@gmail.com</a>
            </p>
            <p>
              <strong>Twitter/X:</strong> <a href="https://twitter.com/_auspy_" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">@Auspicious</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
