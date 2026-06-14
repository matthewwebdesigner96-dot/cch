"use client";
import Image from "next/image";
import ContactForm from "../ui/ContactForm";
import { useState } from "react";

const ContactSingle = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <section className="bg-navy-mid w-full flex justify-center items-center py-16 md:py-24 relative overflow-hidden">
            <Image
                className={`hidden md:block object-cover transition-all duration-700 ${isFocused ? "grayscale-0" : "grayscale"}`}
                src="/contactus.jpg"
                alt="building"
                fill
                sizes="100vw"
            />

            <ContactForm
                className={"z-10 bg-navy-mid/80 w-full p-10 max-w-150 flex flex-col gap-4"}
                onFocusChange={setIsFocused}
            />
        </section>
    );
};

export default ContactSingle;
