import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative flex flex-col md:flex-row items-center justify-between py-6 md:py-8 px-5 md:px-12 lg:px-24 bg-background/50 border-t border-tertiary-dark/20 mt-10 md:mt-20">
            <div className="flex-1"></div>
            
            <p className="text-tertiary text-sm md:text-base font-medium tracking-wide order-2 md:order-1 mt-6 md:mt-0 flex-1 text-center">
                Dançando por Dentro © {new Date().getFullYear()}
            </p>
            
            <div className="flex flex-row items-center justify-end gap-6 order-1 md:order-2 flex-1">
                <a target="_blank" href="https://www.facebook.com/dancandopordentro/" className="transition-transform hover:scale-110 hover:-translate-y-1 duration-300">
                    <Image
                        src="/facebook_logo.png"
                        alt="Facebook"
                        width={30}
                        height={30}
                        className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    />
                </a>

                <a target="_blank" href="https://www.instagram.com/dancandopordentro/" className="transition-transform hover:scale-110 hover:-translate-y-1 duration-300">
                    <Image
                        src="/instagram_logo.png"
                        alt="Instagram"
                        width={30}
                        height={30}
                        className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    />
                </a>
            </div>
        </footer>
    );
}