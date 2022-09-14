import React, { useState } from 'react'
import { FlatList, Image, Button, Text, useWindowDimensions, View, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { width } = useWindowDimensions()

  const pickImages = async () => {
    setIsLoading(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    })
    setIsLoading(false)
    console.log(result);
    if (!result.cancelled) {
      setImages(result.uri ? [result.uri] : result.selected)
    }
  }

  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <Image source={{ uri: item.uri }}
          style={{ width: width / 3, height: 250, margin: 1 }} />
      )}
      numColumns={3}
      keyExtractor={(item) => item.uri}
      contentContainerStyle={{ marginVertical: 50, paddingBottom: 100 }}
      ListHeaderComponent={
        isLoading ? (
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Loading...</Text>
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <>
            <Button title="Pick images" onPress={pickImages} />
          </>
        )
      }
    />
  );
}
