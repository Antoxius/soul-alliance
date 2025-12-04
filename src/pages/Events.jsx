import {useEffect, useState} from 'react';
import {useParams} from 'react-router';

export default function Events() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider mb-8 text-center text-white">
          UPCOMING EVENTS
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-400 text-center text-lg mb-12">
            Check back soon for our next gaming events and tournaments!
          </p>
        </div>
      </div>
    </div>
  );
}