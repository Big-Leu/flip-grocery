import React from 'react';

const OfferSection = ({ title, offer, items }) => {
  return (
    <section className="my-8">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4 text-black">{title} <span className="text-green-600">{offer}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
              <img src={item.img} alt={item.name} className="w-full h-32 object-cover mb-4" />
              <h3 className="text-xl font-semibold text-black">{item.name}</h3>
              <p className="text-green-600">{item.offer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
