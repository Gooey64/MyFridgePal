import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View>
      <Link href="about">
	      Hello, world!
      </Link>
    </View>
  );
}