import React from 'react';


const Element2 = () => {
  return (
    <div class="bg-green-500 text-white p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">Abhishek</h1>
        <div class="flex items-center">
            <h1 class="text-xl font-bold mr-4">More</h1>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            <div class="relative inline-block text-left">
                <button type="button" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Cart <span class="ml-2">2</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Element2;
