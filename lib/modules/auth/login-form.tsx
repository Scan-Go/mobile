import { zodResolver } from "@hookform/resolvers/zod";
import { useAlertDialog } from "@lib/hooks/useAlertDialog";
import { authService } from "@lib/services/auth.service";
import { useToastController } from "@tamagui/toast";
import { router } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { AlertDialog, Button, Form, Input, Label, Text, YStack } from "tamagui";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email"),
  password: z.string(),
});

type InputData = z.infer<typeof schema>;

function LoginForm() {
  const passwordRef = useRef<TextInput>(null);
  const toast = useToastController();
  const { showAlertDialog } = useAlertDialog();
  const { show } = useToastController();

  const { control, handleSubmit } = useForm<InputData>({
    resolver: zodResolver(schema),
  });

  const _sendVerificationMail = useCallback(async (email: string) => {
    await authService.sendVerificationEmail(email);
    show("Email verification succesfully send!", { toastType: "success" });
  }, []);

  const onSubmit = useCallback(async (data: InputData) => {
    console.log("Qweqwe");

    const user = await authService.signIn(data.email, data.password);

    if (user.error) {
      showAlertDialog({
        title: "Opps!",
        desc: "Kunde inte logga in, är du registrerad hos oss?",
        actions: [
          <AlertDialog.Action asChild key={"skapa"}>
            <Button
              theme="active"
              onPress={() => router.push("/(auth)/signIn")}
            >
              Skapa ett konto
            </Button>
          </AlertDialog.Action>,
        ],
      });

      return;
    }

    if (user.error) {
      return;
    }

    if (user.data.user.email_confirmed_at) {
      toast.show("Logged in successfully.", { toastType: "success" });
      router.replace("/(tabs)");
    } else {
      showAlertDialog({
        title: "Account verification",
        desc: "You need to activate you're account before proceeding.",
        actions: [
          <AlertDialog.Action asChild>
            <Button
              onPress={() => _sendVerificationMail(user.data.user.email!)}
            >
              Skicka verifierings länk
            </Button>
          </AlertDialog.Action>,
        ],
      });
    }
  }, []);

  return (
    <>
      <YStack>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({
              field: { onBlur, onChange, value },
              fieldState: { error },
              formState: { errors },
            }) => (
              <>
                <Label htmlFor="email">Email</Label>
                <Text>{errors.email?.message}</Text>
                <Text>{errors.password?.message}</Text>
                <Input
                  id="email"
                  keyboardType="email-address"
                  placeholder="Email"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onBlur, onChange, value } }) => (
              <>
                <Label htmlFor="password">Lösenord</Label>
                <Input
                  id="password"
                  placeholder="Lösenord"
                  secureTextEntry
                  ref={passwordRef}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              </>
            )}
          />

          <YStack mt="$5" />
          <Form.Trigger asChild>
            <Button theme="active" onPress={handleSubmit(onSubmit)}>
              Logga in
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </>
  );
}

export default LoginForm;
