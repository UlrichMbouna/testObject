import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  secureTextEntry?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  required?: boolean;
  characterCount?: boolean;
  maxLength?: number;
}

export default function Input({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  required = false,
  characterCount = false,
  maxLength,
  value,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getBorderColor = () => {
    if (error) return '#FF3B30';
    if (isFocused) return '#007AFF';
    return '#C7C7CC';
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return showPassword ? 'eye-off-outline' : 'eye-outline';
    }
    return rightIcon;
  };

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      togglePasswordVisibility();
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
          {characterCount && maxLength && (
            <Text style={styles.characterCount}>
              {value?.length || 0}/{maxLength}
            </Text>
          )}
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            borderWidth: isFocused ? 2 : 1,
          },
          inputStyle,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color="#8E8E93"
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
            props.multiline && styles.multilineInput,
          ]}
          placeholderTextColor="#C7C7CC"
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          maxLength={maxLength}
          {...props}
        />

        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            style={styles.rightIconButton}
            disabled={!onRightIconPress && !secureTextEntry}
          >
            <Ionicons
              name={getRightIcon()}
              size={20}
              color={secureTextEntry ? '#8E8E93' : '#007AFF'}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  required: {
    color: '#FF3B30',
  },
  characterCount: {
    fontSize: 12,
    color: '#8E8E93',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    minHeight: 44,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  leftIcon: {
    marginLeft: 12,
  },
  rightIconButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  error: {
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 4,
  },
});