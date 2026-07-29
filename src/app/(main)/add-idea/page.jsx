"use client";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  TextArea,
  TextField,
  Select,
  Card,
} from "@heroui/react";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const AddIdeaPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const idea = Object.fromEntries(formData.entries());

    const res = await fetch("http://localhost:5000/idea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idea),
    });
    const data = await res.json();
    toast.success("Idea added successfully");
    redirect("/ideas");
  };

  return (
    <div className="container mx-auto my-4">
      <Card>
      <h2 className="text-center text-2xl font-bold my-2 text-[#101828]">
        Add Your Idea
      </h2>
        <form onSubmit={onSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Destination Name */}
            <div className="md:col-span-2">
              <TextField name="ideaTitle" isRequired>
                <Label>Idea Title</Label>
                <Input placeholder="Idea Title" className="rounded-2xl" />
                <FieldError />
              </TextField>
            </div>

            {/* Target Audience
             */}
            <TextField name="audience" isRequired>
              <Label>Target Audience</Label>
              <Input placeholder="audience" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Category - Updated Select Component */}
            <div>
              <Select
                name="category"
                isRequired
                className="w-full"
                placeholder="Select category"
              >
                <Label>Category</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Tech" textValue="Tech">
                      Tech
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Health" textValue="Health">
                      Health
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="AI" textValue="AI">
                      AI
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="Education" textValue="Education">
                      Education
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Bussiness" textValue="Bussiness">
                      Bussiness
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Bussiness" textValue="Bussiness">
                      Travel
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Estimated Budget  */}
            <div className="md:col-span-2">
              <TextField name="budget" type="number" isRequired>
                <Label>Estimated Budget (USD)</Label>
                <Input
                  type="number"
                  placeholder="1299"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Image URL - Removed preview */}
            <div className="md:col-span-2">
              <TextField name="imageUrl" isRequired>
                <Label>Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/bali-paradise.jpg"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-8">
              <TextField name="shortDescription" isRequired>
                <Label>Short Description</Label>
                <TextArea
                  placeholder="Describe the short description..."
                  className="rounded-3xl"
                />
                <FieldError />
              </TextField>
              <TextField name="detailedDescription" isRequired>
                <Label>Detailed Description</Label>
                <TextArea
                  placeholder="Describe the detailed description..."
                  className="rounded-3xl"
                />
                <FieldError />
              </TextField>
              <TextField
                name="problemStatement"
                isRequired
              >
                <Label>Problem Statement</Label>
                <TextArea
                  placeholder="Describe the problem statement
..."
                  className="rounded-3xl"
                />
                <FieldError />
              </TextField>
              <TextField
                name="proposedSolution"
                isRequired
              >
                <Label>Proposed Solution</Label>
                <TextArea
                  placeholder="Describe the proposed solution
..."
                  className="rounded-3xl"
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Buttons */}

          <Button
            type="submit"
            variant="outline"
            className=" w-full bg-[#4F46E5] text-white rounded-lg"
          >
            Add Idea
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddIdeaPage;
