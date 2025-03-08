import React, { useState } from 'react';

function Search() {
 

  return (
    <form  className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="h-8 px-4 py-2 border border-gray-300 rounded-md w-44 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
   
    </form>
  );
}

export default Search;
