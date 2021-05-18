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
    const initialList = ["🍌 banana", "🍏 apple", "🍉 watermelon"].map(
      (item) => ({
        name: item,
        id: uuidv4(),
      })
    );
    setList(initialList);
  }, []);

  useEffect(() => {
    setFilteredList(
      list.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, list]);

  const addItem = (name: string) => {
    setList((prevState) => [...prevState, { name, id: uuidv4() }]);
  };

  const renderItem = ({ item }: { item: ItemType }) => (
    <Item name={item.name} />
  );

  const Header = () => (
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
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircle" size={35} color="grey" />
      </TouchableOpacity>
    </View>
  );

  const NewItemModal = () => {
    const [newItemName, setNewItemName] = useState("");
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.itemName}>
              <TextInput
                value={newItemName}
                onChangeText={setNewItemName}
                style={styles.search}
                placeholder="Enter Name of Item."
                autoFocus={true}
                showSoftInputOnFocus={true}
              ></TextInput>
            </View>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                if (newItemName) {
                  addItem(newItemName);
                  setNewItemName("");
                  setModalVisible(!modalVisible);
                }
              }}
            >
              <Text style={styles.textStyle}>Add</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                if (newItemName) {
                  addItem(newItemName);
                  setNewItemName("");
                  setModalVisible(!modalVisible);
                }
              }}
            >
              <Text style={styles.textStyle}>Add Random item</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" />
      <Header />
      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <NewItemModal />
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
    marginVertical: 8,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#264653",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#264653",
    padding: 0,
    // elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#264653",
  },
  itemName: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
  },
});
