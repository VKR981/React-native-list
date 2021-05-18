import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  Touchable,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

const DATA = ["🍌 banana", "🍏 apple", "🍉 watermelon"];

type ItemType = { name: string; id: string };

const Item = ({ name }: { name: string }) => (
  <TouchableOpacity style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [list, setList] = useState<ItemType[]>([]);
  const [filteredList, setFilteredList] = useState<ItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const initialList = DATA.map((item) => ({
      name: item,
      id: uuidv4(),
    }));
    setList(initialList);
  }, []);

  useEffect(() => {
    setFilteredList(
      list.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, list]);

  const addItem = () => {
    const randomIndex = Math.floor(Math.random() * DATA.length);
    setList((prevState) => [
      ...prevState,
      { name: DATA[randomIndex], id: uuidv4() },
    ]);
  };

  const renderItem = ({ item }: { item: ItemType }) => (
    <Item name={item.name} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={styles.topBar}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={24} color="grey" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.search}
            placeholder="Search..."
          ></TextInput>
        </View>
        <TouchableOpacity onPress={addItem}>
          <AntDesign name="pluscircle" size={35} color="grey" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 16,
    backgroundColor: "#e76f51",
    marginVertical: 16,
    minWidth: "80%",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#264653" },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 50,
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    marginRight: 16,
    width: "70%",
  },
  search: {
    padding: 4,
    paddingHorizontal: 16,
    width: "100%",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
});
