import Image from "next/image";
import ContactForm from "../ui/ContactForm";

const ContactSingle = () => {
    return (
        <section className="bg-navy-mid w-full flex justify-center items-center py-16 md:py-24 relative overflow-hidden">
            <Image
                className="hidden md:block object-cover"
                src="/contact-bg.webp"
                alt="building"
                fill
                sizes="100vw"
            />

            <ContactForm className={"z-10 bg-navy-mid w-full p-10 max-w-150 flex flex-col gap-4"} />
        </section>
    );
};

export default ContactSingle;
