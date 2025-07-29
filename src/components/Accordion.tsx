import { useState } from "react";
import AccordionItem from "@/components/AccordionItem";

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(false);

    const toggle = (index) => {
        if (openIndex === index) {
            setOpenIndex(false);
        }

        setOpenIndex(index);
    }

    return (
        <section className="bg-[#3d3db9] h-screen grid place-items-center">
            <div className="px-[40px] max-w-[800px]">
                {items.map((item, index) => (
                    <AccordionItem
                        key={index}
                        open={index === openIndex}
                        toggle={() => toggle(index)}
                        title={item.title}
                        des={item.desc}
                    />
                ))}
            </div>
        </section>
    );

}
