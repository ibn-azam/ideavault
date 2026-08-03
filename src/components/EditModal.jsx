"use client";


import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export function EditModal({idea}) {
   const router = useRouter();
    const {
    _id,
    ideaTitle,
    audience,
    category,
    budget,
    imageUrl,
    shortDescription,
    detailedDescription,
    problemStatement,
    proposedSolution,
  } = idea;
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const idea = Object.fromEntries(formData.entries());
    
        const res = await fetch(`http://localhost:5000/idea/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(idea),
        });
        const data = await res.json();
        toast.success("Idea updated successfully");
        router.push("/ideas");
      };
  return (
    <Modal>
      <Button
                  variant="ghost"
                  className="w-full sm:w-auto border-2 border-[#4F46E5] rounded-md text-[#4F46E5] hover:border-none hover:bg-[#4F46E5] hover:text-white"
                >
                  <FaEdit /> Edit
                </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-xl font-semibold">
                Update Idea
              </Modal.Heading>
              <p className=" text-sm leading-5 text-muted">
                Edit the form below and we&apos;ll get back to you.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className=" space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={ideaTitle} name="ideaTitle" isRequired>
                        <Label>Idea Title</Label>
                        <Input
                        
                          placeholder="Idea Title"
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Target Audience
                     */}
                    <TextField defaultValue={audience} name="audience" isRequired>
                      <Label>Target Audience</Label>
                      <Input placeholder="audience" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Category - Updated Select Component */}
                    <div>
                      <Select
                      defaultValue={category}
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
                      <TextField defaultValue={budget} name="budget" type="number" isRequired>
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
                      <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
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
                      <TextField defaultValue={shortDescription} name="shortDescription" isRequired>
                        <Label>Short Description</Label>
                        <TextArea
                          placeholder="Describe the short description..."
                          className="rounded-3xl"
                        />
                        <FieldError />
                      </TextField>
                      <TextField defaultValue={detailedDescription} name="detailedDescription" isRequired>
                        <Label>Detailed Description</Label>
                        <TextArea
                          placeholder="Describe the detailed description..."
                          className="rounded-3xl"
                        />
                        <FieldError />
                      </TextField>
                      <TextField defaultValue={problemStatement} name="problemStatement" isRequired>
                        <Label>Problem Statement</Label>
                        <TextArea
                          placeholder="Describe the problem statement..."
                          className="rounded-3xl"
                        />
                        <FieldError />
                      </TextField>
                      <TextField defaultValue={proposedSolution} name="proposedSolution" isRequired>
                        <Label>Proposed Solution</Label>
                        <TextArea
                          placeholder="Describe the proposed solution..."
                          className="rounded-3xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Buttons */}
                
               <div className="flex gap-2">
                 <Button slot="close" variant="secondary" className='rounded-lg text-[#4F46E5]'>
                Cancel
              </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    className=" w-full bg-[#4F46E5] text-white rounded-lg"
                  >
                    Update
                  </Button>
               </div>

                </form>
              </Surface>
            </Modal.Body>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
