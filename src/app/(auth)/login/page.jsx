"use client";
import {
  Button,
  Card,
  Checkbox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import React from "react";

import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const LogInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      // required
      email: userData.email, // required
      password: userData.password, // required
    });
    if (data) {
        toast.success('Login Successful')
      redirect("/");
    }
    if (error) {
      alert("error");
    }
  };
  const handleGoogleSignin = async () => {
      await authClient.signIn.social({
        provider: "google",
      });
    };
  return (
    <Card className="mx-auto my-10">
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button className="w-full rounded-full" type="submit">
            Login
          </Button>
        </div>
      </Form>
      <div className="flex justify-center items-center gap-3">
        <div className="whitespace-nowrap">Or sign in with</div>
      </div>
      <div>
        <Button
          onClick={handleGoogleSignin}
          variant="ghost"
          className="w-full rounded-full border"
        >
          <FcGoogle />
          Sign in with google
        </Button>
      </div>
    </Card>
  );
};

export default LogInPage;
