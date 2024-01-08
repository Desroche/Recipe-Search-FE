import React from 'react';
import RecipeSearch from '../RecipeFolder/RecipeSearch';
import NavigationBar from '../Navigation/NavigationBar';

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <RecipeSearch />
    </div>
  );
};

export default Home;
