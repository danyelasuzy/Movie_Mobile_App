import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
};

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  const imgUri = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/600x400/1a1a1a/ffffff.png";

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-4">
        <Image
          source={{ uri: imgUri }}
          className="w-full h-[150px] rounded-lg"
          resizeMode="contain"
        />
        <Text className="text-white font-bold" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center gap-x-1 justify-start">
          <View className="flex-row mt-1">
            {Array.from({ length: Math.round(vote_average / 2) }).map(
              (_, idx) => (
                <Image
                  key={idx}
                  source={icons.star}
                  className="w-3 h-3 mr-0.5"
                  resizeMode="contain"
                />
              )
            )}
          </View>
        </View>
        <View className="flex-row items-center  justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs text-light-300 font-medium mt-1">Movie</Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
