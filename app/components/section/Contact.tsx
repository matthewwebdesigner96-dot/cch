import Image from "next/image";
import ContactForm from "../ui/ContactForm";

const Contact = () => {
  return (
    <section className="bg-navy-mid w-screen flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-14">
      <div className="relative h-80 sm:h-80 md:h-auto">
        <Image
          className="object-cover"
          src="/contactus.jpg"
          alt="building"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex items-center justify-center py-16 md:py-24 px-4">
        <ContactForm className="w-full max-w-125 flex flex-col gap-6 md:gap-8">
          <p>
            We provide strategic equity investments designed to fuel sustainable
            growth and lasting partnerships.
          </p>
        </ContactForm>
      </div>
    </section>
  );
};

export default Contact;
