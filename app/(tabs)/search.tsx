import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");


  const {
    data: moviesResponse,
    loading: moviesLoading,
    error: movieError,
    refetch:loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }),false);

 useEffect(() => {

  const timeoutId =setTimeout( async () => {
    if (searchQuery.trim()) {
      await loadMovies();

      if(moviesResponse?.length >0 && moviesResponse[0])
        await updateSearchCount(searchQuery, moviesResponse[0]);
    } else {
      reset();
    }
  },500);   

  return () => clearTimeout(timeoutId);
}, [ searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={moviesResponse}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", marginTop: 20 }}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10} " />
            </View>
            <View>
              <SearchBar placeholder="Search movies..." value={searchQuery} onChangeText={(text:string) => setSearchQuery(text)} />
            </View>

            {moviesLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            ) : null}

            {movieError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {movieError}
              </Text>
            )}

            {!moviesLoading && !movieError && searchQuery.trim() && moviesResponse?.length > 0 && (
              <Text className="text-white text-xl font-bold">Search results for {''}
              <Text className="text-accent">{searchQuery}</Text></Text>
            )}
          </>
        }
        ListEmptyComponent={
  !moviesLoading && !movieError ? (
    <View className="mt-10 px-5">
      <Text className="text-gray-500 text-center text-xl font-bold">
        {searchQuery.trim() ? "No movies found" : "Search for a movie"}
      </Text>
    </View>
  ) : null
}
      />
    </View>  
  );
};

export default Search;
