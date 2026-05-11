import DefaultButton from "@/components/shared/DefaultButton";
import { supabase } from "@/lib/supabase";
import { showToastError, showToastSuccess } from "@/services/toastService";
import { RootState } from "@/store/newStore";
import { AmazonEmber } from "@/utils/constants/constants";
import { uploadDocument } from "@/utils/uploadDocument";
import { uploadImage } from "@/utils/uploadImage";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

interface UploadDocument {
  uri: string;
  name: string;
}

interface UploadImage {
  uri: string;
  name: string;
  type: string;
}

const CreateProduct = () => {
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const [name, setName] = useState<string>("");
  const [amountInStock, setAmountInStock] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [previousPrice, setPreviousPrice] = useState<string>("");
  const [deliveryPrice, setDeliveryPrice] = useState<string>("");
  const [deliveryInDays, setDeliveryInDays] = useState<string>("");
  const [isAmazonChoice, setIsAmazonChoice] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<UploadImage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [documentFile, setDocumentFile] = useState<UploadDocument | null>(null);

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      selectionLimit: 1,
    });
    if (!result.canceled) {
      const { uri, fileName, mimeType } = result.assets[0];
      setImageFile({
        uri,
        name: fileName!,
        type: mimeType!,
      });
    }
  };

  const pickAndUploadGLB = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });
    if (!result.canceled) {
      setDocumentFile({
        name: result.assets[0].name,
        uri: result.assets[0].uri,
      });
    }
  };

  const createProduct = async () => {
    setLoading(true);
    try {
      const imageUrl = imageFile
        ? await uploadImage(imageFile?.uri!, imageFile?.name!)
        : null;
      const documentUrl = documentFile
        ? await uploadDocument(documentFile?.uri!, documentFile?.name!)
        : null;
      const { data, error } = await supabase.from("products").insert([
        {
          name,
          amount_in_stock: Number(amountInStock),
          current_price: Number(currentPrice),
          previous_price: Number(previousPrice),
          delivery_price: Number(deliveryPrice),
          delivery_in_days: Number(deliveryInDays),
          is_amazon_choice: isAmazonChoice,
          image_url: imageUrl ?? null,
          model_3d_url: documentUrl ?? null,
          user_id: userLogged?.user.id,
        },
      ]);
      if (error) {
        showToastError("Error", "Create product error");
        return;
      }
      showToastSuccess("Succes", "Product added successfully!");
      router.back();
    } catch (error) {
      console.warn(error);
      showToastError("Error", "Create product error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.label}>Enter Product Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.inputStyle}
            placeholder="Product name"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.label}>Amount in Stock</Text>
          <TextInput
            value={amountInStock}
            onChangeText={setAmountInStock}
            keyboardType="numeric"
            style={styles.inputStyle}
            placeholder="Amount in stock"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.label}>Current Price</Text>
          <TextInput
            value={currentPrice}
            onChangeText={setCurrentPrice}
            keyboardType="numeric"
            style={styles.inputStyle}
            placeholder="Current Price"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.label}>Previous Price</Text>
          <TextInput
            value={previousPrice}
            onChangeText={setPreviousPrice}
            keyboardType="numeric"
            style={styles.inputStyle}
            placeholder="Previous Price"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.label}>Delivery Price</Text>
          <TextInput
            value={deliveryPrice}
            onChangeText={setDeliveryPrice}
            keyboardType="numeric"
            style={styles.inputStyle}
            placeholder="Delivery Price"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.label}>Delivery In Days</Text>
          <TextInput
            value={deliveryInDays}
            onChangeText={setDeliveryInDays}
            keyboardType="numeric"
            style={styles.inputStyle}
            placeholder="Delivery in Days"
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Checkbox
            value={isAmazonChoice}
            onValueChange={setIsAmazonChoice}
            style={{ margin: 4 }}
            color={isAmazonChoice ? "#f1b023ff" : undefined}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: AmazonEmber,
            }}
          >
            Amazon Choice
          </Text>
        </View>
        {imageFile && (
          <View>
            <Image
              source={{ uri: imageFile.uri }}
              style={{
                width: 150,
                aspectRatio: 5 / 3,
                borderRadius: 10,
                backgroundColor: "#bababa",
                position: "relative",
              }}
            />
            <Pressable
              onPress={() => setImageFile(null)}
              style={{
                position: "absolute",
                top: 3,
                left: 122,
              }}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={24}
                color="#5a5a5aff"
              />
            </Pressable>
          </View>
        )}
        <TouchableOpacity onPress={pickMedia}>
          {!imageFile && (
            <View style={styles.pickContainer}>
              <Text style={styles.pickText}>Add Product Image</Text>
              <Feather name="folder-plus" size={20} color="black" />
            </View>
          )}
        </TouchableOpacity>

        {documentFile ? (
          <View>
            <Pressable
              style={{
                position: "absolute",
                left: 40,
                top: -5,
                zIndex: 10,
              }}
              onPress={() => {
                setDocumentFile(null);
              }}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={25}
                color="#5a5a5aff"
              />
            </Pressable>
            <MaterialIcons name="upload-file" size={50} color="#393939ff" />
            <Text style={styles.documentFileText}>{documentFile.name}</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={pickAndUploadGLB}>
            <View style={styles.pickContainer}>
              <Text style={styles.pickText}>
                Add Product 3D Model .glb file
              </Text>
              <AntDesign name="file-add" size={18} color="black" />
            </View>
          </TouchableOpacity>
        )}
        <DefaultButton
          style={{ width: "100%" }}
          onPress={createProduct}
          disabled={loading}
        >
          {loading ? "Please Wait..." : "Create Product"}
        </DefaultButton>
      </View>
    </ScrollView>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  contentContainer: {
    width: "100%",
    gap: 15,
    paddingBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontFamily: AmazonEmber,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "black",
    padding: 10,
    fontFamily: AmazonEmber,
  },
  pickContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "black",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickText: {
    fontSize: 16,
    fontFamily: AmazonEmber,
    color: "#b6b6b6ff",
  },
  documentFileText: {
    fontSize: 16,
    fontFamily: AmazonEmber,
  },
});
