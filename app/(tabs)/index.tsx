import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingResponse,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovies());
  

  const {
    data: moviesResponse,
    loading: moviesLoading,
    error: movieError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const movies = Array.isArray(moviesResponse)
    ? moviesResponse
    : (moviesResponse?.results ?? []);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : movieError || trendingError ? (
          <Text className="text-red-400 text-center mt-6">
            Error: {movieError?.message || trendingError?.message}
          </Text>
        ) : (
          <>
            {/* -- Search bar -- */}
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {/* -- Section title -- */}
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>

            {/* -- Movies grid -- */}
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id?.toString() ?? String(item)}
              numColumns={3}
              scrollEnabled={false}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              renderItem={({ item }) => <MovieCard {...item} />}
              className="mt-2 pb-32"
            />
          </>
        )}
      </ScrollView>
    </View>
  );


}