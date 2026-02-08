import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../AppNavigator';
import { useObjects } from '../context/ObjectsContext';
import { useSocket } from '../context/SocketContext';
import ObjectCard from '../components/ObjectCard';



type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { objects, loading, error, fetchObjects, deleteObject } = useObjects();
  const { isConnected } = useSocket();

  useEffect(() => {
    fetchObjects();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer cet objet ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteObject(id) },
      ]
    );
  };

  const handleObjectPress = (id: string) => {
    navigation.navigate('ObjectDetail', { id });
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchObjects}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Objets Heyama</Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isConnected ? '#4CD964' : '#FF3B30' },
            ]}
          />
          <Text style={styles.statusText}>
            {isConnected ? 'Connecté' : 'Déconnecté'}
          </Text>
        </View>
      </View>

      <FlatList
        data={objects}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ObjectCard
            object={item}
            onPress={() => handleObjectPress(item._id)}
            onDelete={() => handleDelete(item._id)}
          />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchObjects} />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="image-outline" size={64} color="#C7C7CC" />
              <Text style={styles.emptyText}>Aucun objet</Text>
              <Text style={styles.emptySubText}>
                Commencez par créer votre premier objet
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    marginTop:40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#C6C6C8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  list: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginVertical: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#C7C7CC',
    marginTop: 8,
  },
});