import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cta = () => {
    return (
        <section
            className="bg-cta text-white rounded-4xl px-7 py-10 flex flex-col items-center text-center gap-5 w-1/3 max-lg:w-1/2 max-md:w-full">
            <div className="bg-cta-gold rounded-4xl px-3 py-1.5 text-black">
                Start Learning Your Way
            </div>
            <h1 className="text-white font-bold text-3xl">
                Build a personalised learning companion
            </h1>
            <p>
                Pick a name, subject, voice, & personality — and start learning through
                voice conversations that feel natural and fun.
            </p>
            <Image
                src={"images/cta.svg"}
                alt="limit image"
                width={362}
                height={232}
            />
            <Link href={"/companions/new"}>
                <button
                    className="text-white rounded-xl cursor-pointer px-[82px] py-[12px] flex items-center gap-2"
                    style={{backgroundColor: "#fe5933"}}
                >
                    <Image src={"/icons/plus.svg"} alt="plus icon" width={20} height={20}/>
                    <p>Add new companion</p>
                </button>
            </Link>
        </section>
    )
        ;
};

export default Cta;
