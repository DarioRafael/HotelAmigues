import React, { useEffect } from 'react';
import '../styles/PaginaPrincipal.css';


function PaginaPrincipal() {
    useEffect(() => {
        const handleScroll = () => {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>


            {/* Hero Section con efecto parallax */}
            <section className="parallax h-screen flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center px-4">
                    <div className="max-w-3xl reveal">
                        <div className="title-decoration">
                            <h1 className="text-5xl md:text-6xl mb-12 title-main elegant-shadow"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                Bienvenido a
                                <br />
                                <span className="block mt-4 text-6xl md:text-8xl pb-3">
                                    Hotel Amigues
                                </span>
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl mt-12 elegant-shadow"
                           style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 , fontStyle: "italic" }}>
                            "Donde cada estancia se convierte en un momento inolvidable"
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección de información */}
            <main className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto reveal">
                        <h2 className="text-3xl md:text-4xl text-center mb-10 text-white elegant-shadow"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Información sobre nuestro Hotel
                        </h2>
                        <div className="space-y-6 text-gray-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
                            <p className="reveal text-justify leading-relaxed">
                                Hotel "Amigues" es un lugar donde la comodidad y la hospitalidad se encuentran.
                                Ofrecemos habitaciones modernas y acogedoras en ubicaciones privilegiadas en toda la ciudad.
                                Ya sea que estés viajando por negocios o por placer, nuestros hoteles proporcionan todo
                                lo que necesitas para una estadía memorable.
                            </p>
                            <p className="reveal text-justify leading-relaxed">
                                Disfruta de nuestras comodidades de lujo, como piscinas, gimnasios, Wi-Fi gratuito
                                y restaurantes gourmet. Nuestro personal está comprometido a ofrecerte el mejor servicio,
                                asegurándose de que cada momento de tu estancia sea perfecto.
                            </p>
                            <p className="reveal text-justify leading-relaxed">
                                No importa cuál sea tu destino, en Hotel "Amigues" te garantizamos una experiencia
                                inolvidable. ¡Te esperamos para hacer de tu estancia un momento especial!
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default PaginaPrincipal;