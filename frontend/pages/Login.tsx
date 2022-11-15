import { signInWithEmailAndPassword } from "firebase/auth"
import { useContext, useState } from "react"
import {
  FormControl,
  Input,
  Box,
  Center,
  Heading,
  VStack,
  Link,
  Button,
  HStack,
  Text,
} from "native-base"
import { firebaseAuth } from "../utils/firebase"
import { userContext } from "../App"

// TODO:
export const Login = ({ navigation: { navigate } }: { navigation: any }) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const resorceUserContext = useContext(userContext)

  const handleSubmit = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        if (resorceUserContext) {
          resorceUserContext.setLoginUser(userCredential.user)
          navigate("ChatRoom")
        }
      })
      .catch((err) => {
        console.log(err)
        window.alert("メールアドレス、パスワードが違います")
      })
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          ログイン
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Welcome!!
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
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              登録していない場合は
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
    // <Button onPress={googleSignIn} title={ "googleログイン"} />
  )
}
