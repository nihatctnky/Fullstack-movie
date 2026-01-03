import React, { useState } from "react";
import Hero from "./hero";
import { useQuery } from "@tanstack/react-query";
import api from "../../service/api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "./card";

const Home = () => {

  const [searchValue,setSearchValue]= useState("")

  const { isLoading, error, data ,refetch} = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/movies"),
    select: (res) => res.data,
  });

  const filteredMovies= data?.filter((movie)=>{
    //film adına göre ara
    const titleFilter = movie.title.toLowerCase().includes(searchValue)
// yönetmene göre filtreleme
    const directorFilter= movie.director.toLowerCase().includes(searchValue)
    // aktöre göre arama
    const castFilter = movie.cast.some((actor)=> actor.toLowerCase().includes(searchValue))

      // türe göre arama
      const genreFilter = movie.genre.some((genre)=> genre.toLowerCase().includes(searchValue))
    // filtrelem sonucu döndür
    return titleFilter || directorFilter || genreFilter
  })

  return (
    <div className="min-h-screen">
      <Hero  setSearchValue={setSearchValue}/>

      <div className="container mx-auto px-6 py-12">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error.message} refetch={refetch}/>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <Card  movie={movie} key={movie.id}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
