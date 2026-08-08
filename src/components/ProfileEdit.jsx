"use client";

import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardTitle,
  Divider,
  Input,
} from "@heroui/react";
import { Camera } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProfile({ user }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    image: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        image: user.image || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Better Auth update
      const { error } = await authClient.updateUser({
        name: form.name,
        image: form.image,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Profile updated successfully");

      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-xl rounded-3xl">
      <CardTitle className="p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit Profile
          </h1>

          <p className="text-default-500 mt-2">
            Update your profile information.
          </p>
        </div>

    

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Avatar */}

          <div className="flex flex-col items-center gap-4">

            <Image
            width={200}
            height={200}
            alt={form.name}
              src={form.image}
              className="w-32 h-32 rounded-full text-large"
            />

           

         <div className="flex flex-col gap-2 w-lg">
               {/* Name */}

          <Input
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            variant="bordered"
            className="border border-gray-500"
          />

          {/* Email */}

          <Input
            name="email"
            label="Email"
            value={form.email}
            isReadOnly
            variant="bordered"
            description="Email cannot be changed here."
            className="border border-gray-500"
          />
         </div>
           {/* <Input
              name="image"
              label="Profile Image URL"
              value={form.image}
              onChange={handleChange}
              variant="bordered"
              startContent={<Camera size={18} />}
            /> */}

          </div>

         

          

         

          <div className="flex justify-end gap-3">

            <Button
              variant="flat"
              type="reset"
              onPress={() =>
                setForm({
                  name: user.name,
                  image: user.image,
                  email: user.email,
                })
              }
            >
              Cancel
            </Button>

            <Button
              color="primary"
              type="submit"
              isLoading={loading}
            >
              Save Changes
            </Button>

          </div>

        </form>

      </CardTitle>
    </Card>
  );
}