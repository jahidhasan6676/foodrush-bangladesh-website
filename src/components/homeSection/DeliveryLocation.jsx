
export const deliveryCities = [
    {
        name: "Dhaka",
        restaurants: 2869,
        image: "/dhaka-city.webp",
    },
    {
        name: "Chattogram",
        restaurants: 166,
        image: "/chittagoan-city.webp",
    },
    {
        name: "Khulna",
        restaurants: 126,
        image: "/khulna.jpeg",
    },
    {
        name: "Sylhet",
        restaurants: 112,
        image: "/sylet.jpeg",
    },
    {
        name: "Narayanganj",
        restaurants: 105,
        image: "/narayangang.jpeg",
    },
    {
        name: "Bogra",
        restaurants: 54,
        image: "/bogra.jpeg",
    },
    {
        name: "Mymensingh",
        restaurants: 50,
        image: "/maymenshing.jpeg",
    },
    {
        name: "Cumilla",
        restaurants: 44,
        image: "/cumilla.jpeg",
    },
    {
        name: "Rajshahi",
        restaurants: 35,
        image: "/rajshahi.jpeg",
    },
    {
        name: "Coxs Bazar",
        restaurants: 35,
        image: "/coxs.jpeg",
    },
    {
        name: "Gazipur",
        restaurants: 34,
        image: "/gazipur.jpeg",
    },
    {
        name: "Tangail",
        restaurants: 32,
        image: "/tangail.jpeg",
    },
];

// components/DeliveryLocations.jsx


import Image from "next/image";

const DeliveryLocation = () => {
    return (
        <section className="w-11/12 mx-auto pb-20">
            <h2 className="text-2xl font-semibold mb-10">We deliver to:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {deliveryCities?.map((city, idx) => (
                    <div
                        key={idx}
                        className="rounded-lg overflow-hidden relative group shadow-md hover:shadow-lg transition">
                        <Image
                            src={city.image}
                            alt={city.name}
                            width={400}
                            height={300}
                            className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"/>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                            <h3 className="text-white font-semibold text-lg">{city.name}</h3>
                            <p className="text-white text-sm">{city.restaurants} Restaurants</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DeliveryLocation;
