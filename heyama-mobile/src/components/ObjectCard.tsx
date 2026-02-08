import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ObjectItem } from '../types/object';

interface ObjectCardProps {
  object: ObjectItem;
  onPress: () => void;
  onDelete: () => void;
}

export default function ObjectCard({ object, onPress, onDelete }: ObjectCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {object.imageUrl ? (
          <Image
            source={{ uri: object.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={32} color="#C7C7CC" />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {object.title}
          </Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {object.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.date}>
            Créé le {formatDate(object.createdAt)}
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#C7C7CC',
  },
});