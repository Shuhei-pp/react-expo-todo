// Import the functions you need from the SDKs you need
import { useState } from "react"

import {
  FormControl,
  Input,
  Box,
  Center,
  Heading,
  VStack,
  Button,
} from "native-base"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase"

export const Signup = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      window.alert("確認用のパスワードが違います")
      return
    }
    if (password.length >= 6) {
      window.alert("パスワードは6文字以上にしてください")
      return
    }
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((err) => {
        window.alert("使用できないメールアドレス、パスワードです")
        console.log(err)
      })
  }
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={(e) => setEmail(e)} value={email} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(e) => setPassword(e)}
              value={password}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(e) => setConfirmPassword(e)}
              value={confirmPassword}
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}
