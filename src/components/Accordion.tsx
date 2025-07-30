import { useState } from "react";
import AccordionItem from "@/components/AccordionItem";

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggle = (index) => {
        setOpenIndex(openIndex != index ? index : -1);
    }

    return (
        <section className="grid place-items-center">
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
