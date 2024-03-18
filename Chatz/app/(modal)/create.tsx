import { Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'expo-router';

const Page = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const startGroup = useMutation(api.groups.create);
  const router = useRouter();

  // Create a new group with Convex mutation
  const onCreateGroup = async () => {
    await startGroup({
      name,
      description: desc,
      icon_url: icon,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.textInput} value={name} onChangeText={setName} />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.textInput} value={desc} onChangeText={setDesc} />
      <Text style={styles.label}>Icon URL</Text>
      <TextInput style={styles.textInput} value={icon} onChangeText={setIcon} />
      <TouchableOpacity style={styles.button} onPress={onCreateGroup}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // A light shade of blue for the background
    padding: 10,
  },
  label: {
    marginVertical: 10,
    color: '#007AFF', // Added to ensure labels match the blue theme
    fontSize: 18, // Slightly larger for readability
    fontWeight: 'bold', // Making sure it stands out
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#007AFF', // Switching to blue for consistency
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: '#fff',
    fontSize: 16, // Increased font size for better readability
  },
  button: {
    backgroundColor: '#007AFF', // Updated to a pleasing shade of blue
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16, // Kept the same for readability
    fontWeight: 'bold',
  },
});


export default Page;