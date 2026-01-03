import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/index";
import Error from "../../components/error/index";
import api from "../../service/api";
import DeleteButton from "./delete-button";
import Field from "./field";
import ListField from "./list-field";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["movie"],
    queryFn: () => api.get(`/movies/${id}`),
    select: (res) => res.data,
  });

  if (isLoading) return <Loader />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return (
    <div className="min-h-screen pb-12">
      {/* delete button */}
      <div className="glass border-b border-white/10">
        <div className="containe px-6 py-2  mx-auto flex justify-end">
          <DeleteButton id={data.id} />
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 animate-fade-in">
          {/*Görsel */}
          <div className="group overflow-hidden rounded-2xl lg:w-1/3">
            <img
              src={data.image}
              alt=""
              className="w-full rounded-2xl border border-white/10 group-hover:scale-105 transition duration-300 shadow-2xl"
            />
          </div>

          {/*içerik */}
          <div className="lg:w-2/3 space-y-8">
            {/*Başlık */}
            <div className="glass p-8 rounded-2xl border border-white/10 shadow-xl ">
              <h1 className="text-4xl md:text-5xl  font-bold mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                {data.title}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* diger bilgiler */}
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Süre" value={data.duration} />
              <Field label="İzleyici Skoru" value={data.rating} />
              <Field label="Yıl" value={data.year} />
              <Field label="Dil" value={data.language} />
              <Field label="Yönetmen" value={data.director} />
            </div>

            {/* ekip */}

            <ListField label="Ekip" values={data.cast} />

            {/* türler */}
            <ListField label="Türler" values={data.genre} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
