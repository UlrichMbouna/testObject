import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'destructive';
}

export default function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  variant = 'primary',
}: ButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'destructive':
        return styles.destructive;
      default:
        return styles.primary;
    }
  };

  const getVariantTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'destructive':
        return styles.destructiveText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, getVariantTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  destructive: {
    backgroundColor: '#FF3B30',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#007AFF',
  },
  destructiveText: {
    color: '#fff',
  },
});