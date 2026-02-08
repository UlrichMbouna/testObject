import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Platform,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useObjects } from '../context/ObjectsContext';
import Input from '../components/Input';

export default function CreateObjectScreen() {
  const navigation = useNavigation();
  const { createObject, loading } = useObjects();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission requise',
        'Nous avons besoin de la permission pour accéder à vos photos.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission requise',
        'Nous avons besoin de la permission pour utiliser la caméra.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un titre');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir une description');
      return;
    }

    if (!imageUri) {
      Alert.alert('Erreur', 'Veuillez sélectionner une image');
      return;
    }

    try {
      await createObject({
        title: title.trim(),
        description: description.trim(),
        imageUri,
      });

      Alert.alert(
        'Succès',
        'Objet créé avec succès',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer l\'objet');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Input
            label="Titre"
            value={title}
            onChangeText={setTitle}
            placeholder="Entrez le titre"
            maxLength={100}
          />

          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Entrez la description"
            multiline
            numberOfLines={4}
            style={styles.descriptionInput}
          />

          <View style={styles.imageSection}>
            <Text style={styles.imageLabel}>Image</Text>
            
            {imageUri ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setImageUri(null)}
                >
                  <Ionicons name="close-circle" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.imageButtons}>
                <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                  <Ionicons name="image-outline" size={24} color="#007AFF" />
                  <Text style={styles.imageButtonText}>Galerie</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
                  <Ionicons name="camera-outline" size={24} color="#007AFF" />
                  <Text style={styles.imageButtonText}>Caméra</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Button
            title={loading ? 'Création...' : 'Créer l\'objet'}
            onPress={handleSubmit}
            disabled={loading || !title || !description || !imageUri}
            // style={styles.submitButton }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    padding: 16,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageSection: {
    marginTop: 16,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  imagePreviewContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    width: '45%',
  },
  imageButtonText: {
    marginTop: 8,
    color: '#007AFF',
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 24,
  },
});