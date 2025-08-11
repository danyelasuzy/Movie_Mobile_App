import { fetchMoviesDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { icons } from '../../constants/icons';


interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}
const MovieInfo = ({label,value}: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-white font-bold text-sm">{label}</Text>
      <Text className="text-light-100 font-normal text-sm mt-2">{value || "N/A"}</Text>
    </View>
  )
}

const MovieDetails = () => {
  const {id} = useLocalSearchParams();

  const {data: movie,loading} = useFetch(() => fetchMoviesDetails(id as string));

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom:80 }}>
        <View>
          <Image source={{uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} className="w-full h-[350px]" />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
        <Text className="text-light-200 text-sm">{movie?.release_date?.split("-")[0]}</Text>
        <Text className="text-light-200 text-sm">|</Text><Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 gap-x-1 px-2 py-1 rounded-full mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-light-200 text-sm">{Math.round(movie?.vote_average ?? 0)}/10 </Text>
            <Text className="text-light-200 text-sm">({movie?.vote_count}) votes</Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo label="Genres" value={movie?.genres?.map((genre: { name: any; }) => genre.name).join(" - ")} />
            <View className="flex flex-row items-center justify-between w-1/2">
            <MovieInfo label="Budget" value={`$${movie?.budget/ 1_000_000} millions`}/>
            <MovieInfo label="Revenue" value={`$${Math.round(movie?.revenue/ 1_000_000)} millions`} />
            </View>
           < MovieInfo label="Production Companies" value={movie?.production_companies?.map((company: { name: any; }) => company.name).join(" - ") || "N/A"}></MovieInfo>

        </View>
      </ScrollView>
            <TouchableOpacity className="absolute bottom-5 left-0 right-0 bg-accent rounded-lg mx-5 py-3.5 flex flex-row items-center justify-center z-50" onPress={router.back}>
        <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="ffffff"/>
                <Text className="text-white text-base font-semibold">Go Back</Text>
        </TouchableOpacity>
    </View>
    
  );
};

export default MovieDetails;
