import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { ObjectItem } from '../types/object';
import { objectsApi } from '../lib/api';

export default function ObjectDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: string };

  const [object, setObject] = useState<ObjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchObject();
  }, [id]);

  const fetchObject = async () => {
    try {
      const data = await objectsApi.getObjectById(id);
      setObject(data);
    } catch (error) {
      console.error('Error fetching object:', error);
      Alert.alert('Erreur', 'Impossible de charger les détails de l\'objet');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="camera" size={48} color="#007AFF" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (!object) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>Objet non trouvé</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {object.imageUrl ? (
            <Image
              source={{ uri: object.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={64} color="#C7C7CC" />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{object.title}</Text>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.description}>{object.description}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color="#8E8E93" />
              <Text style={styles.infoText}>
                Créé le {formatDate(object.createdAt)}
              </Text>
            </View>

            {object.updatedAt && (
              <View style={styles.infoRow}>
                <Ionicons name="refresh-outline" size={20} color="#8E8E93" />
                <Text style={styles.infoText}>
                  Modifié le {formatDate(object.updatedAt)}
                </Text>
              </View>
            )}

            <View style={styles.infoRow}>
              <Ionicons name="link-outline" size={20} color="#8E8E93" />
              <Text style={styles.infoText} numberOfLines={1}>
                {object.imageUrl}
              </Text>
            </View>
          </View>

          <View style={styles.idContainer}>
            <Text style={styles.idLabel}>ID</Text>
            <Text style={styles.idValue}>{object._id}</Text>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  infoContainer: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  idContainer: {
    padding: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  idLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4,
  },
  idValue: {
    fontSize: 12,
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
});