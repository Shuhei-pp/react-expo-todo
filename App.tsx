import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';


export default function App() {
  const [text, setText] = useState<string>("")
  const [todos, setTodos] = useState<string[]>([])
  const handleSubmit = () => {
    const entityTodos = todos
    entityTodos.push(text)
    setTodos(entityTodos)
    setText("")
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:200 }}
        onChangeText={(event) => (setText(event))}
        value={text}
      />
      <Button
        title={"登録"}
        onPress={()=>{handleSubmit()}}
      />
      {todos.map((todo,index) => {
        return <Text key={ index}>{ index}:{todo}</Text>
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '2%',
      marginBottom: '2%'
  }
});
